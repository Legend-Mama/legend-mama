export class UnauthorizedError extends Error {
    constructor(message = 'Invalid or missing token') {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401; // Example status code
    }
}

export class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404; // Example status code
    }
}

export class ForbiddenError extends Error {
    constructor(message = "Missing permissions for this account") {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 404; // Example status code
    }
}

export default function errorHandler(err, req, res, next) {
    console.error(err);  // Log the error for debugging

    if (err instanceof UnauthorizedError) {
        res.status(err.statusCode).json({error: err.name, message: err.message});
    } else if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({error: err.name, message: err.message});
    } else if (err instanceof ForbiddenError) {
        res.status(err.statusCode).json({error: err.name, message: err.message});
    } else {
        // Other errors
        res.status(500).send('Oops - Something went wrong!');
    }
}