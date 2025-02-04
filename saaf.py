import pandas as pd
import re

def clean_references(text):
    """
    Remove the patterns [Ref #<number>] and (Detail ID: <number>) from the input text.
    """
    # Remove pattern: [Ref #<number>] (optional preceding whitespace)
    text = re.sub(r'\s*\[Ref #\d+\]', '', text)
    # Remove pattern: (Detail ID: <number>) (optional preceding whitespace)
    text = re.sub(r'\s*\(Detail ID: \d+\)', '', text)
    return text

def remove_references_from_csv(input_csv, output_csv):
    """
    Reads a CSV file with columns 'query' and 'qesponse', removes the reference patterns, 
    and writes the cleaned data to a new CSV file.
    """
    # Read CSV file into DataFrame
    df = pd.read_csv(input_csv)
    
    # Assuming the columns are named "query" and "qesponse"
    df['query'] = df['query'].apply(clean_references)
    df['qesponse'] = df['response'].apply(clean_references)
    
    # Save the cleaned DataFrame to a new CSV file
    df.to_csv(output_csv, index=False)
    print(f"Cleaned CSV saved as: {output_csv}")

# Example Usage
input_csv = "unique_agriculture_dataset_500.csv"  # Replace with your input CSV filename
output_csv = "cleaned_datasetr.csv"
remove_references_from_csv(input_csv, output_csv)
