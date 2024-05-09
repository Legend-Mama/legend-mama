import dotenv from "dotenv";
import OpenAI from "openai";

async function ai_char_generator(user_input) {
    dotenv.config();

    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

    const assistant = await openai.beta.assistants.retrieve(
      "asst_SkUnCbCPuA402Mu7U7Omr1CT"
    );
    const thread = await openai.beta.threads.create()

    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: user_input,
    });

    let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id,
      instructions:
        "Please address the user as Jane Doe. The user has a premium account.",
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      for (const message of messages.data.reverse()) {
        console.log(`${message.role} > ${message.content[0].text.value}`);
      }
    } else {
      console.log(run.status);
    }
}

let user_input = "name: Arya Moonwhisper\nrace: Elf\nclass: Ranger\nworldview: Chaotic Good\nethicalTraits: independent, unpredictable, resourceful\npersonality: observant, daring, aloof\nquirks: always chewing on a blade of grass, sketches maps wherever she goes, distrusts horses\nmotivations: explore uncharted territories, uncover hidden truths, escape her past\nfears: entrapment, losing her senses, deep water\nlikes: archery, solitude, the thrill of the hunt\ndislikes: crowds, loud noises, restrictions\nbackstory: Arya was once a scout for an elite elven guard but turned away from her duties to wander the lands freely. Haunted by a failed mission that cost lives, she now seeks redemption and purpose in the wilds."

ai_char_generator(user_input);


