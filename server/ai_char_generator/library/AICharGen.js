import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assistantInstructions = fs.readFileSync(path.join(__dirname, "assistant-instructions-v2.txt"), 'utf8');
const vectorStoreFolderPath = path.join(__dirname, "file-search");

dotenv.config();
// const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export class AICharGen {
  // Constructor
  constructor(openai_key) {
    this.openai = new OpenAI({ apiKey: openai_key });
  }

  async initialize({ vectorStoreId = null, assistantId = null }) {
    try {
      if (vectorStoreId == null) {
        this.vectorStoreId = await this.#createVectorStore();
      } else {
        this.vectorStoreId = vectorStoreId;
      }
      if (assistantId == null) {
        this.assistantId = await this.#createAssistant();
      } else {
        this.assistantId = assistantId;
      }
    } catch (error) {
      console.error("Failed to initialize AICharGen:", error);
    }
    return this;
  }

  // Generate character
  async generateChar(user_input) {
    try {
      const str_user_input = this.#jsonToString(user_input);

      const thread = await this.openai.beta.threads.create();

      const message = await this.openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: str_user_input,
      });

      let run = await this.openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: this.assistantId,
      });

      let returnedMessage = "";
      if (run.status === "completed") {
        const messages = await this.openai.beta.threads.messages.list(run.thread_id);
        // console.log(messages)
        for (const message of messages.data.reverse()) {
          // console.log(message)
          returnedMessage = message.content[0].text.value;
          // console.log(returnedMessage)
        }
      } else {
        console.log("Run status:", run.status);
      }

      const response = this.#messageToJSON(returnedMessage);
      return response;

    } catch (error) {
      console.error("Failed to generate character:", error);
    }
  }

  // Convert JSON to string
  #jsonToString(jsonObject) {
    try {
      let result = [];

      // Iterate over each key in the JSON object
      for (const key in jsonObject) {
        if (jsonObject[key] !== undefined) {
          const value = jsonObject[key];

          // Check if the value is an array or a primitive
          if (Array.isArray(value)) {
            // Join array elements with a comma and space
            result.push(`${key}: ${value.join(", ")}`);
          } else {
            // Directly append the value
            result.push(`${key}: ${value}`);
          }
        }
      }

      // Join all results with a line break
      return result.join("\n");
    } catch (error) {
      console.error("Failed to convert JSON to string:", error);
    }
  }

  // Convert response message to JSON
  #messageToJSON(message) {
    try {
      // console.log(message)
      const jsonMatch = message.match(/```json\s*({[\s\S]*?})\s*```/);

      if (jsonMatch && jsonMatch[1]) {
        // Extract the JSON string and parse it
        const jsonString = jsonMatch[1];
        const jsonData = JSON.parse(jsonString);

        // Logging the JSON data to console (or manipulate it as needed)
        //   console.log(jsonData);
        return jsonData;
      } else {
        console.log("No JSON data found!");
      }
    } catch (error) {
      console.error("Failed to convert message to JSON:", error);
    }
  }

  // Create Vector Store
  async #createVectorStore() {
    try {
      const fileStreams = this.#createStreamsFromFolder(vectorStoreFolderPath);
      const vectorStore = await this.openai.beta.vectorStores.create({
        name: "Dungeons and Dragons Training Files",
      });
      await this.openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
        files: fileStreams,
      });
      // console.log(vectorStore.id);
      // console.log(typeof vectorStore.id);
      return vectorStore.id;
    } catch (error) {
      console.error("Failed to create vector store:", error);
    }
  }
  // Create Streams for Vector Store
  #createStreamsFromFolder(folderPath) {
    try {
      // Read all files in the directory
      const fileNames = fs.readdirSync(folderPath);

      // Create a read stream for each file in the directory
      const fileStreams = fileNames.map((fileName) => {
        const filePath = path.join(folderPath, fileName);
        return fs.createReadStream(filePath);
      });

      return fileStreams;
    } catch (error) {
      console.error("Failed to read directory or create streams:", error);
    }
  }

  // Create Assistant
  async #createAssistant() {
    try {
      const assistant = await this.openai.beta.assistants.create({
        name: "dnd_char_generator_json",
        instructions: assistantInstructions,
        tools: [{ type: "file_search" }],
        tool_resources: {
          file_search: { vector_store_ids: [`${this.vectorStoreId}`] },
        },
        model: "gpt-4o",
        temperature: 1,
      });

      return assistant.id;
    } catch (error) {
      console.error("Failed to create assistant:", error);
    }
  }
}
