/*
Routes for interacting with character sheet creation/editing
 */
import express from 'express';
import * as controller from '../controllers/characterSheetController.js';
const router = express.Router();

// Create an account
router.post("/", controller.createCharacterSheet);

// Delete an account
router.put("/", controller.editCharacterSheet);

export default router;