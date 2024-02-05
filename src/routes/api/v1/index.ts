import express from 'express';
import AccessRouter from './Access.router';
import { ApiKeyChecker } from '../../../middlewares/ApiKeyChecker.middleware';
import { ApiKeyPermissions } from '../../../constants/ApiKey.constant';

const router = express.Router();
//Validate apikey
// router.use("/v1", ApiKeyChecker.VerifyApiKey, ApiKeyChecker.CheckPermissions([ApiKeyPermissions.V1]));

router.use("/v1", AccessRouter);


export default router;