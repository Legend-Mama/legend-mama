/*
Routes for interacting with character sheet creation/editing
 */
import express from 'express';
import * as controller from '../controllers/characterSheet.controller.js';
import {characterDetailsValidationRules, generatedCharacterValidationRules, validate} from "../middleware/dataValidator.js";

const router = express.Router();

// Create a character sheet
router.post("/", characterDetailsValidationRules(), validate, controller.createCharacterSheet);

// Check edits to a character sheet are
router.put("/", generatedCharacterValidationRules(), validate, controller.editCharacterSheet);

export default router;