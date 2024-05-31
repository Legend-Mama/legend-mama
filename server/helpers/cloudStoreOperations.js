import {NotFoundError} from "../middleware/errorHandlers.js";
import {firebaseStorage} from "../firebase.js";
import {v4 as uuidv4} from 'uuid';

/**
 * Buffer an image from URL.
 * https://stackoverflow.com/questions/18264346/how-to-load-an-image-from-url-into-buffer-in-nodejs
 * @param url - image URL
 */
export async function downloadImage(url) {
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
export async function generateV4ReadSignedUrl(filepath) {
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
export async function uploadFromMemory(buffer) {
    const filename = uuidv4();
    await firebaseStorage
        .bucket()
        .file(`character-illustrations/${filename}.png`)
        .save(buffer);

    console.log(`Uploaded ${filename}.png`);
    return filename;
}