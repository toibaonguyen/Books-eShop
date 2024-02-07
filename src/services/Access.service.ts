import { CustomerDTO, DeliveryPersonDTO, UserDTO } from "../constants/User.constant";
import { BadRequestError, UnauthorizedError } from "../constants/Error.constants";
import bcrypt from "bcrypt";
import CustomerModel from "../models/Customer.users.model";
import { TokenUtil } from "../utils/Token.util";
import crypto from "node:crypto";
import { DataUtil } from "../utils/Data.util";
import { AuthTokenService } from "./AuthToken.service";
import { CustomerService } from "./Customer.service";
import { AccountDTO } from "../constants/Access.constant";
import { DeliveryPersonService } from "./DeliveryPerson.service";

type SuccessloginResponse = {
    user: any;
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}


abstract class AccessService<T extends UserDTO> {
    protected INVALID_ACCOUNT = "Invalid email or password!";
    protected LOGOUT_FAIL = "Logout fail!";
    public abstract register(user: T): Promise<SuccessloginResponse | void>;
    public abstract login(account: AccountDTO): Promise<SuccessloginResponse>;
    public abstract logout(userId: string): Promise<void>
}

//Customer...
export class CustomerAccessService extends AccessService<CustomerDTO> {
    public async register(customer: CustomerDTO) {
        try {
            const customerService = new CustomerService();
            const newCustomer = await customerService.CreateNewCustomer(customer);
            const authTokenService = new AuthTokenService();
            const tokens = await authTokenService.CreateTokenPair({ payload: { id: newCustomer._id, email: newCustomer.email }, uid: newCustomer._id })
            return {
                user: DataUtil.GetSpecificDataFromObject({ fields: ["_id", "email", "name"], object: newCustomer }),
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
                user: DataUtil.GetSpecificDataFromObject({ fields: ["_id", "email", "name"], object: customer }),
                tokens
            }
        }
        catch (e) {
            throw e;
        }
    }

    public async logout(userId: string) {

    }
}


//DeliveryPerson...
export class DeliveryPersonAccessService extends AccessService<DeliveryPersonDTO>{
    public async register(deliveryPerson: DeliveryPersonDTO) {
        try {
            const deliveryPersonService = new DeliveryPersonService();
            await deliveryPersonService.CreateNewDeliveryPerson(deliveryPerson);
        }
        catch (e) {
            throw e;
        }
    }

    public async login(account: AccountDTO) {
        try {
            const deliveryPersonService = new DeliveryPersonService();
            const deliveryPerson = await deliveryPersonService.FindDeliveryPersonByEmail(account.email);
            if (!deliveryPerson) {
                throw new UnauthorizedError(this.INVALID_ACCOUNT);
            }
            const match = bcrypt.compare(account.password, deliveryPerson.password);
            if (!match) {
                throw new UnauthorizedError(this.INVALID_ACCOUNT);
            }
            const authTokenService = new AuthTokenService();
            const tokens = await authTokenService.CreateTokenPair({ payload: { id: deliveryPerson._id, email: deliveryPerson.email }, uid: deliveryPerson._id })
            return {
                user: DataUtil.GetSpecificDataFromObject({ fields: ["_id", "email", "name"], object: deliveryPerson }),
                tokens
            }
        }
        catch (e) {
            throw e;
        }
    }

    public async logout(userId: string) {

    }
}