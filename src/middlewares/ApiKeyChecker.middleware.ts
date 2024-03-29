import { NextFunction, Request, Response } from "express";
import { ApiKeyPermissions } from "../constants/ApiKey.constant";
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../constants/Error.constants";
import { ApiKeyService } from "../services/ApiKey.service";

export class ApiKeyChecker {
    private static MISSING_API_KEY = "Missing api key!";
    private static INVALID_API_KEY = "Invalid api key!";
    private static PERMISSION_DENIED_API_KEY = "Permission denied!";

    public static VerifyApiKey = async (req: Request, res: Response, next: NextFunction) => {
        const key = req.headers["x-api-key"]?.toString();
        if (!key) {
            next(new UnauthorizedError(this.MISSING_API_KEY));
        }
        const apiKeyService = new ApiKeyService();
        const matchedApiKey = await apiKeyService.FindApiKeyByKey(key as string);
        if (!matchedApiKey || !matchedApiKey.isActive) {
            next(new BadRequestError(this.INVALID_API_KEY));
        }
        req.body.ApiKey = matchedApiKey;
        next();
    }

    public static CheckPermissions = (permissions: ApiKeyPermissions[]) => (req: Request, res: Response, next: NextFunction) => {
        return permissions.every(permission => req.body.ApiKey?.permissions?.includes(permission)) ? next() : next(new ForbiddenError(this.PERMISSION_DENIED_API_KEY));
    }
}