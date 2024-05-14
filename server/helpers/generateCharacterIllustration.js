import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({path: "../.env"});

const openai = new OpenAI({ apiKey: process.env.OPENAI_DEV_API_KEY });

export async function generateCharacterIllustration(race, clss, backstory){

    const description = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                "role": "system",
                "content": "You will be provided the race, class, and backstory of a high fantasy character. Using this information, generate a DALL-E 3 image prompt that results in an illustration of the character posing or performing an activity in a detailed scene. The prompt should include a description of the character's attire, appearance, and pose. It should also describe the background of the image in detail. Only respond with the generated prompt."
            },
            {
                role: "user",
                content: `Race: ${race}\nClass: ${clss}\nBackstory: ${backstory}`,
            }
        ],
        max_tokens: 200,
    });

    const prompt = "Create a fantasy realism illustration with rich, vibrant colors, detailed line work, and traditional watercolor techniques. " + description.choices[0].message.content;
    console.log(prompt);

    const response = await openai.images.generate({
        model: "dall-e-3",
        style: "vivid",
        prompt: prompt,
        n: 1,
        size: "1024x1792",
        user: "legend-mama",
        quality: 'standard'
    });

    console.log(response.data[0].url);
    return response.data[0].url;
}
