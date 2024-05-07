import {initializeTestEnvironment} from '@firebase/rules-unit-testing';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

before(async () => {
    console.log('>> Setting up test environment')
    global.testEnv = await initializeTestEnvironment({
        projectId: 'legend-mama',
        firestore: {}
    });
    console.log(global.testEnv);
    console.log('>> Clearing Firestore emulator')
    await global.testEnv.clearFirestore();
});

after(async () => {
    await global.testEnv.cleanup();
});