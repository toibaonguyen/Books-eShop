
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { SingletonDatabase } from './database/DatabaseCollection';
import { DatabaseConfig } from "./configs/database.config";
import router from "./routes";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT, DatabaseTypes } from "./constants/Database.constant";
import { RequestErrorHandler } from "./middlewares/ErrorHadler.middleware";

const app = express();
const databaseConfig = new DatabaseConfig(DATABASE_HOST, DATABASE_PORT, DATABASE_NAME);

//init middleware
app.use(morgan("dev")); //use this for tracing the request
app.use(helmet()); // use this for base security
app.use(compression()); //use this to compress the data when response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init DB
const database = SingletonDatabase.GetInstance(DatabaseTypes.MONGODB, databaseConfig);
database.Connect();

//init router
app.use(router);
//error handler
app.use(RequestErrorHandler.Handle);

export default app;