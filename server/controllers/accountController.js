/*
Controller for account related operations
 */
import asyncHandler from "express-async-handler";
import {firestore} from "../firebase.js";
import {NotFoundError} from "../middleware/errorHandlers.js";

export const createAccount = asyncHandler(async (req, res, next) => {
    const docRef = firestore.doc(`accounts/${req.uid}`);
    await docRef.set({
        goldBalance: 3
    });

    const successMsg = "Account created successfully";
    console.log(successMsg);
    res.status(201).send(successMsg);
})

export const deleteAccount = asyncHandler(async (req, res, next) => {
    const docRef = firestore.doc(`accounts/${req.uid}`);
    try {
        await docRef.delete({exists: true});

        const successMsg = "Account deleted successfully";
        console.log(successMsg);
        res.status(200).send(successMsg);
    } catch (err) {
        throw new NotFoundError("Account doesn't exist");
    }
})

export const getGoldBalance = asyncHandler(async (req, res, next) => {
    const docRef = firestore.doc(`accounts/${req.uid}`);
    const doc = await docRef.get();

    if (doc.exists) {
        const goldBalance = doc.get("goldBalance");
        console.log(`Account gold balance: ${goldBalance}`);
        res.status(200).json({'goldBalance': goldBalance});
    } else {
        throw new NotFoundError("Account doesn't exist");
    }
})

export const saveCharacterSheet = asyncHandler(async (req, res, next) => {
    const accountRef = firestore.doc(`accounts/${req.uid}`);
    const account = await accountRef.get();

    if (account.exists) {
        const docRef = firestore.collection(`accounts/${req.uid}/characterSheets`).doc();
        await docRef.create(req.body);

        const successMsg = "Character sheet successfully saved";
        console.log(successMsg);
        res.status(201).send(successMsg);
    } else {
        throw new NotFoundError("Account doesn't exist");
    }
})

export const listCharacterSheets = asyncHandler(async (req, res, next) => {
    const accountRef = firestore.doc(`accounts/${req.uid}`);
    const account = await accountRef.get();

    if (account.exists) {
        const colRef = firestore.collection(`accounts/${req.uid}/characterSheets`);
        const docRefs = await colRef.listDocuments();
        const docs = await firestore.getAll(...docRefs);

        let sheets = [];
        for (let doc of docs) {
            if (doc.exists) {
                sheets.push({
                    id: doc.id,
                    name: doc.get('name')
                });
            } else {
                throw new NotFoundError();
            }
        }

        console.log(`All saved character sheets: ${sheets}`);
        res.status(200).json(sheets);
    } else {
        throw new NotFoundError("Account doesn't exist");
    }
})

export const getCharacterSheet = asyncHandler(async (req, res, next) => {
    const accountRef = firestore.doc(`accounts/${req.uid}`);
    const account = await accountRef.get();

    if (account.exists) {
        const character_sheet_id = req.params["character_sheet_id"];
        const docRef = firestore.doc(`accounts/${req.uid}/characterSheets/${character_sheet_id}`);
        const doc = await docRef.get();

        if (doc.exists) {
            console.log(`Saved character sheet: ${doc.data()}`);
            res.status(200).json(doc.data());
        } else {
            throw new NotFoundError("Character sheet doesn't exist");
        }
    } else {
        throw new NotFoundError("Account doesn't exist");
    }
})

export const updateCharacterSheet = asyncHandler(async (req, res, next) => {
    const accountRef = firestore.doc(`accounts/${req.uid}`);
    const account = await accountRef.get();

    if (account.exists) {
        const character_sheet_id = req.params["character_sheet_id"];
        const docRef = firestore.doc(`accounts/${req.uid}/characterSheets/${character_sheet_id}`);
        const sheet = await docRef.get();
        if (sheet.exists) {
            await docRef.update(req.body);

            const successMsg = "Character sheet successfully updated";
            console.log(successMsg);
            res.status(200).send(successMsg);
        } else {
            throw new NotFoundError("Character sheet doesn't exist");
        }
    } else {
        throw new NotFoundError("Account doesn't exist");
    }
})

export const deleteCharacterSheet = asyncHandler(async (req, res, next) => {
    const accountRef = firestore.doc(`accounts/${req.uid}`);
    const account = await accountRef.get();

    if (account.exists) {
        const character_sheet_id = req.params["character_sheet_id"];
        const docRef = firestore.doc(`accounts/${req.uid}/characterSheets/${character_sheet_id}`);
        try {
            await docRef.delete({exists: true});

            const successMsg = "Character sheet successfully deleted";
            console.log(successMsg);
            res.status(200).send(successMsg);
        } catch (err) {
            throw new NotFoundError("Character sheet doesn't exist");
        }
    } else {
        throw new NotFoundError("Account doesn't exits");
    }
})
