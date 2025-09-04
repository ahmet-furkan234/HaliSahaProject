export class AppError extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundException extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}
export class ConflictException extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}

export class AuthorizationException extends AppError {
    constructor(message: string) {
        super(message,401)  ;
    }
}