import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, connectAuthEmulator, deleteUser} from "firebase/auth";

// // Initialize Firebase
const app = initializeApp({projectId: "legend-mama", apiKey: "apikey"});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");


class ClientLogin {
    user1 = {
        email: 'user1@example.com',
        password: 'password',
        token: undefined
    };
    user2 = {
        email: 'user2@example.com',
        password: 'password',
        token: undefined
    };
    user3 = {
        email: 'user3@example.com',
        password: 'password',
        token: undefined
    };

    constructor() {}

    async createUser (user, del=false)  {
        const credential = await createUserWithEmailAndPassword(auth, this[user].email, this[user].password)
        this[user].token = await credential.user.getIdToken(/* forceRefresh */ true);

        if (del) {
            await deleteUser(credential.user);
        }
    }

    getToken(user) {
        return this[user].token;
    }
}

export const client = new ClientLogin();