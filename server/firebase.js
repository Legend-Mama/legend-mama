import firebase from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

firebase.initializeApp();
export const firestore = firebase.firestore();
export const firebaseAuth = firebase.auth();


// let docRef = db.collection("accounts").doc("AgTsXlJKPVkHEFxNtZ7M");
//
// docRef.get().then((doc) => {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });