import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

admin.initializeApp();
export const firestore = admin.firestore();
export const firebaseAuth = admin.auth();
