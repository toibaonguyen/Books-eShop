import { ErrorRequestHandler, NextFunction, Request, Response, Handler } from "express";
import { ResponseError } from "../constants/Error.constants";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class RequestErrorHandler {
    static Handle: ErrorRequestHandler = (error: ResponseError | undefined | null, req: Request, res: Response, next: NextFunction) => {
        return res.status(error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR
            }
        )
    }
}