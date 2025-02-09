import kagglehub

# Download latest version
path = kagglehub.dataset_download("jonathanomara/agronomic-question-and-answer-dataset")

print("Path to dataset files:", path)