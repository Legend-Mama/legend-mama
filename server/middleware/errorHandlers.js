/**
 * Used for request bodies that failed validation.
 */
export class UnprocessableError extends Error {
    constructor(errors, message = "Error in request body") {
        super(message);
        this.name = "UnprocessableError";
        this.statusCode = 422;
        this.errors = errors;
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
    console.error(`${err.name}: ${err.message}`);  // Log the error for debugging
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
