import request from 'supertest';
import app from '../server.js';

// Dummy Data
import {client} from "./dummyClient.js";
import {character1, character2} from './data/characterSheetTestData.js';

describe('Character Sheet Editor Routes', () => {
    let user1token, user2token;
    before(() =>{
        user1token = client.getToken('user1');
        user2token = client.getToken('user2');
    });

    describe('POST /character-sheet', () => {
        it('Should return a character sheet w/ Bearer token', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send(character1.charDetails)
                .expect(201, character1.charSheet)
        });

        it('Should fail w/o Bearer token', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Content-Type', 'application/json')
                .send(character1.charDetails)
                .expect(401)
        });

        it('Should fail w/ invalid request body', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send({name: "Potato Man"})
                .expect(400)
        });
    });

    describe('PUT /character-sheet', () => {
        it('Should return edited character sheet w/ Bearer token', async () => {
            await request(app)
                .put('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send(character2.generatedChar)
                .expect(200, character2.charSheet)
        });

        it('Should fail w/o Bearer token', async () => {
            await request(app)
                .put('/api/v1/character-sheet')
                .set('Content-Type', 'application/json')
                .send(character2.generatedChar)
                .expect(401)
        });

        it('Should fail w/ invalid request body', async () => {
            await request(app)
                .put('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .set('Content-Type', 'application/json')
                .send({name: "Potato Man"})
                .expect(400)
        });
    });
});
