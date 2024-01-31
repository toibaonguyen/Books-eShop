import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

const app = express();

//init middleware
app.use(morgan("dev")) //use this for tracing the request
app.use(helmet()) // use this for base security
app.use(compression()) //use this to compress the data when response

//init DB

//init router

//handle error


export default app;