import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../constants/Error.constants";
import { AuthTokenService } from "../services/AuthToken.service";
import { TokenUtil } from "../utils/Token.util";
import { JwtPayload } from "jsonwebtoken";
import { CustomerService } from "../services/Customer.service";

export class AuthManager {
    private static MISSING_USERID = "Missing userId!";
    private static NOT_FOUND_TOKEN = "Token is not found!";
    private static MISSING_ACCESS_TOKEN = "Missing access token!";
    private static INVALID_ACCESS_TOKEN = "Invalid access token!";
    public static CustomerAuthorization = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers["x-client-id"]?.toString();
            const accessToken = req.headers["authorization"]?.toString();
            if (!userId) {
                throw (new UnauthorizedError(this.MISSING_USERID));
            }
            if (!accessToken) {
                throw (new UnauthorizedError(this.MISSING_ACCESS_TOKEN));
            }
            const authService = new AuthTokenService();
            const matchedAuthToken = await authService.FindAuthTokensByUserId(userId as string);

            if (!matchedAuthToken) {
                throw (new UnauthorizedError(this.NOT_FOUND_TOKEN));
            }
            const decoded = TokenUtil.VerifyToken(accessToken as string, matchedAuthToken?.publicKey as string);
            const customerService = new CustomerService();
            const customer = await customerService.FindCustomerById(userId);
            console.log("Customer::", customer);
            console.log("Decoded::", decoded);
            if (userId != (decoded as JwtPayload).userId || !customer) {
                throw (new BadRequestError(this.INVALID_ACCESS_TOKEN));
            }
            req.body.authToken = matchedAuthToken;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}