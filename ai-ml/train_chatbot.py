from transformers import Trainer, TrainingArguments, AutoModelForCausalLM, AutoTokenizer
import pandas as pd
from datasets import Dataset, DatasetDict
import torch
import os
from sklearn.model_selection import train_test_split
from multiprocessing import freeze_support

def main():
    # Model selection
    MODEL_NAME = "gpt2"

    # Check if GPU is available
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    # Check if dataset file exists
    data_path = "data/chat_data.csv"
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Dataset file '{data_path}' not found!")

    # Load dataset
    df = pd.read_csv(data_path).dropna()  # Remove empty rows
    df.columns = [col.strip() for col in df.columns]

    # 🛠 Fix common dataset issues (extra quotes, spaces, encoding issues)
    df["query"] = df["query"].str.strip()
    df["response"] = df["response"].str.replace(r'["“”]', '', regex=True).str.strip()
    df["response"] = df["response"].apply(lambda x: x.replace("竄ｹ", "₹"))  # Fix encoding issues

    # Show cleaned dataset sample
    print("Cleaned dataset sample:\n", df.head())

    # Ensure dataset has enough samples
    if len(df) < 2:
        raise ValueError("Dataset too small! Add more training data to 'chat_data.csv'.")

    # Split dataset (80% train, 20% validation) only if enough data
    if len(df) >= 10:
        train_data, eval_data = train_test_split(df, test_size=0.2, random_state=42)
        dataset = DatasetDict({
            "train": Dataset.from_pandas(train_data),
            "validation": Dataset.from_pandas(eval_data)
        })
    else:
        dataset = DatasetDict({
            "train": Dataset.from_pandas(df),  # Use all data for training
        })

    # Load dataset with alternative delimiter if necessary
    try:
        df = pd.read_csv(data_path, delimiter=",").dropna()  # Default CSV (comma-separated)
        if df.shape[1] == 1:  # If only one column, try tab-separated
            df = pd.read_csv(data_path, delimiter="\t").dropna()
    except Exception as e:
        raise ValueError(f"Error reading dataset: {e}")

    # Check the number of rows
    if len(df) < 2:
        print("Dataset loaded but contains too few rows.")
        print("Check if your CSV is formatted correctly: it must have 'query' and 'response' columns.")
        raise ValueError("Dataset too small! Add more training data to 'chat_data.csv'.")

    print("Dataset loaded successfully:", df.head())

    # Initialize tokenizer
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    # Set pad token if not present (GPT-2 does not have one by default)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # Tokenization function
    def tokenize_function(examples):
        queries = [f"<|query|> {q}" for q in examples["query"]]
        responses = [f"<|response|> {r}" for r in examples["response"]]
        combined = [q + " " + r for q, r in zip(queries, responses)]
        outputs = tokenizer(combined, padding="max_length", truncation=True, max_length=512)
        outputs["labels"] = outputs["input_ids"].copy()  # Labels are the same as inputs
        return outputs

    # Apply tokenization in parallel (faster processing)
    tokenized_datasets = dataset.map(
        tokenize_function,
        batched=True,
        remove_columns=["query", "response"],
        num_proc=4
    )

    # Define training arguments
    training_args = TrainingArguments(
        output_dir="./results",
        evaluation_strategy="epoch" if "validation" in tokenized_datasets else "no",
        save_strategy="epoch",         # Save model after each epoch
        save_total_limit=3,            # Keep only last 3 checkpoints
        per_device_train_batch_size=2,  # Lower batch size to prevent OOM issues
        num_train_epochs=5,            # More epochs for better training
        gradient_accumulation_steps=8,  # Simulates larger batch size
        logging_dir="./logs",
        logging_steps=50,              # Log loss every 50 steps
        fp16=torch.cuda.is_available(),  # Enable mixed precision if GPU is available
        dataloader_num_workers=2,       # Reduce CPU load
    )

    # Initialize model
    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME).to(device)

    # Initialize trainer with validation set if available
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_datasets["train"],
        eval_dataset=tokenized_datasets.get("validation"),  # Only if available
    )

    # Train model with error handling
    try:
        trainer.train()
    except RuntimeError as e:
        print("Training failed due to:", e)
        print("Try reducing batch size or using CPU if running out of memory.")

    # Save model and tokenizer
    model_save_path = "D:/hackathon/agriculture-platform/ai-ml/trained_model"
    os.makedirs(model_save_path, exist_ok=True)
    model.save_pretrained(model_save_path)
    tokenizer.save_pretrained(model_save_path)

    # Debug: List saved files
    print("Model saved at:", model_save_path)
    print("Saved files:", os.listdir(model_save_path))

if __name__ == '__main__':
    freeze_support()  # Only needed when freezing code to produce an executable, but safe to call
    main()
