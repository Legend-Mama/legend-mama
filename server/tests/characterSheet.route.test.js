import request from 'supertest';
import app from '../server.js';

// Dummy Client and Data
import {client} from "./dummyClient.js";
import {character1, character2} from './data/characterSheetTestData.js';
import {firestore} from "../firebase.js";

async function setGoldBalance(token, balance) {
    const arrayToken = token.split('.');
    const data = JSON.parse(atob(arrayToken[1]));
    const docRef = firestore.doc(`accounts/${data.user_id}`);
    await docRef.set({
        goldBalance: balance
    });
}

describe('Character Sheet Editor Routes', () => {
    let user1token, user2token;
    before(async () =>{
        user1token = client.getToken('user1');
        user2token = client.getToken('user2');

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

    describe('POST /character-sheet', () => {
        it('Should return a character sheet w/ Bearer token (1)', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send(character1.charDetails)
                .expect(201);
        });

        it('Should fail w/o Bearer token', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Content-Type', 'application/json')
                .send(character1.charDetails)
                .expect(401);
        });

        it('Should fail w/o account', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user2token}`)
                .send(character1.charDetails)
                .expect(404);
        });

        it('Should fail w/ invalid request body', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send({name: "Potato Man"})
                .expect(400);
        });

        it('Should fail w/ insufficient gold balance', async () => {
            // Manually remove gold
            await setGoldBalance(user1token, 0);

            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .send(character1.charDetails)
                .expect(422);
        });
    });

    describe('PUT /character-sheet', () => {
        it('Should return edited character sheet w/ Bearer token', async () => {
            await request(app)
                .put('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send(character2.generatedChar)
                .expect(200);
        });

        it('Should fail w/o Bearer token', async () => {
            await request(app)
                .put('/api/v1/character-sheet')
                .set('Content-Type', 'application/json')
                .send(character2.generatedChar)
                .expect(401);
        });

        it('Should fail w/ invalid request body', async () => {
            await request(app)
                .put('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send({name: "Potato Man"})
                .expect(400);
        });
    });
});
