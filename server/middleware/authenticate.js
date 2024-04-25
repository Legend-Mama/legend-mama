//https://cloud.google.com/run/docs/tutorials/identity-platform#server
import {firebaseAuth} from '../firebase.js';

// Extract and verify Id Token from header
export default async function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // If the provided ID token has the correct format, is not expired, and is
        // properly signed, the method returns the decoded ID token
        firebaseAuth
            .verifyIdToken(token)
            .then(decodedToken => {
                req.uid = decodedToken.uid;
                next();
            })
            .catch(err => {
                req.logger.error(`Error with authentication: ${err}`);
                return res.sendStatus(403);
            });
    } else {
        return res.sendStatus(401);
    }
};