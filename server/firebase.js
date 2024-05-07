import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

admin.initializeApp();
const firestore = admin.firestore();
const firebaseAuth = admin.auth();

export {firestore, firebaseAuth};