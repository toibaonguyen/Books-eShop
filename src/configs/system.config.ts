import { Algorithm } from "jsonwebtoken";

export class SystemHealthCheckerConfig {
    public maxDatabaseConnections: number;
    public checkIntervalTime: number;
    public constructor(maxDatabaseConnections: number, checkIntervalTime: number) {
        this.maxDatabaseConnections = maxDatabaseConnections;
        this.checkIntervalTime = checkIntervalTime;
    }
}

export class AuthTokenPairConfig {
    public accessTokenExpiresTime: number | string | undefined;
    public refreshTokenExpiresTime: number | string | undefined;
    public algorithm: Algorithm | undefined;
    public constructor(accessTokenExpiresTime: number, refreshTokenExpiresTime: number, algorithm: Algorithm | undefined) {
        this.accessTokenExpiresTime = accessTokenExpiresTime;
        this.refreshTokenExpiresTime = refreshTokenExpiresTime;
        this.algorithm = algorithm;
    }
}