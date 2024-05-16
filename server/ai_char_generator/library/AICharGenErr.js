import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { type } from "os";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export class AICharGen {
  // Constructor
  async initialize({ vectorStoreId = null, assistantId = null }) {
    try {
      if (!vectorStoreId) {
        this.vectorStoreId = await this.#createVectorStore();
      } else if (typeof vectorStoreId !== "string") {
        throw new TypeError("vectorStoreId must be a string");
      } else {
        this.vectorStoreId = vectorStoreId;
      }

      if (!assistantId) {
        this.assistantId = await this.#createAssistant();
      } else if (typeof assistantId !== "string") {
        throw new TypeError("assistantId must be a string");
      } else {
        this.assistantId = assistantId;
      }
    } catch (error) {
      console.error("Initialization error:", error);
      throw error; // Re-throw to let caller handle it
    }
    return this;
  }

  // Generate character
  async generateChar(user_input) {
    if (typeof user_input !== "object" || user_input === null) {
      throw new TypeError("user_input must be a non-null object");
    }

    try {
      const str_user_input = this.#jsonToString(user_input);

      const thread = await openai.beta.threads.create();

      const message = await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: str_user_input,
      });

      let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: this.assistantId,
      });

      if (run.status !== "completed") {
        throw new Error(`Run failed with status: ${run.status}`);
      }

      const messages = await openai.beta.threads.messages.list(run.thread_id);
      if (!messages.data.length) {
        throw new Error("No messages returned from the run");
      }

      let returnedMessage = messages.data.reverse()[0].content[0].text.value;
      const response = this.#messageToJSON(returnedMessage);
      return response;
    } catch (error) {
      console.error("Character generation error:", error);
      throw error; // Re-throw to let caller handle it
    }
  }

  // Convert JSON to string
  #jsonToString(jsonObject) {
    let result = [];
    try {
      for (const key in jsonObject) {
        if (jsonObject.hasOwnProperty(key)) {
          const value = jsonObject[key];
          if (Array.isArray(value)) {
            result.push(`${key}: ${value.join(", ")}`);
          } else if (typeof value === "string" || typeof value === "number") {
            result.push(`${key}: ${value}`);
          } else {
            throw new TypeError(`Unsupported type for key ${key}`);
          }
        }
      }
    } catch (error) {
      console.error("JSON to string conversion error:", error);
      throw error;
    }
    return result.join("\n");
  }

  // Convert response message to JSON
  #messageToJSON(message) {
    try {
      const jsonMatch = message.match(/```json\s*({[\s\S]*?})\s*```/);
      if (!jsonMatch || !jsonMatch[1]) {
        throw new Error("No valid JSON data in message");
      }
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error("Message to JSON conversion error:", error);
      throw error;
    }
  }

  // Create Vector Store
  async #createVectorStore() {
    const folderPath = "../training/test_files";
    try {
      const fileStreams = this.#createStreamsFromFolder(folderPath);
      const vectorStore = await openai.beta.vectorStores.create({
        name: "Dungeons and Dragons Training Files",
      });
      await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
        files: fileStreams,
      });
      return vectorStore.id;
    } catch (error) {
      console.error("Vector store creation error:", error);
      throw error;
    }
  }

  // Create Streams for Vector Store
  #createStreamsFromFolder(folderPath) {
    try {
      const fileNames = fs.readdirSync(folderPath);
      if (!fileNames.length) {
        throw new Error("No files found in directory");
      }
      return fileNames.map((fileName) =>
        fs.createReadStream(path.join(folderPath, fileName))
      );
    } catch (error) {
      console.error("Directory read or stream creation error:", error);
      throw error;
    }
  }

  // Create Assistant
  async #createAssistant() {
    try {
      const assistant = await openai.beta.assistants.create({
        name: "dnd_char_generator_json",
        instructions:
          "You are a Dungeons and Dragons character sheet generator...",
        tools: [{ type: "file_search" }],
        tool_resources: {
          file_search: { vector_store_ids: [`${this.vectorStoreId}`] },
        },
        model: "gpt-4o",
        temperature: 1,
      });
      return assistant.id;
    } catch (error) {
      console.error("Assistant creation error:", error);
      throw error;
    }
  }
}


