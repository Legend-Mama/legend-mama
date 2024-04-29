/*
Routes for interacting with account resources
 */
import express from 'express';
import * as controller from '../controllers/accountController';
const router = express.Router();

// Create an account
router.post("/", controller.createAccount);

// Delete an account
router.delete("/", controller.deleteAccount);

// Get account balance
router.get("/gold-balance", controller.getGoldBalance);

// Save character sheet to account
router.post("/character-sheets", controller.saveCharacterSheet);

// List account character sheets
router.get("/character-sheets", controller.getCharacterSheet);

// Get an account character sheet
router.get("character-sheets/:character_sheet_id", controller.getCharacterSheet);

// Update an account character sheet
router.put("/character-sheets/:character_sheet_id", controller.updateCharacterSheet);

// Delete an account character sheet
router.delete("/character-sheets/:character_sheet_id", controller.deleteCharacterSheet);

export default router;