import jwt from "jsonwebtoken";
import { AuthTokenPairConfig } from "../configs/system.config";

export class TokenUtil {
    static CreateTokenPair(payload: string | object | Buffer, privateKey: string, tokenPairConfig?: AuthTokenPairConfig) {
        try {
            const refreshTokenExpiresTime = tokenPairConfig?.refreshTokenExpiresTime;
            const accessTokenExpiresTime = tokenPairConfig?.accessTokenExpiresTime;
            console.log("Algo:", tokenPairConfig?.algorithm)
            const accessToken = jwt.sign(payload, privateKey, { expiresIn: accessTokenExpiresTime, algorithm: tokenPairConfig?.algorithm });
            const refreshToken = jwt.sign(payload, privateKey, { expiresIn: refreshTokenExpiresTime, algorithm: tokenPairConfig?.algorithm });
            return { accessToken, refreshToken }
        }
        catch (e) {
            throw (e);
        }
    }
    static VerifyToken(token: string, publicKey: string) {
        try {
            const decoded = jwt.verify(token, publicKey);
            return decoded;
        }
        catch (e) {
            throw e;
        }
    }

}

