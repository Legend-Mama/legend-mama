import request from 'supertest';
import app from '../server.js';
// Dummy Data
import characterDetails from '../local/characterDetails1.json' assert {type: 'json'};
import characterSheet from '../local/characterSheet1.json' assert {type: 'json'};

describe('Character Sheet Editor Routes', () => {
    const token = 'some-firebase-id-token';

    describe('POST /character-sheet', () => {
        it('Should return a character sheet w/ Bearer token', async () => {
            const response = await request(app)
                .post('/api/v1/character-sheet')
                .set('Authorization', `Bearer ${token}`)
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
                .set('Authorization', `Bearer ${token}`)
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
