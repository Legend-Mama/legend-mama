import json

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

    return json.dumps(json_data, indent=4)

# Example usage:
# Assuming 'table.md' is your markdown file that contains the table
json_output = parse_markdown_table('markDowns/classes/warlock.md')
print(json_output)
