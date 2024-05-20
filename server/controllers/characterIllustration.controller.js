/*
Controller for generating a character illustration
 */
import asyncHandler from "express-async-handler";
import {generateCharacterIllustration} from "../helpers/generateCharacterIllustration.js";

export const getCharacterIllustration = asyncHandler(async (req, res) => {
    const imageURL = await generateCharacterIllustration(req.body.race, req.body.class, req.body.backstory);
    res.status(201).json(imageURL);
})