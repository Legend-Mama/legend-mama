import firebase from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

firebase.initializeApp();
export const firestore = firebase.firestore();
export const firebaseAuth = firebase.auth();
