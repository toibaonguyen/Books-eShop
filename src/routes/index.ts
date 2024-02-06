import express, { NextFunction, Request, Response } from 'express';
import api from "./api";
import { NotFoundError } from '../constants/Error.constants';

const router = express.Router();
router.use(api);

// the rest ...
router.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
})

export default router;