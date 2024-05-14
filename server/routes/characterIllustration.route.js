/*
Route for getting character illustration
 */
import express from 'express';
import * as controller from '../controllers/characterIllustration.controller.js';
const router = express.Router();

// Generate a character illustration
router.post("/", controller.getCharacterIllustration);