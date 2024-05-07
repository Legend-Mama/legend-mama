import OpenAI from "openai";
const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY});

async function main() {
  const assistant = await openai.beta.assistants.create({
    name: "Math Tutor",
    instructions:
      "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-turbo",
  });
}

main();
