import request from 'supertest';
import app from '../server.js';
import {client} from "./dummyClient.js";
import {character1} from "./data/characterSheetTestData.js";
import {firestore} from "../firebase.js";

async function setGoldBalance(token, balance) {
    const arrayToken = token.split('.');
    const data = JSON.parse(atob(arrayToken[1]));
    const docRef = firestore.doc(`accounts/${data.user_id}`);
    await docRef.set({
        goldBalance: balance
    });
}


describe('Character Illustration Routes', () => {
    let user1token, user2token, response;
    before(async () => {
        user1token = client.getToken('user1');
        user2token = client.getToken('user2');

        // Create account if it doesn't exist already
        try {
            await request(app)
                .get('/api/v1/account/gold-balance')
                .set('Authorization', `Bearer ${user1token}`)
                .expect(200);

            await setGoldBalance(user1token, 3);

        } catch(err) {
            await request(app)
                .post('/api/v1/account')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .expect(201);
        }
    });

    describe('POST /character-illustration', () => {
        it('Should return signed URL (1)', async () => {
            response = await request(app)
                .post('/api/v1/character-illustration')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'race': character1.charSheet.race,
                    'class':character1.charSheet.class,
                    'backstory': character1.charSheet.backstory
                })
                .expect(201);

            character1.charSheet.charImage = response.body.url;
        });

        it('Should fail w/o Bearer token', async () => {
             await request(app)
                .post('/api/v1/character-illustration')
                .set('Content-Type', 'application/json')
                .send({
                    'race': character1.charSheet.race,
                    'class':character1.charSheet.class,
                    'backstory': character1.charSheet.backstory
                })
                .expect(401);
        });

        it('Should fail w/o account', async () => {
            await request(app)
                .post('/api/v1/character-illustration')
                .set('Authorization', `Bearer ${user2token}`)
                .send({
                    'race': character1.charSheet.race,
                    'class':character1.charSheet.class,
                    'backstory': character1.charSheet.backstory
                })
                .expect(404);
        });

        it('Should fail w/ insufficient gold balance', async () => {
            // Manually remove gold
            await setGoldBalance(user1token, 0);

            await request(app)
                .post('/api/v1/character-illustration')
                .set('Authorization', `Bearer ${user1token}`)
                .send({
                    'race': character1.charSheet.race,
                    'class':character1.charSheet.class,
                    'backstory': character1.charSheet.backstory
                })
                .expect(422);
        });
    });

    describe('GET /character-illustration', () => {
        let sheetID, charImage;

        it('Should return signed URL', async () => {
            response = await request(app)
                .post('/api/v1/account/character-sheets')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(character1.charSheet)
                .expect(201);

            sheetID = response.body.sheetID;

            response = await request(app)
                .get(`/api/v1/account/character-sheets/${sheetID}`)
                .set('Authorization', `Bearer ${user1token}`)
                .expect(200);

            charImage = response.body.charImage;

            await request(app)
                .get(`/api/v1/character-illustration/${charImage}`)
                .set('Authorization', `Bearer ${user1token}`)
                .expect(200);
        });

        it('Should fail w/o Bearer token', async () => {
            await request(app)
                .get(`/api/v1/character-illustration/${charImage}`)
                .expect(401);
        });

        it('Should fail w/ nonexistent account', async () => {
            await request(app)
                .get(`/api/v1/character-illustration/${charImage}`)
                .set('Authorization', `Bearer ${user2token}`)
                .expect(404);
        });

        it('Should fail with nonexistent image ID', async () => {
            await request(app)
                .get(`/api/v1/character-illustration/a-nonexistent-image-id`)
                .set('Authorization', `Bearer ${user1token}`)
                .expect(404);
        });
    });
});

