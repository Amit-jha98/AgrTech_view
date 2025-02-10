from transformers import Trainer, TrainingArguments, AutoModelForCausalLM, AutoTokenizer
import pandas as pd
from datasets import Dataset, DatasetDict
import torch
import os
from sklearn.model_selection import train_test_split
from multiprocessing import freeze_support

# Add Hugging Face token (Replace "your_huggingface_token" with your actual token)
HF_TOKEN = "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"
os.environ["HF_TOKEN"] = HF_TOKEN  # Set token as an environment variable

def main():
    # Model selection
    MODEL_NAME = "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"

    # Check if GPU is available
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    # Check if dataset file exists
    data_path = "D:/hackathon/AgrTech_view/ai-ml/data/chat_data.csv"
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Dataset file '{data_path}' not found!")

    # Load dataset
    df = pd.read_csv(data_path).dropna()
    df.columns = [col.strip() for col in df.columns]
    df["query"] = df["query"].str.strip()
    df["response"] = df["response"].str.replace(r'["“”]', '', regex=True).str.strip()
    df["response"] = df["response"].apply(lambda x: x.replace("竄ｹ", "₹"))
    print("Cleaned dataset sample:\n", df.head())

    if len(df) < 2:
        raise ValueError("Dataset too small! Add more training data to 'chat_data.csv'.")

    if len(df) >= 10:
        train_data, eval_data = train_test_split(df, test_size=0.2, random_state=42)
        dataset = DatasetDict({
            "train": Dataset.from_pandas(train_data),
            "validation": Dataset.from_pandas(eval_data)
        })
    else:
        dataset = DatasetDict({"train": Dataset.from_pandas(df)})

    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_auth_token=HF_TOKEN)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    def tokenize_function(examples):
        queries = [f"<|query|> {q}" for q in examples["query"]]
        responses = [f"<|response|> {r}" for r in examples["response"]]
        combined = [q + " " + r for q, r in zip(queries, responses)]
        outputs = tokenizer(combined, padding="max_length", truncation=True, max_length=512)
        outputs["labels"] = outputs["input_ids"].copy()
        return outputs

    tokenized_datasets = dataset.map(
        tokenize_function,
        batched=True,
        remove_columns=["query", "response"],
        num_proc=4
    )

    training_args = TrainingArguments(
        output_dir="./results",
        evaluation_strategy="epoch" if "validation" in tokenized_datasets else "no",
        save_strategy="epoch",
        save_total_limit=3,
        per_device_train_batch_size=2,
        num_train_epochs=5,
        gradient_accumulation_steps=8,
        logging_dir="./logs",
        logging_steps=50,
        fp16=torch.cuda.is_available(),
        dataloader_num_workers=2,
    )

    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, use_auth_token=HF_TOKEN).to(device)

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_datasets["train"],
        eval_dataset=tokenized_datasets.get("validation"),
    )

    try:
        trainer.train()
    except RuntimeError as e:
        print("Training failed due to:", e)
        print("Try reducing batch size or using CPU if running out of memory.")

    model_save_path = "D:/hackathon/agriculture-platform/ai-ml/trained_model"
    os.makedirs(model_save_path, exist_ok=True)
    model.save_pretrained(model_save_path)
    tokenizer.save_pretrained(model_save_path)

    print("Model saved at:", model_save_path)
    print("Saved files:", os.listdir(model_save_path))

if __name__ == '__main__':
    freeze_support()
    main()
