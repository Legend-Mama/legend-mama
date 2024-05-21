import request from 'supertest';
import app from '../server.js';
import dotenv from "dotenv";
dotenv.config();

// Dummy Data
import characterDetails from './data/characterDetails1.json' assert {type: 'json'};
import characterSheet from './data/characterSheet1.json' assert {type: 'json'};
import {client} from "./dummyClient.js";

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
                .send(characterDetails)
                .expect(201)
        });

        it('Should fail w/o Bearer token', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .send(characterDetails)
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
    });

    describe('PUT /character-sheet', () => {
        it('Should return edited character sheet w/ Bearer token', async () => {
            await request(app)
                .put('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${user1token}`)
                .send(characterSheet)
                .expect(200)
        });

        it('Should fail w/o Bearer token', async () => {
            await request(app)
                .put('/api/v1/character-sheet')
                .send(characterSheet)
                .expect(401)
        });
    });
});
