import { NextFunction, Request, Response } from "express";
import { CustomerAccessService } from "../services/Access.service";
import { DataUtil } from "../utils/Data.util";

export class CustomerAccessController {

    public static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const customerAccessService = new CustomerAccessService();
            const response = customerAccessService.register(DataUtil.GetSpecificDataFromObject({ fields: ['name', 'password', 'email', 'phone', 'addresses',], object: req.body }))
        }
        catch (e) {
            next(e);
        }
    }
}