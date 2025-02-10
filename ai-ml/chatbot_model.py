from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import re
from typing import List, Dict

class MultiModelChatbot:
    def __init__(self, model_paths: List[str]):
        self.models = {}
        self.tokenizers = {}
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # Load all models
        for idx, path in enumerate(model_paths):
            try:
                print(f"Loading model {idx+1}/{len(model_paths)} from {path}")
                tokenizer = AutoTokenizer.from_pretrained(path)
                model = AutoModelForCausalLM.from_pretrained(path)
                
                # Configure padding
                tokenizer.pad_token = tokenizer.eos_token
                model.config.pad_token_id = tokenizer.eos_token_id
                
                self.models[path] = model.to(self.device)
                self.tokenizers[path] = tokenizer
            except Exception as e:
                print(f"Error loading model from {path}: {str(e)}")

    def clean_response(self, response: str, query: str) -> str:
        """Clean and format response from any model-specific artifacts"""
        response = response.encode("utf-8").decode("utf-8")
        cleanup_patterns = [
            rf"<\|query\|>\s*{re.escape(query)}",
            "<\|endoftext\|>",
            "<\|response\|>",
            "<\|query\|>"
        ]
        
        for pattern in cleanup_patterns:
            response = re.sub(pattern, "", response, flags=re.IGNORECASE)
            
        response = re.sub(r"\s+", " ", response).strip()
        
        if not response.endswith((".", "!", "?")):
            response += "."
            
        return response

    def generate_responses(self, query: str) -> Dict[str, str]:
        """Generate responses from all loaded models"""
        responses = {}
        formatted_query = f"<|query|> {query} <|response|>"
        
        for path, model in self.models.items():
            try:
                tokenizer = self.tokenizers[path]
                inputs = tokenizer(
                    formatted_query,
                    return_tensors="pt",
                    padding=True,
                    truncation=True,
                    max_length=512
                ).to(self.device)

                with torch.no_grad():
                    generated_ids = model.generate(
                        inputs.input_ids,
                        attention_mask=inputs.attention_mask,
                        max_length=400,
                        num_return_sequences=1,
                        do_sample=True,
                        temperature=0.2,
                        top_k=40,
                        top_p=0.85,
                        repetition_penalty=1.15,
                        eos_token_id=tokenizer.eos_token_id
                    )

                response = tokenizer.decode(generated_ids[0], skip_special_tokens=True)
                responses[path] = self.clean_response(response, query)
                
            except Exception as e:
                print(f"Error generating response from {path}: {str(e)}")
                responses[path] = ""
                
        return responses

    def select_best_response(self, responses: Dict[str, str]) -> str:
        """Select best response using heuristic rules"""
        valid_responses = [r for r in responses.values() if len(r) > 5]
        
        if not valid_responses:
            return "I couldn't generate a proper response for that query."
            
        # Selection criteria (customize based on your needs)
        return max(valid_responses, key=lambda x: (
            len(x),  # Prefer longer responses
            len(re.findall(r"\b(?:recommend|suggest|advise)\b", x.lower())),  # Prefer actionable responses
            -len(re.findall(r"\b(?:sorry|unable|don't know)\b", x.lower()))  # Penalize uncertain responses
        ))

    def get_response(self, query: str) -> str:
        """Main interface method to get best response"""
        responses = self.generate_responses(query)
        return self.select_best_response(responses)

# Usage

model_paths = [
    # "D:/hackathon/AgrTech_view/ai-ml/trained_model",
    "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
    # "D:/hackathon/agriculture-platform/ai-ml/trained_model",
    # "D:/hackathon/trained_model"  # Example of adding a different model
]

chatbot = MultiModelChatbot(model_paths)
get_chatbot_response = chatbot.get_response
    
if __name__ == "__main__":
    test_queries = [
        "What is the best fertilizer for wheat in Punjab?",
        "How to control aphids in mustard crops?",
        "Explain the PM-KISAN scheme benefits",
    ]
    
    for query in test_queries:
        print(f"\nQuery: {query}")
        print(f"Best Response: {chatbot.get_response(query)}")
        print("-" * 80)

