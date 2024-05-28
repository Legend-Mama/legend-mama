import request from 'supertest';
import app from '../server.js';
import {client} from "./dummyClient.js";

describe('Character Illustration Routes', () => {
    let user1token, user2token, illustrationID;
    before(async () =>{
        user1token = client.getToken('user1');
        user2token = client.getToken('user2');

        try {
            await request(app)
                .get('/api/v1/account/gold-balance')
                .set('Authorization', `Bearer ${user1token}`)
                .expect(200)
        } catch(err) {
            await request(app)
                .post('/api/v1/account')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .expect(201)
        }
    });

    describe('POST /character-illustration', () => {
        const race = "Human";
        const clss = "Rogue";
        const backstory = "Ethan Storm was once a top operative in a secret military organization, known for his daring and " +
            "unconventional methods. After a mission went wrong and his closest comrade sacrificed themselves to save him, " +
            "Ethan left the military, seeking redemption and a new purpose. He now uses his skills to take on dangerous missions " +
            "and protect those who cannot protect themselves. Despite his recklessness and penchant for breaking the rules, " +
            "Ethan's charisma and sense of duty make him a valuable ally and a formidable opponent.";

        it('Should return signed URL (1)', async () => {
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

        it('Should fail w/o Bearer token', async () => {
            const response = await request(app)
                .post('/api/v1/character-illustration')
                .set('Content-Type', 'application/json')
                .send({
                    'race': race,
                    'class':clss,
                    'backstory': backstory
                })
                .expect(401);
        });

        it('Should fail w/o account', async () => {
            await request(app)
                .post('/api/v1/character-illustration')
                .set('Authorization', `Bearer ${user2token}`)
                .send({
                    'race': race,
                    'class':clss,
                    'backstory': backstory
                })
                .expect(404)
        });

        it('Should return signed URL (2)', async () => {
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
        });

        it('Should return signed URL (3)', async () => {
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
        });

        it('Should fail w/ insufficient gold balance', async () => {
            await request(app)
                .post('/api/v1/character-illustration')
                .set('Authorization', `Bearer ${user1token}`)
                .send({
                    'race': race,
                    'class':clss,
                    'backstory': backstory
                })
                .expect(422)
        });
    });

    describe('GET /character-illustration', () => {
        it('Should return signed URL', async () => {
            const response = await request(app)
                .get(`/api/v1/character-illustration/${illustrationID}`)
                .set('Authorization', `Bearer ${user1token}`)
                .expect(200);
        });

        it('Should fail w/o Bearer token', async () => {
            const response = await request(app)
                .get(`/api/v1/character-illustration/${illustrationID}`)
                .expect(401);
        });

        it('Should fail w/ nonexistent account', async () => {
            const response = await request(app)
                .get(`/api/v1/character-illustration/${illustrationID}`)
                .set('Authorization', `Bearer ${user2token}`)
                .expect(200);
        });

        it('Should fail with nonexistent image ID', async () => {
            const response = await request(app)
                .get(`/api/v1/character-illustration/a-nonexistent-image-id`)
                .set('Authorization', `Bearer ${user1token}`)
                .expect(404);
        });
    });
});

