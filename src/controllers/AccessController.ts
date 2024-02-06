import { NextFunction, Request, Response } from "express";
import { CustomerAccessService } from "../services/Access.service";
import { CustomerDTO, CustomerType } from "../constants/Customer.constant";
import { StatusCodes } from "http-status-codes";

export class CustomerAccessController {
    public static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const accessService = new CustomerAccessService();
            const newCustomer = new CustomerDTO(
                req.body.name,
                req.body.email,
                req.body.phone,
                req.body.addresses || [],
                req.body.password,
                CustomerType.COMMON,
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
            }

            const response = await accessService.login(account)
            return res.status(StatusCodes.OK).json(
                {
                    metadata: response
                }
            )
        }
        catch (e) {
            next(e);
        }
    }
}