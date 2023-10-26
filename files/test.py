from decouple import config
import openai
# Read your OpenAI API key from the .env file using decouple
openai.api_key = config('OPENAI_API_KEY')

completion = openai.ChatCompletion.create(
  model="ft:gpt-3.5-turbo-0613:bit-systems::8DeJ6xQA",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Tell me more about JBS"}
  ]
)
print(completion.choices[0].message)