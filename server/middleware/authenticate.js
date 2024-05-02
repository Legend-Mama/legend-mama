//https://cloud.google.com/run/docs/tutorials/identity-platform#server
import {firebaseAuth} from '../firebase.js';
import {ForbiddenError, UnauthorizedError} from "./errorHandlers.js";
import asyncHandler from "express-async-handler";

// Extract and verify Id Token from header
const authenticateJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (process.env.NODE_ENV !== 'production') {
            console.log(">> Testing Auth Middleware - Bypass token verification");
            if (token === 'some-firebase-id-token') {
                req.uid = 'some-firebase-uid';
            } else {
                req.uid = token;
            }
            next();
        } else {
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
                    console.log("Authentication failed with error: ", err);
                    throw new ForbiddenError();
                });
        }
    } else {
        throw new UnauthorizedError();
    }
})

export {authenticateJWT as default};