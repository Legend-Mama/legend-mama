import { AICharGen } from './ai_char_generator/library/AICharGen.js'
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';
import dotenv from 'dotenv';
dotenv.config();
const client = new SecretManagerServiceClient();
const vectorStoreId = "vs_3WaLOhWlKHZtYUjygY88CoGH";
const assistantId = "asst_RECoDw8dGhucYq5fqVbtr7bn";

/**
 * Get secret from GCP Secret Manager
 * https://cloud.google.com/secret-manager/docs/access-secret-version
 */
async function getOpenAIAPIKey() {
    const name = `projects/780538328126/secrets/openai-api-key/versions/latest`;

    try {
        // Access the secret version
        const [version] = await client.accessSecretVersion({ name });

        // Extract the payload as a string
        return version.payload.data.toString();
    } catch (error) {
        throw new Error(`Failed to retrieve OpenAI API Key: ${error.message}`);
    }
}

// Initialize charGen
const charGen = new AICharGen(await getOpenAIAPIKey());
await charGen.initialize({
    vectorStoreId: vectorStoreId,
    assistantId: assistantId
})

export default charGen;