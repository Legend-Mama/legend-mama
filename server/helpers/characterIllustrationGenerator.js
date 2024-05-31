import OpenAI from "openai";

export default class CharacterIllustrationGenerator {
    assistantID = 'asst_pK8m6XMIyrKX0J03hHyhj7JB';
    constructor(api_key) {
        this.openai = new OpenAI({ apiKey: api_key });
    }

    async generatePrompt(data) {
        const thread = await this.openai.beta.threads.create();
        await this.openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: `\`\`\`json\n{race: ${data.race},\nclass: ${data.class},\nbackstory: ${data.backstory}\n}`,
        });

        let run = await this.openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: this.assistantID,
        });

        let description;
        if (run.status === "completed") {
            const messages = await this.openai.beta.threads.messages.list(run.thread_id);
            description = messages.data[0].content[0].text.value.replace(/"/g, '');
        } else {
            console.log("Run status:", run.status);
        }

        const prompt = "Create a fantasy realism illustration with rich, vibrant colors, detailed line work, and traditional watercolor techniques. " + description;
        console.log(`GPT detailed image prompt: ${prompt}`);
        return prompt
    }

    async generateCharacterIllustration(data) {
        const prompt = await this.generatePrompt(data);

        const response = await this.openai.images.generate({
            model: "dall-e-3",
            style: "vivid",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            user: "legend-mama",
            quality: 'standard'
        });

        console.log(response.data[0].url);
        return response.data[0].url;
    }
}
