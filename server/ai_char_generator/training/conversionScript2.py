import markdown
from bs4 import BeautifulSoup
import json
import pandas

def markdown_to_jsonl(md_content):
    html_content = markdown.markdown(md_content, extensions=['tables', 'attr_list'])
    soup = BeautifulSoup(html_content, 'html.parser')
    jsonl_output = ""
    current_header = None

    for element in soup.find_all(True):
        if element.name in ['h1', 'h2', 'h3', 'h4']:
            current_header = element.get_text(strip=True)
        elif element.name in ['p', 'li'] and current_header:
            json_data = {current_header: element.get_text(strip=True)}
            jsonl_output += json.dumps(json_data) + "\n"
        elif element.name == 'table':
            headers = [th.get_text(strip=True) for th in element.find_all('th')]
            for row in element.find_all('tr')[1:]:
                values = [td.get_text(strip=True) for td in row.find_all('td')]
                if current_header:
                    json_data = {current_header: dict(zip(headers, values))}
                    jsonl_output += json.dumps(json_data) + "\n"

    return jsonl_output

def consolidate_jsonl(jsonl_content):
    data = jsonl_content.splitlines()
    consolidated_data = {}
    
    for line in data:
        item = json.loads(line)
        for key, value in item.items():
            if key not in consolidated_data:
                consolidated_data[key] = value
            else:
                if not isinstance(consolidated_data[key], list):
                    consolidated_data[key] = [consolidated_data[key]]
                consolidated_data[key].append(value)
    
    for key in consolidated_data:
        if isinstance(consolidated_data[key], list):
            consolidated_data[key] = "; ".join([str(elem) for elem in consolidated_data[key]])
    
    return consolidated_data

# Read Markdown file
with open('markDowns/classes/bard.md', 'r') as file:
    markdown_text = file.read()

# Convert to JSONL and consolidate
jsonl_content = markdown_to_jsonl(markdown_text)
consolidated_data = consolidate_jsonl(jsonl_content)

# Write the consolidated JSONL data to a file
output_filepath = 'final_output.jsonl'
with open(output_filepath, 'w') as file:
    for key, value in consolidated_data.items():
        json_line = json.dumps({key: value})
        file.write(json_line + '\n')

print("Conversion and consolidation complete. Check the final_output.jsonl file.")
