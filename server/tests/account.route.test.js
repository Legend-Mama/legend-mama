import request from 'supertest';
import app from '../server.js';
// Dummy Data
import characterSheet1 from '../local/characterSheet1.json' assert {type: 'json'};
import characterSheet2 from '../local/characterSheet2.json' assert {type: 'json'};
import characterSheet3 from '../local/characterSheet3.json' assert {type: 'json'};

describe('Account Management Routes', () => {
    const token = 'some-firebase-id-token';

    describe('POST /account', () => {
        it('Should create a new account w/ token', async () => {
            await request(app)
                .post('/api/v1/account')
                .set('Authorization', `Bearer ${token}`)
                .expect(201)
        });

        it('Should fail to create new account w/o token', async () => {
            await request(app)
                .post('/api/v1/account')
                .expect(401)
        });

        it('Should fail to create an account that already exists', async () => {
            await request(app)
                .post('/api/v1/account')
                .set('Authorization', `Bearer ${token}`)
                .expect(403)
        });
    });

    describe('GET /account/gold-balance', () => {
        it('Should get account gold balance w/ token', async () => {
            await request(app)
                .get('/api/v1/account/gold-balance')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        });

        it('Should fail to get account gold balance w/o token', async () => {
            await request(app)
                .get('/api/v1/account/gold-balance')
                .expect(401)
        });

        it('Should fail to get gold balance for nonexistent account', async () => {
            await request(app)
                .get('/api/v1/account/gold-balance')
                .set('Authorization', `Bearer 1234`)
                .expect(404)
        });
    });

    describe('POST /account/character-sheets', () => {
        it('Should save character sheet to account w/ token', async () => {
            await request(app)
                .post('/api/v1/account/character-sheets')
                .set('Authorization', `Bearer ${token}`)
                .send(characterSheet1)
                .expect(201)
        });

        it('Should save character sheet to account w/ token (2)', async () => {
            await request(app)
                .post('/api/v1/account/character-sheets')
                .set('Authorization', `Bearer ${token}`)
                .send(characterSheet2)
                .expect(201)
        });

        it('Should save character sheet to account w/ token (3)', async () => {
            await request(app)
                .post('/api/v1/account/character-sheets')
                .set('Authorization', `Bearer ${token}`)
                .send(characterSheet3)
                .expect(201)
        });

        it('Should fail to save character sheet to account w/o token', async () => {
            await request(app)
                .post('/api/v1/account/character-sheets')
                .send(characterSheet1)
                .expect(401)
        });

        it('Should fail to save character sheet to nonexistent account', async () => {
            await request(app)
                .post('/api/v1/account/character-sheets')
                .set('Authorization', `Bearer 1234`)
                .send(characterSheet1)
                .expect(404)
        });
    });

    let sheetId, sheetIdDelete;
    describe('GET /account/character-sheets', () => {
        it('Should list account character sheets w/ token', async () => {
            const response = await request(app)
                .get('/api/v1/account/character-sheets')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            sheetId = response.body[0].id;
            sheetIdDelete = response.body[1].id
        });

        it('Should fail to list account character sheets w/o token', async () => {
            await request(app)
                .get('/api/v1/account/character-sheets')
                .expect(401)
        });

        it('Should fail to list character sheets for nonexistent account', async () => {
            await request(app)
                .get('/api/v1/account/character-sheets')
                .set('Authorization', `Bearer 1234`)
                .expect(404)
        });
    });

    describe('GET /account/character-sheets/:character_sheet_id', () => {
        it('Should return character sheet w/ token', async () => {
            await request(app)
                .get(`/api/v1/account/character-sheets/${sheetId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        });

        it('Should fail to return character sheet w/o token', async () => {
            await request(app)
                .get(`/api/v1/account/character-sheets/${sheetId}`)
                .expect(401)
        });

        it('Should fail to return character sheet for nonexistent account', async () => {
            await request(app)
                .get(`/api/v1/account/character-sheets/${sheetId}`)
                .set('Authorization', `Bearer 1234`)
                .expect(404)
        });

        it('Should fail to return character sheet for nonexistent sheet ID', async () => {
            await request(app)
                .get(`/api/v1/account/character-sheets/1234`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });
    });

    describe('PUT /account/character-sheets/:character_sheet_id', () => {
        it('Should update character sheet w/ token', async () => {
            await request(app)
                .put(`/api/v1/account/character-sheets/${sheetId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'name': 'Eugene Twinkletoes'
                })
                .expect(200)

            await request(app)
                .get(`/api/v1/account/character-sheets/${sheetId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect(function (res) {
                    res.body.name = 'Eugene Twinkletoes'
                })
        });

        it('Should fail to update character sheet w/o token', async () => {
            await request(app)
                .put(`/api/v1/account/character-sheets/${sheetId}`)
                .send({
                    'name': 'Eugene Twinkletoes'
                })
                .expect(401)
        });

        it('Should fail to update character sheet for nonexistent account', async () => {
            await request(app)
                .put(`/api/v1/account/character-sheets/${sheetId}`)
                .set('Authorization', `Bearer 1234`)
                .send({
                    'name': 'Eugene Twinkletoes'
                })
                .expect(404)
        });

        it('Should fail to update character sheet for nonexistent sheet ID', async () => {
            await request(app)
                .put(`/api/v1/account/character-sheets/1234`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'name': 'Eugene Twinkletoes'
                })
                .expect(404)
        });
    });

    describe('DELETE /account/character-sheets/:character_sheet_id', () => {
        it('Should delete character sheet w/ token', async () => {
            await request(app)
                .delete(`/api/v1/account/character-sheets/${sheetIdDelete}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        });

        it('Should fail to delete character sheet w/o token', async () => {
            await request(app)
                .delete(`/api/v1/account/character-sheets/${sheetId}`)
                .expect(401)
        });

        it('Should fail to delete character sheet for nonexistent account', async () => {
            await request(app)
                .delete(`/api/v1/account/character-sheets/${sheetId}`)
                .set('Authorization', `Bearer 1234`)
                .expect(404)
        });

        it('Should fail to delete character sheet for nonexistent sheet ID', async () => {
            await request(app)
                .delete(`/api/v1/account/character-sheets/1234`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });
    });

    describe('DELETE /account', () => {
        it('Should fail to delete account w/o token', async () => {
            await request(app)
                .delete(`/api/v1/account`)
                .expect(401)
        });

        it('Should delete account w/ token', async () => {
            await request(app)
                .delete(`/api/v1/account`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        });

        it('Should fail to delete account for nonexistent account', async () => {
            await request(app)
                .delete(`/api/v1/account`)
                .set('Authorization', `Bearer 1234`)
                .expect(404)
        });
    });
});

