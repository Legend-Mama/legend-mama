import express from 'express';
import authenticateJWT from '../middleware/authenticate.js';
import {firestore} from '../firebase.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const name = process.env.NAME || 'World';
    res.send(`Hello ${name}!<br/>This is the Legend Mama backend.`);
});

router.get('/private', authenticateJWT, async (req, res) => {
    const name = process.env.NAME || 'World'
    res.send(`Hello ${name}!<br/>This is the Legend Mama backend. This is a private route`);
});

router.get('/data', async (req, res) => {
    const name = process.env.NAME || 'World'
    try {
        let docRef = firestore.collection("accounts").doc("djoacbmageb80q8fAhX3");
        const docs = await docRef.get();
        const data = docs.data();
        data['characterSheets'] = [];
        const collection = await docRef.collection("character_sheets").get();
        collection.forEach((doc) => {
            data['characterSheets'].push({id: doc.id, name: doc.get('name')});
        });

        res.send(`Hello ${name}!<br/>This is the Legend Mama backend. Here is some fake account data pulled from Firestore:<br/>${JSON.stringify(data)}`);
    } catch (e) {
        res.send(`Hello ${name}!<br/>This is the Legend Mama backend. Here is some fake account data pulled from Firestore:<br/>${e}`);
    }
});

export default router;