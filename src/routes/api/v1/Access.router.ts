import express from 'express';
import { CustomerAccessController, DeliveryPersonAccessController } from '../../../controllers/AccessController';

const router = express.Router();
//We need some validation and api check from here
router.post("/customer/register", CustomerAccessController.register);
router.post("/customer/login", CustomerAccessController.login);
// router.use("/customer/logout", CustomerAccessController.logout);

router.post("/delivery-person/register", DeliveryPersonAccessController.register);
router.post("/delivery-person/login", DeliveryPersonAccessController.login);
// router.post("/delivery-person/logout");

// router.post("/admin/register");
// router.post("/admin/login");
// router.post("/admin/logout");

export default router;