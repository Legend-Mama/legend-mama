/*
Routes for interacting with character sheet creation/editing
 */
import express from 'express';
import * as controller from '../controllers/characterSheet.controller.js';
import {characterDetailsValidationRules, generatedCharacterValidationRules, validate} from "../middleware/dataValidator.js";
import goldBalance from "../middleware/goldBalance.js";

const router = express.Router();

// Create a character sheet
router.post("/", characterDetailsValidationRules(), validate, goldBalance, controller.createCharacterSheet);

// Check edits to a character sheet are
router.put("/", generatedCharacterValidationRules(), validate, controller.editCharacterSheet);

export default router;