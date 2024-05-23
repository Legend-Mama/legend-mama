import {firestore, firebaseAuth} from "../firebase.js";
import {NotFoundError, UnprocessableError} from "./errorHandlers.js";
import asyncHandler from "express-async-handler";
import {newDaySinceDate} from "../helpers/utilities.js"

const costs = {
    'POST /api/v1/character-sheet': 1,
    'POST /api/v1/character-illustration': 1
}

const updateGoldBalance = asyncHandler(async (req, res, next) => {
    // Check account exists
    const docRef = firestore.doc(`accounts/${req.uid}`);
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new NotFoundError("Account doesn't exist");
    }

    // Check if gold balance should be reset
    const user = await firebaseAuth.getUser(req.uid);
    if (newDaySinceDate(user.metadata.lastRefreshTime)) {
        await docRef.set({
            goldBalance: 3
        });
    }

    // If current request costs gold, remove from balance
    const reqStr = `${req.method} ${req.baseUrl}`;
    if (reqStr in costs) {
        let goldBalance = doc.get("goldBalance");
        const cost = costs[reqStr];
        goldBalance -= cost;

        if (goldBalance < 0) {
            throw new UnprocessableError('Insufficient gold balance!');
        }

        await docRef.set({
            goldBalance: goldBalance
        });
    }
    next();
})

export {updateGoldBalance as default};