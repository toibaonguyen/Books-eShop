import V1 from './v1';
import express from 'express';

const router = express.Router();
router.use("/api", V1);

export default router;