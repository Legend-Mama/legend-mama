import OpenAI from "openai";
const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY});

async function main() {
  const assistant = await openai.beta.assistants.create({
    id: "asst_SkUnCbCPuA402Mu7U7Omr1CT",
    name: "Dungeons and Dragons Character Sheet Generator",
    tools: [{ type: "file_search" }],
    model: "gpt-4-turbo",
    response_format: { type: "json_object" },
  });
}

main();
