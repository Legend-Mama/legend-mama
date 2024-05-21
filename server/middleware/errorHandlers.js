export class BadRequestError extends Error {
    constructor(errors, message = "Invalid request") {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
        this.errors = errors;
    }
}

export class UnprocessableError extends Error {
    constructor(message = "Request understood but failed") {
        super(message);
        this.name = "UnprocessableError";
        this.statusCode = 422;
    }
}

export class UnauthorizedError extends Error {
    constructor(message = 'Invalid or missing token') {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

export class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

export class ForbiddenError extends Error {
    constructor(message = "Missing permissions for this account") {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

export default function errorHandler(err, req, res) {
    console.error(`${err.name}: ${err.message}`);  // Log the error for debugging
    if (err.statusCode && err.message && err.name) {
        res.status(err.statusCode).json({error: err.name, message: err.message});
    } else {
        // Other errors
        res.status(500).send('Oops - Something went wrong!');
    }
}
