import dotenv from "dotenv";
import { json } from "express";
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

function jsonToString(jsonObject) {
  let result = [];

  // Iterate over each key in the JSON object
  for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
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
}

async function generateChar(user_input) {
  const str_user_input = jsonToString(user_input);
  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: str_user_input,
  });

  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: "asst_vH7l0hkddEkyIzWsew2tlvdf",
  });

  let returnedMessage = "";
  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    for (const message of messages.data.reverse()) {
      //console.log(`${message.role} > ${message.content[0].text.value}`);
      returnedMessage = message.content[0].text.value;
    }
  } else {
    console.log(run.status);
  }

  // Use regular expression to find JSON block within the string
  const jsonMatch = returnedMessage.match(/```json\s*({[\s\S]*?})\s*```/);

  if (jsonMatch && jsonMatch[1]) {
    // Extract the JSON string and parse it
    const jsonString = jsonMatch[1];
    const jsonData = JSON.parse(jsonString);

    // Logging the JSON data to console (or manipulate it as needed)
    console.log(jsonData);
  } else {
    console.log("No JSON data found!");
  }
}

let user_input = {
  "name": "Eldrin Starfire",
  "race": "Elf",
  "class": "Wizard",
  "worldview": "Chaotic Good",
  "ethicalTraits": ["curious", "freethinking", "unpredictable"],
  "personality": ["intelligent", "reserved", "observant"],
  "quirks": ["constantly reads books, even in dangerous situations", "talks to plants as if they were sentient", "obsessively organizes spell components"],
  "motivations": ["seeking ancient arcane knowledge", "desire to prove self to a long-lost mentor", "need to undo a family curse"],
  "fears": ["dark magic", "being forgotten", "deep water"],
  "likes": ["stargazing", "complex puzzles", "old maps"],
  "dislikes": ["loud noises", "rudeness", "confined spaces"],
  "backstory": "Eldrin was born under a meteor shower that blessed him with innate magical abilities. Raised in a secluded tower by a mysterious sorcerer, he left home after a tragic betrayal. Now, he travels the land seeking to unlock the secrets of the universe and restore his family's honor."
};

generateChar(user_input)
