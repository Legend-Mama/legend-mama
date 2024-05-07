import markdown
from bs4 import BeautifulSoup
import json
import os

def read_markdown(file_path):
    with open(file_path, 'r') as file:
        return file.read()
    
def parse_markdown_table(file_path):
    # Read the file content
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Find the start and end of the table
    start_index = -1
    end_index = -1
    for i, line in enumerate(lines):
        if line.strip().startswith('|') and start_index == -1:
            start_index = i
        elif not line.strip().startswith('|') and start_index != -1:
            end_index = i
            break
    if end_index == -1:  # In case the table is at the end of the file
        end_index = len(lines)

    # Extract the table lines
    table_lines = lines[start_index:end_index]

    # Get headers from the first line
    headers = table_lines[0].strip('| \n').split('|')
    headers = [header.strip() for header in headers]

    # Initialize the JSON data list
    json_data = []

    # Parse each row in the table
    for line in table_lines[2:]:  # Skip header and the separator line
        if '|' in line:
            values = line.strip('| \n').split('|')
            values = [value.strip() for value in values]
            row_dict = dict(zip(headers, values))
            json_data.append(row_dict)

    return json_data

def markdown_to_jsonl(md_content):
    html_content = markdown.markdown(md_content, extensions=['tables', 'attr_list'])
    soup = BeautifulSoup(html_content, 'html.parser')
    jsonl_output = ""
    current_header = None

    for element in soup.find_all(True):
        if element.name in ['h1', 'h2', 'h3', 'h4']:
            current_header = element.get_text(strip=True)
        elif element.name in ['p', 'li'] and current_header:
            json_data = {
                current_header: element.get_text().replace(u"\u2019", "'").strip()
            }
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
            consolidated_data[key] = " ".join([str(elem) for elem in consolidated_data[key]])
    
    return consolidated_data

def process_files_in_directory(input_path, output_path, type):
    for filename in os.listdir(input_path):
        if filename.endswith('.md'):
            # Read the markdown file
            md_file_path = os.path.join(input_path, filename)
            

            # Parse and write the table 
            table = parse_markdown_table(md_file_path)
            output_file_name = f"{filename.replace('.md', '.jsonl')}"
            output_file_path = os.path.join(output_path, output_file_name)
            with open(output_file_path, 'w') as output_file:
                for item in table:
                    item[type] = filename[:-3]
                    output_file.write(json.dumps(item) + '\n')

            # Get rest of markdown data
            md_content = read_markdown(md_file_path)
            result = markdown_to_jsonl(md_content)

            # Consolidate data
            consolidated_data = consolidate_jsonl(result)

            # Write consolidated data to file 
            output_file_name = f"{filename.replace('.md', '.jsonl')}"
            output_file_path = os.path.join(output_path, output_file_name)

            with open(output_file_path, 'a') as file:
                for key, value in consolidated_data.items():
                    json_line = json.dumps({type : filename[:-3], key: value})
                    file.write(json_line + '\n')

# process_files_in_directory('srd_markdowns/classes', 'srd_jsonl/classes', "Class")
# process_files_in_directory('srd_markdowns/races', 'srd_jsonl/races', "Race")
# process_files_in_directory('srd_markdowns', 'srd_jsonl/other', "D&D Data")

            
            