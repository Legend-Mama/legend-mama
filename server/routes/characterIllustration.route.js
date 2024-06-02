/*
Route for getting character illustration
 */
import express from 'express';
import * as controller from '../controllers/characterIllustration.controller.js';
import goldBalance from "../middleware/goldBalance.js";
const router = express.Router();

// Generate a character illustration
router.post("/", goldBalance, controller.newCharacterIllustration);
router.get("/:character_illustration_id", controller.getCharacterIllustration);

export default router;