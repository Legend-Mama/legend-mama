import { FirebaseApp, FirebaseError, getApp, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

/** These don't have to be secrets per docs: https://firebase.google.com/docs/projects/api-keys
 * But we'll store them in ENV in case they change
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
} as const;

let app: FirebaseApp;

// Try to ensure that we only initialize the Firebase app once - might need debugging

try {
  app = getApp("legend-mama");
} catch (err: any) {
  if (err.name === "FirebaseError") {
    app = initializeApp(firebaseConfig, "legend-mama");
  } else {
    throw err;
  }
}

const auth = getAuth(app);

// Use emulator on local

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export default auth;