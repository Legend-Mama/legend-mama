/*
Controller for character sheet creation/editing
- Implements 5e constraints/checks
 */
import asyncHandler from "express-async-handler";
import {CharacterSheet} from "../models/characterSheet.js";

// Temporary
import {character1} from '../tests/data/characterSheetTestData.js';


export const createCharacterSheet = asyncHandler(async (req, res) => {
    // TODO: Pass CharacterDetailsModel to GPT library to get GeneratedCharacter object
    const generatedCharacter = character1.generatedChar;

    // Pass to helpers to check and derive fields
    const charSheet = new CharacterSheet(generatedCharacter);

    console.log("Successfully created character sheet");
    res.status(201).json(charSheet);
})

export const editCharacterSheet = asyncHandler(async (req, res) => {
    // Pass to helpers to check and derive fields
    const charSheet = new CharacterSheet(req.body);

    console.log("Successfully updated character sheet");
    res.status(200).send(charSheet);
})
