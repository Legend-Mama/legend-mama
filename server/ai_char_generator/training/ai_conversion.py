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

def convert_markdown_to_jsonl(md_content):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        temperature=0,
        messages=[
    {"role": "system", 
     "content": "Convert the content of a markdown file into a structured JSON format, suitable for direct use in a JSONL file for fine-tuning a machine learning model. Each section of the markdown should be represented as a separate JSON object. The structure should clearly delineate sections, subheadings, and key content points, ensuring that each JSON object captures a distinct block or element of the original markdown without requiring interpretation or additional processing. Ensure that the JSON objects are self-contained so that they can be written line-by-line into a JSONL file."},
    {"role": "user", 
     "content": md_content},     
  ]
)
    content = response.choices[0].message.content
    return content

md_content = read_markdown('markDowns/races/dragonborn.md')
result = convert_markdown_to_jsonl(md_content)
# print(result)

with open("dragonborn.jsonl", "w") as outfile:
    outfile.write(result)

# Re-process the file to remove all instances of triple tick marks (both opening and closing)

with open('dragonborn.jsonl', 'r') as infile, open('final_dragonborn.jsonl', 'w') as outfile:
    for line in infile:
        if line.strip() != '```json' and line.strip() != '```':  
            processed_line = line.replace(' json', '').replace('json ', '')
            outfile.write(processed_line)





