import glob

def combine_jsonl_files(output_file, input_files_pattern):
    """
    Combines multiple .jsonl files into a single .jsonl file.
    
    :param output_file: Path to the output .jsonl file
    :param input_files_pattern: Pattern to match input .jsonl files
    """
    with open(output_file, 'w') as outfile:
        # Iterate over all files that match the input_files_pattern
        for input_file in glob.glob(input_files_pattern):
            with open(input_file, 'r') as infile:
                # Write each line from the current input file to the output file
                for line in infile:
                    outfile.write(line)

# Example usage: Combine all .jsonl files in the current directory
combine_jsonl_files('combined.jsonl', 'converted_files/final_files/*.jsonl')
