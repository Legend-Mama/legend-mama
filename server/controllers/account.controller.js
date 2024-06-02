/*
Controller for account related operations
 */
import asyncHandler from "express-async-handler";
import {firestore} from "../firebase.js";
import {NotFoundError, ForbiddenError} from "../middleware/errorHandlers.js";
import {downloadImage, uploadFromMemory} from "../helpers/cloudStoreOperations.js";

/**
 * Create a new user account which stores their gold balance and saved character sheets.
 */
export const createAccount = asyncHandler(async (req, res) => {
    const docRef = firestore.doc(`accounts/${req.uid}`);
    const doc = await docRef.get();

    if (!doc.exists) {
        await docRef.set({
            goldBalance: 3
        });

        const successMsg = "Account created successfully";
        console.log(successMsg);
        res.status(201).send(successMsg);
    } else {
        throw new ForbiddenError("Account already exists");
    }
})

/**
 * Delete a user's account.
 */
export const deleteAccount = asyncHandler(async (req, res) => {
    const docRef = firestore.doc(`accounts/${req.uid}`);
    await docRef.delete({exists: true});

    const successMsg = "Account deleted successfully";
    console.log(successMsg);
    res.status(200).send(successMsg);
})

/**
 * Get the gold balance for a user.
 */
export const getGoldBalance = asyncHandler(async (req, res) => {
    const docRef = firestore.doc(`accounts/${req.uid}`);
    const doc = await docRef.get();
    const goldBalance = doc.get("goldBalance");
    console.log(`Account gold balance: ${goldBalance}`);
    res.status(200).json({'goldBalance': goldBalance});
})

/**
 * Save a character sheet to a user's account. Character sheet is assumed to have been created with the Character Sheet
 * Editor so no checks are performed against it. Request body should match the CharacterSheet object. Invalid fields are
 * ignored.
 */
export const saveCharacterSheet = asyncHandler(async (req, res) => {
    if ((req.body.charImage !== '') && (req.body.charImage !== undefined)) {
        const buffer = await downloadImage(req.body.charImage);
        req.body.charImage = await uploadFromMemory(buffer).catch(console.error);
    }

    const docRef = firestore.collection(`accounts/${req.uid}/characterSheets`).doc();
    await docRef.create(req.body);

    console.log(`Character sheet successfully saved: ${docRef.id}`);
    res.status(201).json({sheetID: docRef.id});
})

/**
 * List user's saved character sheets. Returns an array of objects with sheet ID and sheet's character name.
 */
export const listCharacterSheets = asyncHandler(async (req, res) => {
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
})

/**
 * Get a saved character sheet.
 */
export const getCharacterSheet = asyncHandler(async (req, res) => {
    const character_sheet_id = req.params["character_sheet_id"];
    const docRef = firestore.doc(`accounts/${req.uid}/characterSheets/${character_sheet_id}`);
    const doc = await docRef.get();

    if (doc.exists) {
        console.log(`Saved character sheet: ${doc.data()}`);
        res.status(200).json(doc.data());
    } else {
        throw new NotFoundError("Character sheet doesn't exist");
    }
})

/**
 * Update a character sheet to a user's account. Character sheet is assumed to have been created with the Character Sheet
 * Editor so no checks are performed against it. Request body can have any fields listed in CharacterSheets. Invalid
 * fields are ignored.
 */
export const updateCharacterSheet = asyncHandler(async (req, res) => {
    if ((req.body.charImage !== '') && (req.body.charImage !== undefined) && (req.body.charImage.length !== 36)) {
        const buffer = await downloadImage(req.body.charImage);
        req.body.charImage = await uploadFromMemory(buffer).catch(console.error);
    }

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
})

/**
 * Delete a character sheet in a user's account.
 */
export const deleteCharacterSheet = asyncHandler(async (req, res) => {
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
})
