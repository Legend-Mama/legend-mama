/*
Controller for character sheet creation/editing
- Implements 5e constraints/checks
 */
import asyncHandler from "express-async-handler";
import {CharacterSheet} from "../models/characterSheet.model.js";
import {CharacterDetails} from "../models/characterDetails.model.js";

// Temporary
import {character1} from '../tests/data/characterSheetTestData.js';

/**
 * Creates a valid 5e character sheet. Request body is a CharacterDetails object. Checks and calculations based on 5e
 * rules are made.
 */
export const createCharacterSheet = asyncHandler(async (req, res) => {
    // TODO: Pass CharacterDetailsModel to GPT library to get GeneratedCharacter object
    const characterDetails = new CharacterDetails(req.body);
    const generatedCharacter = character1.generatedChar;

    // Pass to helpers to check and derive fields
    const charSheet = new CharacterSheet(generatedCharacter);

    console.log("Successfully created character sheet");
    res.status(201).json(charSheet);
})

/**
 * Request for updated character sheet that complies with 5e rules. Request body is a GeneratedCharacter object, which
 * is a subset of a full CharacterSheet. Incoming object is checked and remaining fields are recalculated and returned.
 */
export const editCharacterSheet = asyncHandler(async (req, res) => {
    // Pass to helpers to check and derive fields
    const charSheet = new CharacterSheet(req.body);

    console.log("Successfully updated character sheet");
    res.status(200).send(charSheet);
})
