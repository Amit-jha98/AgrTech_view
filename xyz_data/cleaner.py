import pandas as pd

def remove_exact_duplicates(csv_file, output_file):
    """
    Reads a CSV file, removes only those rows where both 'Question' and 'Answer' columns are identical, 
    and saves the cleaned data.

    :param csv_file: Path to the input CSV file.
    :param output_file: Path to save the cleaned CSV file.
    """
    try:
        # Load CSV file
        df = pd.read_csv(csv_file)

        # Remove duplicates where both 'Question' and 'Answer' are the same
        df_cleaned = df.drop_duplicates(subset=["query", "response"], keep="first")

        # Save the cleaned CSV
        df_cleaned.to_csv(output_file, index=False)

        print(f"✅ Cleaned CSV saved as: {output_file}")
        print(f"🔹 Original rows: {len(df)}, After removing duplicates: {len(df_cleaned)}")

    except Exception as e:
        print(f"❌ Error: {e}")

# Example Usage
csv_file = "D:/hackathon/agriculture-platform/ai-ml/data/cleaned_dataset.csv"  # Replace with your CSV file name
output_file = "cleaned_output04.csv"
remove_exact_duplicates(csv_file, output_file)
