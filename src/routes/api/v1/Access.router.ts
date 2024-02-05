import express from 'express';
import { CustomerAccessController } from '../../../controllers/AccessController';

const router = express.Router();

router.post("/customer/register", CustomerAccessController.register);
// router.post("/customer/login", CustomerAccessController.login);
// router.use("/customer/logout", CustomerAccessController.logout);

// router.post("/deliveryperson/login");
// router.post("/deliveryperson/logout");

// router.post("/admin/login");
// router.post("/admin/logout");

export default router;