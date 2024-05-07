
import markdown
from bs4 import BeautifulSoup
import json
import re

def extract_class_name(description):
    match = re.search(r"description: Rules and information for the (\w+) class", description)
    if match:
        return match.group(1)
    return None

def markdown_to_jsonl(md_content):
    html_content = markdown.markdown(md_content, extensions=['tables', 'attr_list'])
    soup = BeautifulSoup(html_content, 'html.parser')
    jsonl_output = ""
    current_header = None
    class_name = None

    for element in soup.find_all(True):
        if element.name in ['h1', 'h2', 'h3', 'h4']:
            current_header = element.get_text(strip=True)
        elif element.name in ['p', 'li'] and current_header:
            text = element.get_text(strip=True)
            if current_header.lower() == 'description':
                class_name = extract_class_name(text)
            json_data = {current_header: text}
            if class_name:
                json_data["class_name"] = class_name
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

# Example usage
markdown_text = "description: Rules and information for the Barbarian class from the 5th Edition (5e) SRD (System Reference Document).\nSome more markdown content here."
jsonl_content = markdown_to_jsonl(markdown_text)
consolidated_data = consolidate_jsonl(jsonl_content)

# Print or write the consolidated JSONL data to a file
print(consolidated_data)
