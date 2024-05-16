import fs from "fs";
import path from "path";

// Function to list all files without an extension in a given directory
function findFilesWithNoExtension(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const filesWithoutExtension = files.filter((file) => {
      return path.extname(file) === "";
    });

    if (filesWithoutExtension.length > 0) {
      console.log("Files without an extension:", filesWithoutExtension);
    } else {
      console.log("No files without an extension found.");
    }
  });
}

// Replace 'path/to/directory' with the path to the directory you want to check
findFilesWithNoExtension("../training/vector_store");
