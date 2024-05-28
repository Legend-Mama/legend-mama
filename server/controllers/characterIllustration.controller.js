/*
Controller for generating a character illustration
 */
import asyncHandler from "express-async-handler";
import {generateCharacterIllustration} from "../helpers/generateCharacterIllustration.js";
import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import {Readable} from 'stream';
import { fileURLToPath } from 'url';
import https from 'https';
import * as url from "node:url";

const storage = new Storage({
    projectId: 'legend-mama'
});
const bucketName = 'legend-mama-storage';

/**
 * Download image from URL to buffer.
 * https://stackoverflow.com/questions/18264346/how-to-load-an-image-from-url-into-buffer-in-nodejs
 * @param url
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
 * @param filename
 */
async function generateV4ReadSignedUrl(filepath) {
    // Get a v4 signed URL for reading the file
    const [url] = await storage
        .bucket(bucketName)
        .file(filepath)
        .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        });

    console.log('Generated GET signed URL:');
    console.log(url);
    return url;
}

/**
 * Upload image from buffer to Google Cloud Storage
 * https://cloud.google.com/storage/docs/samples/storage-file-upload-from-memory
 * @param buffer
 */
async function uploadFromMemory(buffer) {
    const filename = uuidv4();
    await storage
        .bucket(bucketName)
        .file(`character-illustrations/${filename}.png`)
        .save(buffer);

    console.log(`Uploaded ${filename}.png to ${bucketName}`);
    return filename;
}

/**
 * Generate a new character illustration and return a signed URL.
 */
export const newCharacterIllustration = asyncHandler(async (req, res) => {
    const imageURL = await generateCharacterIllustration(req.body.race, req.body.class, req.body.backstory);
    const buffer = await downloadImage(imageURL);
    const filename = await uploadFromMemory(buffer).catch(console.error);
    const signedURL = await generateV4ReadSignedUrl(`character-illustrations/${filename}.png`);

    res.status(201).json({
        illustrationID: filename,
        signedURL: signedURL
    });
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