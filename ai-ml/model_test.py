from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import gc

def setup_model():
    model_path = "D:/hackathon/models--deepseek-ai--DeepSeek-R1-Distill-Qwen-1.5B/snapshots/trained_model"
    
    # Load in 8-bit precision to reduce memory usage
    model = AutoModelForCausalLM.from_pretrained(
        model_path,
        device_map="auto",
        torch_dtype=torch.float16,  # Use half precision
        low_cpu_mem_usage=True
    )
    
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    tokenizer.pad_token = tokenizer.eos_token
    
    return model, tokenizer

def chat():
    print("Loading model (this may take a moment)...")
    model, tokenizer = setup_model()
    
    # Enable memory efficient attention
    if hasattr(model, 'config'):
        model.config.use_cache = True
    
    print("Chatbot is ready! Type 'exit' to quit.")
    
    try:
        while True:
            user_input = input("You: ").strip()
            if user_input.lower() == "exit":
                break
            
            # Clear CUDA cache if available
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
            
            # Optimize input processing
            inputs = tokenizer(
                user_input,
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=256  # Reduced from 512 to save memory
            )
            
            with torch.no_grad():  # Disable gradient calculation
                output_ids = model.generate(
                    inputs['input_ids'],
                    max_length=100,  # Reduced from 150
                    num_return_sequences=1,
                    do_sample=True,
                    temperature=0.7,
                    top_k=50,
                    top_p=0.85,
                    repetition_penalty=1.2,
                    pad_token_id=tokenizer.pad_token_id,
                    eos_token_id=tokenizer.eos_token_id
                )
            
            output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)
            print(f"Chatbot: {output_text}")
            
            # Manual garbage collection
            gc.collect()
            
    except KeyboardInterrupt:
        print("\nExiting gracefully...")
    finally:
        # Clean up
        del model
        del tokenizer
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
        gc.collect()

if __name__ == "__main__":
    chat()