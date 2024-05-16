import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

dotenv.config();

const openai = new OpenAI();


// Function to create stream array from files in a given directory
function createStreamsFromFolder(folderPath) {
  try {
    // Read all files in the directory
    const fileNames = fs.readdirSync(folderPath);

    // Create a read stream for each file in the directory
    const fileStreams = fileNames.map(fileName => {
      const filePath = path.join(folderPath, fileName);
      return fs.createReadStream(filePath);
    });

    return fileStreams;
  } catch (error) {
    console.error('Failed to read directory or create streams:', error);
    return [];
  }
}


async function main(fileStreams) {
  const vectorStore = await openai.beta.vectorStores.create({
    name: "Dungeons and Dragons Training Files",
  });

  await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
    files: fileStreams
  });
  console.log(vectorStore.id);
}

const fileStreams = createStreamsFromFolder('../training/vector_store');

main(fileStreams);
