import pandas as pd
import re

def clean_references(text):
    """
    Remove reference patterns like [Ref #<number>] and (Detail ID: <number>)
    from the input text and remove duplicate segments if present.
    """
    if not isinstance(text, str):
        return text

    # Remove pattern: [Ref #<number>]
    text = re.sub(r'\s*\[Ref #\d+\]', '', text)
    # Remove pattern: (Detail ID: <number>)
    text = re.sub(r'\s*\(Detail ID: \d+\)', '', text)
    
    # Optional: Remove duplicate phrases if they appear separated by a comma.
    # This assumes that duplicate parts are exactly the same when trimmed.
    parts = [part.strip() for part in text.split(',') if part.strip()]
    seen = []
    unique_parts = []
    for part in parts:
        if part not in seen:
            seen.append(part)
            unique_parts.append(part)
    return ', '.join(unique_parts)

def remove_references_from_csv(input_csv, output_csv):
    """
    Reads a CSV file with columns 'query' and 'qesponse', cleans them by removing reference 
    patterns and duplicate text segments, and writes the cleaned data to a new CSV file.
    """
    # Read CSV file into DataFrame
    df = pd.read_csv(input_csv)
    
    # Clean both columns (ensure you use the correct column names)
    df['query'] = df['query'].apply(clean_references)
    df['response'] = df['response'].apply(clean_references)
    
    # Optionally, remove duplicate rows (if that is desired)
    # df.drop_duplicates(inplace=True)
    
    # Save the cleaned DataFrame to a new CSV file
    df.to_csv(output_csv, index=False)
    print(f"Cleaned CSV saved as: {output_csv}")

# Example Usage
input_csv = "unique_agriculture_dataset_500.csv"  # Replace with your input CSV filename
output_csv = "cleaned_dataset02.csv"
remove_references_from_csv(input_csv, output_csv)
