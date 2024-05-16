/*
Routes for interacting with character sheet creation/editing
 */
import express from 'express';
import * as controller from '../controllers/characterSheet.controller.js';
const router = express.Router();

// Create a character sheet
router.post("/", controller.createCharacterSheet);

// Check edits to a character sheet are
router.put("/", controller.editCharacterSheet);

export default router;