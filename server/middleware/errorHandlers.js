/**
 * Used for request bodies that failed validation.
 */
export class BadRequestError extends Error {
    constructor(errors, message = "Invalid request") {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
        this.errors = errors;
    }
}

/**
 * Used for insufficient gold balance errors
 */
export class UnprocessableError extends Error {
    constructor(message = "Request understood but failed") {
        super(message);
        this.name = "UnprocessableError";
        this.statusCode = 422;
    }
}

/**
 * Used for missing or invalid tokens
 */
export class UnauthorizedError extends Error {
    constructor(message = 'Invalid or missing token') {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

/**
 * Used when unable to find a resource
 */
export class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

/**
 * Used when trying to access unauthorized resources
 */
export class ForbiddenError extends Error {
    constructor(message = "Missing permissions for this account") {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

/**
 * Entry point for all error handling
 */
export default function errorHandler(err, req, res) {
    // Log the error for debugging
    console.log(`${err.statusCode} ${err.name}: ${err.message}`);
    if (err.statusCode && err.message && err.name) {
        if (err.errors) {
            res.status(err.statusCode).json({error: err.name, message: err.message, errors: err.errors});
        } else {
            res.status(err.statusCode).json({error: err.name, message: err.message});
        }
    } else {
        // Other errors
        res.status(500).send('Oops - Something went wrong!');
    }
}
