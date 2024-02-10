
import mongoose, { Types } from "mongoose";
import { AuthTokenPairConfig } from "../configs/system.config";
import AuthTokenStoreKeysModel from "../models/AuthTokenStore.keys.model";
import { TokenUtil } from "../utils/Token.util";
import crypto from "node:crypto";
import { BadRequestError } from "../constants/Error.constants";
import { JwtHeader, JwtPayload } from "jsonwebtoken";
type Props = {
    payload: string | object | Buffer,
    uid: mongoose.Types.ObjectId
}


export class AuthTokenStoreService {
    protected AUTH_TOKEN_STORE_NOT_FOUND = "Invalid token";
    protected AUTH_TOKEN_STORE_UPDATE_FAIL = "Fail when update token pair";
    public async UpdateNewTokenPair(authTokenStoreId: string) {
        try {
            const authTokenStore = await AuthTokenStoreKeysModel.findById(authTokenStoreId);
            if (!authTokenStore) {
                throw new BadRequestError(this.AUTH_TOKEN_STORE_NOT_FOUND)
            }
            const payload = TokenUtil.VerifyToken(authTokenStore?.refreshToken as string, authTokenStore?.publicKey as string);
            console.log("PADYLOAD::", payload);
            const tokenPair = TokenUtil.CreateTokenPair({ email: (payload as JwtPayload).email, userId: (payload as JwtPayload).userId }, authTokenStore?.privateKey as string, { algorithm: "RS256", refreshTokenExpiresTime: "1h", accessTokenExpiresTime: "15m" });
            const newAuthTokenStore = await AuthTokenStoreKeysModel.findByIdAndUpdate(authTokenStoreId, { "$push": { "usedRefreshTokens": authTokenStore?.refreshToken }, "refreshToken": tokenPair.refreshToken });
            if (!newAuthTokenStore) {
                throw new Error(this.AUTH_TOKEN_STORE_UPDATE_FAIL);
            }
            return tokenPair;
        }
        catch (e) {
            throw e;
        }
    }
    public async CreateTokenPairAndAuthTokenStore({
        payload,
        uid }: Props) {
        try {
            const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem'
                }
            });
            /**
             * Create new auth token keys if there is not exist and update when it exist
             */
            const tokens = TokenUtil.CreateTokenPair(payload, privateKey, { algorithm: "RS256", refreshTokenExpiresTime: "1h", accessTokenExpiresTime: "15m" });
            await AuthTokenStoreKeysModel.findOneAndUpdate({ user: uid }, { publicKey: publicKey, refreshToken: tokens.refreshToken, usedRefreshTokens: [], privateKey: privateKey }, { upsert: true, new: true });
            return tokens;
        }
        catch (e) {
            throw e;
        }
    };
    public async FindAuthTokenStoresByUserId(userId: string) {
        try {
            return await AuthTokenStoreKeysModel.findOne({ user: new Types.ObjectId(userId) }).lean();
        }
        catch (e) {
            throw e;
        }
    };
    public async RemoveAuthTokenStoreById(id: string) {
        try {
            return await AuthTokenStoreKeysModel.findByIdAndDelete(id).lean();
        }
        catch (e) {
            throw e;
        }
    };
    public async FindAuthTokenStoresById(authTokenStoreId: string) {
        try {
            return await AuthTokenStoreKeysModel.findById(authTokenStoreId).lean();
        }
        catch (e) {
            throw e;
        }
    };
} 