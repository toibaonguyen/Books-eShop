/*Requirements of this module:
- Can use for both single database and multiple databases
- Can use for 1 instances only for 1 process
- Can use for distributed databases
*/

import mongoose from "mongoose";
import { DatabaseConfig } from "../configs/database.config";
import { DatabaseTypes } from "../constants/Database.constant";


//I apply factory method below:
interface IDatabase {
    Connect(): Promise<void>;
    Disconnect(): Promise<void>;
}

class MongoDB implements IDatabase {
    private uri: string;
    private connectOptions: mongoose.ConnectOptions | undefined;
    public constructor(uri: string, connectOptions: mongoose.ConnectOptions | undefined) {
        this.uri = uri;
        this.connectOptions = connectOptions;
    }
    public async Connect(): Promise<void> {
        try {
            await mongoose.connect(this.uri, this.connectOptions);
            console.log("Connect to mongoDB successfully!");
        }
        catch (e) {
            console.error(e);
        }
    }
    public async Disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
        }
        catch (e) {
            console.error(e);
        }
    }
}

class PostgreSQL implements IDatabase {
    public constructor() {
        console.log("Please comeback using other DB, because this DB is under the dev! <3");
        process.exit(1);
    }
    public async Connect(): Promise<void> {

    }
    public async Disconnect(): Promise<void> {

    }
}

abstract class DatabaseCreator {
    public readonly config: DatabaseConfig;
    public constructor(config: DatabaseConfig) {
        this.config = config;
    }
    public abstract CreateDatabase(): IDatabase;
}

class MongoDBCreator extends DatabaseCreator {
    public readonly connectOptions: mongoose.ConnectOptions | undefined
    public constructor(config: DatabaseConfig, connectOptions?: mongoose.ConnectOptions | undefined) {
        super(config);
        this.connectOptions = connectOptions;
    }
    public CreateDatabase(): IDatabase {
        const uri = `mongodb://${this.config.host}:${this.config.port}/${this.config.name}`;
        return new MongoDB(uri, this.connectOptions);
    }
}

//From here, i apply both sigleton and strategy pattern in class Database here :D
//But it's also an anti pattern :((
export class SingletonDatabase implements IDatabase {
    private static instance: SingletonDatabase;
    private core: IDatabase
    private constructor(database: IDatabase) {
        this.core = database;
    }
    public static GetInstance(databaseName: DatabaseTypes, databaseConfig: DatabaseConfig): SingletonDatabase {
        if (!SingletonDatabase.instance) {
            let db;
            switch (databaseName) {
                case DatabaseTypes.MONGODB:
                    const mongoDBCreator = new MongoDBCreator(databaseConfig);
                    db = mongoDBCreator.CreateDatabase();
                    break;
                case DatabaseTypes.POSTGRE:
                    console.log("Because i'm just use mongoDB in this, so this will return an instance of mongoDB!");
                    const postgreSQLCreator = new MongoDBCreator(databaseConfig);
                    db = postgreSQLCreator.CreateDatabase();
                    break;
            }
            SingletonDatabase.instance = new SingletonDatabase(db);
            return SingletonDatabase.instance;
        }
        return SingletonDatabase.instance
    }
    public async Connect(): Promise<void> {
        await this.core.Connect();
    }
    public async Disconnect(): Promise<void> {
        await this.core.Disconnect();
    }
}

