import {firebaseAuth} from '../firebase.js';
import {ForbiddenError, UnauthorizedError} from "./errorHandlers.js";
import asyncHandler from "express-async-handler";

/**
 * Manual JWT token decoding
 * @param token - valid JWT token
 * @returns {string} - decoded JWT payload
 */
function devDecodeToken(token) {
    const arrayToken = token.split('.');
    return JSON.parse(atob(arrayToken[1]));
}

/**
 * Authenticate a JWT token with the Firebase platform.
 * https://cloud.google.com/run/docs/tutorials/identity-platform#server
 */
const authenticateJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (process.env.NODE_ENV !== 'production') {
            try {
                console.log(">> Testing/Development - Manual token verification!");
                const data = devDecodeToken(token);
                req.uid = data.user_id;

            } catch (err) {
                console.log("Authentication failed with error: ", err);
                throw new ForbiddenError();
            }

        } else {
            // If the provided ID token has the correct format, is not expired, and is
            // properly signed, the method returns the decoded ID token
            try {
                const decodedToken = await firebaseAuth.verifyIdToken(token);
                req.uid = decodedToken.uid;
                console.log("Authentication got UID from token: ", req.uid);
                // next();
            } catch (err) {
                console.log("Authentication failed with error: ", err);
                throw new ForbiddenError();
            }
        }
        next();

    } else {
        throw new UnauthorizedError();
    }
})

export {authenticateJWT as default};