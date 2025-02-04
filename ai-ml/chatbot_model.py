from transformers import AutoModelForCausalLM, AutoTokenizer

# Specify the path to your trained model (the folder where you saved it)
local_model_path = "D:/hackathon/agriculture-platform/ai-ml/trained_model"

# Load the tokenizer and model from the GPT-2 checkpoint
tokenizer = AutoTokenizer.from_pretrained(local_model_path)
model = AutoModelForCausalLM.from_pretrained(local_model_path)

def get_chatbot_response(query):
    inputs = tokenizer(query, return_tensors="pt")
    outputs = model(**inputs)
    # For a causal LM, you might need a custom decoding strategy.
    # Here we simply return the generated token(s) as text.
    generated_ids = model.generate(**inputs, max_length=100)
    return tokenizer.decode(generated_ids[0], skip_special_tokens=True)
