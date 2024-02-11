import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../constants/Error.constants";
import { AuthTokenStoreService } from "../services/AuthTokenStore.service";
import { TokenUtil } from "../utils/Token.util";
import { JwtPayload } from "jsonwebtoken";
import { CustomerService } from "../services/Customer.service";

export class AuthManager {
    private static MISSING_USERID = "Missing userId!";
    private static NOT_FOUND_AUTH_TOKEN = "This user is not login yet!";
    private static MISSING_ACCESS_TOKEN = "Missing token!";
    private static INVALID_ACCESS_TOKEN = "Invalid token!";
    public static CustomerAuthorization = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers["x-client-id"]?.toString();
            const accessToken = req.headers["authorization"]?.toString();
            if (!accessToken) {
                throw (new UnauthorizedError(this.MISSING_ACCESS_TOKEN));
            }
            const matchedAuthTokenStore = req.body.authTokenStore;
            if (!matchedAuthTokenStore) {
                throw (new UnauthorizedError(this.NOT_FOUND_AUTH_TOKEN));
            }
            const decoded = TokenUtil.VerifyToken(accessToken as string, matchedAuthTokenStore?.publicKey as string);
            const customerService = new CustomerService();
            const customer = await customerService.FindCustomerById(userId as string);
            if (userId != (decoded as JwtPayload).userId || !customer) {
                throw (new BadRequestError(this.INVALID_ACCESS_TOKEN));
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    public static GetMatchedAuthTokenStoreAndAddToBody = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const userId = req.headers["x-client-id"]?.toString();
            if (!userId) {
                throw (new UnauthorizedError(this.MISSING_USERID));
            }
            const authService = new AuthTokenStoreService();
            const matchedAuthTokenStore = await authService.FindAuthTokenStoresByUserId(userId as string);
            if (!matchedAuthTokenStore) {
                throw (new UnauthorizedError(this.NOT_FOUND_AUTH_TOKEN));
            }
            req.body.authTokenStore = matchedAuthTokenStore;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}