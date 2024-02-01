import "reflect-metadata"
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { DatabaseName, SingletonDatabase } from './database/DatabaseCollection';
import { DatabaseConfig } from "./configs/database.config";
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const env = process.env['NODE_ENV'];
const databaseHost: string = process.env[`${env}_DATABASE_HOST`] as string;
const databasePort: number = process.env[`${env}_DATABASE_PORT`] as unknown as number;
const databaseName: string = process.env[`${env}_DATABASE_NAME`] as string;

const databaseConfig = new DatabaseConfig(databaseHost, databasePort, databaseName);

//init middleware
app.use(morgan("dev")) //use this for tracing the request
app.use(helmet()) // use this for base security
app.use(compression()) //use this to compress the data when response

//init DB
const database = SingletonDatabase.GetInstance(DatabaseName.MONGODB, databaseConfig);
database.Connect();
//init router

//handle error


export default app;