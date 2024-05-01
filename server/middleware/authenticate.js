//https://cloud.google.com/run/docs/tutorials/identity-platform#server
import {firebaseAuth} from '../firebase.js';
import {ForbiddenError, UnauthorizedError} from "./errorHandlers.js";
import asyncHandler from "express-async-handler";

// Extract and verify Id Token from header
const authenticateJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // If the provided ID token has the correct format, is not expired, and is
        // properly signed, the method returns the decoded ID token
        firebaseAuth
            .verifyIdToken(token)
            .then(decodedToken => {
                req.uid = decodedToken.uid;
                console.log("Authentication got UID from token: ", req.uid);
                next();
            })
            .catch(err => {
                throw new ForbiddenError();
            });
    } else {
        throw new UnauthorizedError();
    }
})

// For development, hard coded token
const devBypass = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        req.uid = authHeader.split(' ')[1];
        next();
    } else {
        throw new UnauthorizedError();
    }
})

export {authenticateJWT as default, devBypass};