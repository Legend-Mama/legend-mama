import request from 'supertest';
import app from '../server.js';

// Dummy Data
import characterDetails from './data/characterDetails1.json' assert {type: 'json'};
import characterSheet from './data/characterSheet1.json' assert {type: 'json'};
import {client} from "./dummyClient.js";

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
                .send(characterDetails)
                .expect(201)
        });

        it('Should fail w/o Bearer token', async () => {
            await request(app)
                .post('/api/v1/character-sheet')
                .send(characterDetails)
                .expect(401)
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
