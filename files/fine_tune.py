import openai
from decouple import config

# Read your OpenAI API key from the .env file using decouple
openai.api_key = config('OPENAI_API_KEY')
openai.FineTuningJob.create(training_file="file-BP0AKNFRlb53WQDn3vbknoEm", model="gpt-3.5-turbo-0613")