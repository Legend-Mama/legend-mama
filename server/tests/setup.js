import {initializeTestEnvironment} from '@firebase/rules-unit-testing';
import dotenv from 'dotenv';
import {client} from "./dummyClient.js";
dotenv.config({path: '../.env'});
process.env.NODE_ENV = 'test';

before(async () => {
    console.log('>> Setting up test environment');
    global.testEnv = await initializeTestEnvironment({
        projectId: 'legend-mama',
        firestore: {},
        auth: {uid: 'some-fake-user'}
    });
    console.log(global.testEnv);
    await global.testEnv.clearFirestore();
    await global.testEnv.clearStorage();
    await fetch('http://localhost:9099/emulator/v1/projects/legend-mama/accounts',
        {method: 'DELETE'});

    console.log('>> Creating dummy users');
    await client.createUser('user1');
    await client.createUser('user2', true);
    await client.createUser('user3');

    console.log('>> Set up finished');
});

after(async () => {
    console.log('>> Clearing Firestore and Auth emulators')
    await global.testEnv.clearFirestore();
    await global.testEnv.clearStorage();
    await fetch('http://localhost:9099/emulator/v1/projects/legend-mama/accounts',
        {method: 'DELETE'});

    await global.testEnv.cleanup();
    client.reset();
    console.log('>> Tear down finished');
});