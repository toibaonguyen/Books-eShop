import { NextFunction, Request, Response } from "express";
import { CustomerAccessService, DeliveryPersonAccessService } from "../services/Access.service";
import { CustomerDTO, DeliveryPersonDTO } from "../constants/User.constant";
import { StatusCodes } from "http-status-codes";


//Customer...
export class CustomerAccessController {
    public static async RefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const accessService = new CustomerAccessService();
            return res.status(StatusCodes.OK).json({
                metadata: await accessService.handleRefreshToken(req.body.authTokenStore._id, req.body.refreshToken)
            });
        }
        catch (e) {
            next(e);
        }
    }

    public static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const accessService = new CustomerAccessService();
            const newCustomer = new CustomerDTO(
                req.body.name,
                req.body.email,
                req.body.phone,
                req.body.addresses || [],
                req.body.password,
                req.body.gender,
                req.body.birthday,
                true)

            const response = await accessService.register(newCustomer)
            return res.status(StatusCodes.CREATED).json(
                {
                    metadata: response
                }
            )
        }
        catch (e) {
            next(e);
        }
    }
    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const accessService = new CustomerAccessService();
            const account =
            {
                email: req.body.email,
                password: req.body.password
            };

            const response = await accessService.login(account);
            return res.status(StatusCodes.OK).json(
                {
                    metadata: response
                }
            );
        }
        catch (e) {
            next(e);
        }
    }
    public static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const accessService = new CustomerAccessService();
            const authTokenStore = req.body.authTokenStore;
            const response = await accessService.logout(authTokenStore._id);
            return res.status(StatusCodes.OK).json(
                {
                    message: response
                }
            );
        }
        catch (e) {
            next(e);
        }
    }
}

//Delivery person...
export class DeliveryPersonAccessController {
    public static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const accessService = new DeliveryPersonAccessService();
            const newDeliveryPersion = new DeliveryPersonDTO(req.body.name, req.body.email, req.body.phone,
                req.body.addresses, req.body.password, req.body.gender, req.body.birthday, req.body.salary, req.body.isActive);

            const response = await accessService.register(newDeliveryPersion);
            return res.status(StatusCodes.CREATED).json(
                {
                    metadata: response
                }
            );
        }
        catch (e) {
            next(e);
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const accessService = new DeliveryPersonAccessService();
            const account =
            {
                email: req.body.email,
                password: req.body.password
            };

            const response = await accessService.login(account);
            return res.status(StatusCodes.OK).json(
                {
                    metadata: response
                }
            );
        }
        catch (e) {
            next(e);
        }
    }

    public static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const accessService = new DeliveryPersonAccessService();
            const authTokenStore = req.body.authTokenStore;
            const response = await accessService.logout(authTokenStore._id);
            return res.status(StatusCodes.OK).json(
                {
                    message: response
                }
            );
        }
        catch (e) {
            next(e);
        }
    }
}