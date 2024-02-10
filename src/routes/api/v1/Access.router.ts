import express from 'express';
import { CustomerAccessController, DeliveryPersonAccessController } from '../../../controllers/AccessController';
import { AuthManager } from '../../../middlewares/AuthManager.middleware';

const router = express.Router();
//We need some validation and api check from here
router.post("/customer/register", CustomerAccessController.register);
router.post("/customer/login", CustomerAccessController.login);
router.post("/customer/logout", AuthManager.GetMatchedAuthTokenStoreAndAddToBody, AuthManager.CustomerAuthorization, CustomerAccessController.logout);
router.post("/customer/refresh-token", AuthManager.GetMatchedAuthTokenStoreAndAddToBody, CustomerAccessController.RefreshToken);

router.post("/delivery-person/register", DeliveryPersonAccessController.register);
router.post("/delivery-person/login", DeliveryPersonAccessController.login);
// router.post("/delivery-person/logout");

// router.post("/admin/register");
// router.post("/admin/login");
// router.post("/admin/logout");

export default router;