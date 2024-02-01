import mongoose from "mongoose";
import process from "process";
import { SystemHealthCheckerConfig } from "../configs/system.config";


export class SystemHealthChecker {
    private config: SystemHealthCheckerConfig;
    private intervalCheckAllID: NodeJS.Timeout | undefined;
    public constructor(config: SystemHealthCheckerConfig) {
        this.config = config;
    }
    public IntervalCheckAll() {
        this.intervalCheckAllID = setInterval(this.CheckAll, this.config.checkIntervalTime);
    }
    public ClearIntervalCheckAll() {
        clearInterval(this.intervalCheckAllID);
    }
    public CheckAll() {
        console.log("===============================");
        this.CheckMemoryUsage();
        this.CheckNumberOfDatabaseConnections();
        console.log("===============================");
    }
    public CheckMemoryUsage() {
        const memoryUsage = process.memoryUsage();
        for (let key in memoryUsage) {
            console.log(`Memory ${key}: ${Math.round(memoryUsage[key as keyof typeof memoryUsage] / 1024 / 1024 * 100) / 100} MB`);
        }
    }
    public CheckNumberOfDatabaseConnections() {
        console.log("Active connection to MongoDB:", mongoose.connections.length);
    }

}
