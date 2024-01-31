class SystemHealthCheckerConfig {
    public maxDatabaseConnections: number;
    public checkIntervalTime: number;
    public constructor(maxDatabaseConnections: number, checkIntervalTime: number) {
        this.maxDatabaseConnections = maxDatabaseConnections;
        this.checkIntervalTime = checkIntervalTime;
    }
}

export default SystemHealthCheckerConfig;