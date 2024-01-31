import { Module } from "module";
import mongoose from "mongoose";


enum DatabaseName{
    MONGODB,
    POSTGRE
}

//I apply factory method below;
interface IDatabase{
    Connect():Promise<void>;
    Disconnect():Promise<void>;
}

class MongoDB implements IDatabase{
    public async Connect(): Promise<void> {
        
    }
    public async Disconnect(): Promise<void> {
        
    }
}

class PostgreDB implements IDatabase{
    public async Connect(): Promise<void> {
        
    }
    public async Disconnect(): Promise<void> {
        
    }
}

class DatabaseCreator
{
    public constructor()
    {
        //initial all connection string
    }
    public CreateDatabase(databaseName:DatabaseName):IDatabase{
        switch (databaseName)
        {
            case DatabaseName.MONGODB:
                return new MongoDB();
            case DatabaseName.POSTGRE:
                return new PostgreDB();
        }
    }
}

//From here, i apply both sigleton and strategy pattern in class Database here :D
class SingletonDatabase implements IDatabase
{
    private static instance:SingletonDatabase;
    private core :IDatabase
    private constructor(database:IDatabase){
        this.core=database;
    }
    public static GetInstance(databaseName:DatabaseName):SingletonDatabase{
        if(!SingletonDatabase.instance){
            const databaseCreator=new DatabaseCreator();
            const concreteDatabase= databaseCreator.CreateDatabase(databaseName);
            SingletonDatabase.instance=new SingletonDatabase(concreteDatabase);
            return SingletonDatabase.instance;
        }

        return SingletonDatabase.instance
    }
    public async Connect():Promise<void>{
        await this.core.Connect();
    }
    public async Disconnect():Promise<void>{
        await this.core.Disconnect();
    }
}

module.exports = {SingletonDatabase}