import { CustomerDTO, DeliveryPersonDTO, UserDTO } from "../constants/User.constant";
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../constants/Error.constants";
import bcrypt from "bcrypt";
import CustomerModel from "../models/Customer.users.model";
import { TokenUtil } from "../utils/Token.util";
import crypto from "node:crypto";
import { DataUtil } from "../utils/Data.util";
import { AuthTokenStoreService } from "./AuthTokenStore.service";
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
    protected LOGOUT_SUCCESSFULLY = "Logout successfully!";
    protected INACTIVE_ACCOUNT = "This account is disable";
    protected AUTH_TOKEN_STORE_NOT_FOUND = "Invalid token";
    protected REFRESH_TOKEN_IS_ALREADY_RENEWED = "Something wrong, please login again!";
    public abstract register(user: T): Promise<SuccessloginResponse | void>;
    public abstract login(account: AccountDTO): Promise<SuccessloginResponse>;

    public async logout(authTokenStoreId: string) {
        try {
            const authTokenStoreService = new AuthTokenStoreService();
            const delAuthTokenStoreStore = await authTokenStoreService.RemoveAuthTokenStoreById(authTokenStoreId);
            if (!delAuthTokenStoreStore) {
                throw new BadRequestError(this.LOGOUT_FAIL);
            }
            return this.LOGOUT_SUCCESSFULLY;
        }
        catch (e) {
            throw e;
        }
    }

    public async handleRefreshToken(authTokenStoreId: string, refreshToken: string) {
        try {
            const authTokenStoreService = new AuthTokenStoreService();
            const authTokenStore = await authTokenStoreService.FindAuthTokenStoresById(authTokenStoreId)
            if (!authTokenStore) {
                throw new BadRequestError(this.AUTH_TOKEN_STORE_NOT_FOUND);
            }
            if (authTokenStore.usedRefreshTokens.includes(refreshToken)) {
                await this.logout(authTokenStore._id.toString());
                throw new BadRequestError(this.REFRESH_TOKEN_IS_ALREADY_RENEWED);
            }
            if (authTokenStore.refreshToken != refreshToken) {
                throw new BadRequestError(this.AUTH_TOKEN_STORE_NOT_FOUND);
            }
            const tokens = await authTokenStoreService.UpdateNewTokenPair(authTokenStore._id.toString());
            return tokens;
        }
        catch (e) {
            throw e;
        }
    }
}

//Customer...
export class CustomerAccessService extends AccessService<CustomerDTO> {
    public async register(customer: CustomerDTO) {
        try {
            const customerService = new CustomerService();
            const newCustomer = await customerService.CreateNewCustomer(customer);
            const authTokenStoreService = new AuthTokenStoreService();
            const tokens = await authTokenStoreService.CreateTokenPairAndAuthTokenStore({ payload: { userId: newCustomer._id, email: newCustomer.email }, uid: newCustomer._id })
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
            if (!customer.isActive) {
                throw new ForbiddenError(this.INACTIVE_ACCOUNT);
            }
            const match = bcrypt.compare(account.password, customer.password);
            if (!match) {
                throw new UnauthorizedError(this.INVALID_ACCOUNT);
            }
            const authTokenStoreService = new AuthTokenStoreService();
            const tokens = await authTokenStoreService.CreateTokenPairAndAuthTokenStore({ payload: { userId: customer._id, email: customer.email }, uid: customer._id });
            return {
                user: DataUtil.GetSpecificDataFromObject({ fields: ["_id", "email", "name"], object: customer }),
                tokens
            }
        }
        catch (e) {
            throw e;
        }
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
            if (!deliveryPerson.isActive) {
                throw new ForbiddenError(this.INACTIVE_ACCOUNT);
            }
            const match = bcrypt.compare(account.password, deliveryPerson.password);
            if (!match) {
                throw new UnauthorizedError(this.INVALID_ACCOUNT);
            }
            const authTokenStoreService = new AuthTokenStoreService();
            const tokens = await authTokenStoreService.CreateTokenPairAndAuthTokenStore({ payload: { userId: deliveryPerson._id, email: deliveryPerson.email }, uid: deliveryPerson._id })
            return {
                user: DataUtil.GetSpecificDataFromObject({ fields: ["_id", "email", "name"], object: deliveryPerson }),
                tokens
            }
        }
        catch (e) {
            throw e;
        }
    }

}