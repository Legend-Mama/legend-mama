import {initializeTestEnvironment} from '@firebase/rules-unit-testing';
import dotenv from 'dotenv';
import {client} from "./dummyClient.js";
dotenv.config({path: '../.env'});

before(async () => {
    console.log('>> Setting up test environment');
    global.testEnv = await initializeTestEnvironment({
        projectId: 'legend-mama',
        firestore: {},
        auth: {uid: 'some-fake-user'}
    });
    console.log(global.testEnv);
    console.log('>> Clearing Firestore emulator')
    await global.testEnv.clearFirestore();

    console.log('>> Creating dummy user');
    await fetch('http://localhost:9099/emulator/v1/projects/legend-mama/accounts',
        {method: 'DELETE'});

    await client.createUser('user1');
    await client.createUser('user2', true);
    await client.createUser('user3');
    console.log(`Got token: ${client.getToken('user1')}`);
});

after(async () => {
    await global.testEnv.cleanup();
});