import { ReasonPhrases, StatusCodes } from "http-status-codes"

export abstract class ResponseError extends Error {
    public statusCode: StatusCodes
    public constructor(message: string, statusCode: StatusCodes) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class UnauthorizedError extends ResponseError {
    public constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

export class BadRequestError extends ResponseError {
    public constructor(message: string = ReasonPhrases.BAD_REQUEST) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

export class ForbiddenError extends ResponseError {
    public constructor(message: string = ReasonPhrases.FORBIDDEN) {
        super(message, StatusCodes.FORBIDDEN);
    }
}