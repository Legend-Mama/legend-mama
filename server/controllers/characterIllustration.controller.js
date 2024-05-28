/*
Controller for generating a character illustration
 */
import asyncHandler from "express-async-handler";
import {NotFoundError} from "../middleware/errorHandlers.js";
import {generateCharacterIllustration} from "../helpers/generateCharacterIllustration.js";
import {firebaseStorage} from "../firebase.js";
import {v4 as uuidv4} from 'uuid';

/**
 * Buffer an image from URL.
 * https://stackoverflow.com/questions/18264346/how-to-load-an-image-from-url-into-buffer-in-nodejs
 * @param url - image URL
 */
async function downloadImage(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
}

/**
 * Generate a V4 read-only signed URL. Link is active for 15 minutes.
 * https://cloud.google.com/storage/docs/samples/storage-generate-signed-url-v4?hl=en
 * @param filepath - path of object in bucket
 */
async function generateV4ReadSignedUrl(filepath) {
    const file = firebaseStorage
        .bucket()
        .file(filepath)

    const [exists] = await file.exists();
    if (exists) {
        // Get a v4 signed URL for reading the file
        const [url] = await file.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        });

        console.log('Generated GET signed URL:');
        console.log(url);
        return url;
    }

    throw new NotFoundError('Character illustration does not exist!');
}

/**
 * Upload object from buffer to Google Cloud Storage
 * https://cloud.google.com/storage/docs/samples/storage-file-upload-from-memory
 * @param buffer - buffered object to upload
 */
async function uploadFromMemory(buffer) {
    const filename = uuidv4();
    await firebaseStorage
        .bucket()
        .file(`character-illustrations/${filename}.png`)
        .save(buffer);

    console.log(`Uploaded ${filename}.png`);
    return filename;
}

/**
 * Generate a new character illustration and return a signed URL.
 */
export const newCharacterIllustration = asyncHandler(async (req, res) => {
    try {
        const imageURL = await generateCharacterIllustration(req.body.race, req.body.class, req.body.backstory);
        const buffer = await downloadImage(imageURL);
        const filename = await uploadFromMemory(buffer).catch(console.error);
        const signedURL = await generateV4ReadSignedUrl(`character-illustrations/${filename}.png`);

        res.status(201).json({
            illustrationID: filename,
            signedURL: signedURL
        });
    } catch (err) {
        if (err.statusCode === 429) {
            console.log('Too many requests to ChatGPT');
        }
        throw err;
    }
})

/**
 * Get an existing character illustration and return a signed URL.
 */
export const getCharacterIllustration = asyncHandler(async (req, res) => {
    const illustrationID = req.params["character_illustration_id"];
    const signedURL = await generateV4ReadSignedUrl(`character-illustrations/${illustrationID}.png`);
    res.status(200).json({
        illustrationID: illustrationID,
        signedURL: signedURL
    });
})