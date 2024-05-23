import request from 'supertest';
import app from '../server.js';
import dotenv from "dotenv";
dotenv.config();

// Dummy Data
import {client} from "./dummyClient.js";
import {character1, character2} from './data/characterSheetTestData.js';

describe('Character Sheet Editor Routes', () => {
    let user1token, user2token;
    before(async () =>{
        user1token = client.getToken('user1');
        user2token = client.getToken('user2');

        try {
            await request(app)
                .post('/api/v1/account')
                .set('Authorization', `Bearer ${user1token}`)
                .expect(201)
        } catch(err) {
            console.log(err);
        }
    });

    describe('POST /character-sheet', () => {
        it('Should return a character sheet w/ Bearer token (1)', async () => {
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

        it('Should fail w/o account', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user2token}`)
                .send(characterDetails)
                .expect(404)
        });

        it('Should return a character sheet w/ Bearer token (2)', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .send(characterDetails)
                .expect(201)
        });

        it('Should return a character sheet w/ Bearer token (3)', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .send(characterDetails)
                .expect(201)
        });

        it('Should fail w/ insufficient gold balance', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .send(characterDetails)
                .expect(422)
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
