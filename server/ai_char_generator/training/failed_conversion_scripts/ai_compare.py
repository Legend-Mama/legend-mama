from openai import OpenAI
import os
from dotenv import load_dotenv
import json

# Load environment variables from .env file
load_dotenv()

client = OpenAI(
  api_key=os.environ['OPENAI_API_KEY'], 
)

# Read markdown file 
def read_markdown(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def read_jsonl(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def compare_markdown_to_jsonl(md_content, jsonl_content):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        temperature=0,
        messages=[
    {"role": "system", 
     "content": "Compare two files, one is markdown and the other is jsonl, and let me know if the jsonl file is suitable for fine-tuning. I would like to fine-tune a model to generate D&D character sheets. If the file is not suitable, bullet point the differences between the files. Also tell me in percent how well suited the jsonl file would be for training. 100% = perfect file "
},
    {"role": "user", 
 "content": f"Markdown Content:\n{md_content}\n\nJSONL Content:\n{jsonl_content}"}

  ]
)
    content = response.choices[0].message.content
    return content

md_content = read_markdown('markDowns/classes/wizard.md')
# jsonl_content = read_jsonl('markDowns/classes/druid.jsonl')
jsonl_content = read_jsonl('converted_files/classes/wizard.jsonl')
result = compare_markdown_to_jsonl(md_content, jsonl_content)
print(result)