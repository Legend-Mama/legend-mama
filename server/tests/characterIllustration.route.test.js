import request from 'supertest';
import app from '../server.js';
import {client} from "./dummyClient.js";

describe('Character Illustration Routes', () => {
    let user1token, user2token, illustrationID;
    before(() => {
        user1token = client.getToken('user1');
        user2token = client.getToken('user2');
    });

    describe('POST /character-illustration', () => {

        it('Should return image url', async () => {
            const race = "Human";
            const clss = "Rogue";
            const backstory = "Ethan Storm was once a top operative in a secret military organization, known for his daring and " +
                "unconventional methods. After a mission went wrong and his closest comrade sacrificed themselves to save him, " +
                "Ethan left the military, seeking redemption and a new purpose. He now uses his skills to take on dangerous missions " +
                "and protect those who cannot protect themselves. Despite his recklessness and penchant for breaking the rules, " +
                "Ethan's charisma and sense of duty make him a valuable ally and a formidable opponent.";


            const response = await request(app)
                .post('/api/v1/character-illustration')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'race': race,
                    'class':clss,
                    'backstory': backstory
                })
                .expect(201);

            illustrationID = response.body.illustrationID;
        });
    });

    describe('GET /character-illustration', () => {
        it('Should return image url', async () => {
            const response = await request(app)
                .get(`/api/v1/character-illustration/${illustrationID}`)
                .set('Authorization', `Bearer ${user1token}`)
                .expect(200);
        });
    });
});

