
import mongoose, { ObjectId } from "mongoose";
import { AuthTokenPairConfig } from "../configs/system.config";
import AuthTokenKeysModel from "../models/AuthToken.keys.model";
import { TokenUtil } from "../utils/Token.util";
import crypto from "node:crypto";
type Props = {
    payload: string | object | Buffer,
    uid: mongoose.Types.ObjectId
}


export class AuthTokenService {
    public async CreateTokenPair({
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
            const tokens = TokenUtil.CreateTokenPair(payload, privateKey,
                { algorithm: "RS256", refreshTokenExpiresTime: "1h", accessTokenExpiresTime: "15m" });
            await AuthTokenKeysModel.create({ user: uid, publicKey: publicKey })
            return tokens;
        }
        catch (e) {
            throw e;
        }
    }
} 