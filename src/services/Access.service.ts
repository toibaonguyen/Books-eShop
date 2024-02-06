import { CustomerDTO } from "../constants/Customer.constant";
import { BadRequestError, UnauthorizedError } from "../constants/Error.constants";
import bcrypt from "bcrypt";
import CustomerModel from "../models/Customer.users.model";
import { TokenUtil } from "../utils/Token.util";
import crypto from "node:crypto";
import { DataUtil } from "../utils/Data.util";
import { AuthTokenService } from "./AuthToken.service";
import { CustomerService } from "./Customer.service";
import { AccountDTO } from "../constants/Access.constant";

export class CustomerAccessService {
    private INVALID_ACCOUNT = "Invalid email or password!"
    public async register(customer: CustomerDTO) {
        try {
            const customerService = new CustomerService();
            const newCustomer = await customerService.CreateNewCustomer(customer);
            const authTokenService = new AuthTokenService();
            const tokens = await authTokenService.CreateTokenPair({ payload: { id: newCustomer._id, email: newCustomer.email }, uid: newCustomer._id })
            return {
                customer: DataUtil.GetSpecificDataFromObject({ fields: ["_id", "email", "name"], object: newCustomer }),
                tokens
            }
        }
        catch (e) {
            throw e;
        }
    }
    public async login(account: AccountDTO) {
        try {
            const customerService = new CustomerService();
            const customer = await customerService.FindCustomerByEmail(account.email);
            if (!customer) {
                throw new UnauthorizedError(this.INVALID_ACCOUNT);
            }
            const match = bcrypt.compare(account.password, customer.password);
            if (!match) {
                throw new UnauthorizedError(this.INVALID_ACCOUNT);
            }
            const authTokenService = new AuthTokenService();
            const tokens = await authTokenService.CreateTokenPair({ payload: { id: customer._id, email: customer.email }, uid: customer._id })
            return {
                customer: DataUtil.GetSpecificDataFromObject({ fields: ["_id", "email", "name"], object: customer }),
                tokens
            }
        }
        catch (e) {
            throw e;
        }
    }

}