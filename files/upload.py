import os
import openai
from decouple import config

# Read your OpenAI API key from the .env file using decouple
openai.api_key = config('OPENAI_API_KEY')

# Create a new file for fine-tuning
file_upload = openai.File.create(
    file=open("output.jsonl", "rb"),  # Replace with the actual path to your JSONL file
    purpose='fine-tune'
)

# 'file_upload' will now contain information about the uploaded file, including its ID

# You can print the file ID to verify the upload
print("File ID:", file_upload.id)
