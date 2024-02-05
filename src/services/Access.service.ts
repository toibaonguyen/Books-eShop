import { CustomerDTO } from "../constants/Customer.constant";
import { BadRequestError } from "../constants/Error.constants";
import bcrypt from "bcrypt";
import CustomerModel from "../models/Customer.users.model";
import { TokenUtil } from "../utils/Token.util";
import crypto from "node:crypto";
import { DataUtil } from "../utils/Data.util";
import { AuthTokenService } from "./AuthToken.service";

export class CustomerAccessService {
    private ALREADY_REGISTERED_CUSTOMER = "This customer is already registered";
    public async register(customer: CustomerDTO) {
        try {
            const matchedEmailRegisteredCustomer = await CustomerModel.findOne({ email: customer.email }).lean();
            if (matchedEmailRegisteredCustomer) {
                throw new BadRequestError(this.ALREADY_REGISTERED_CUSTOMER);
            }
            else {
                const newCustomer = await CustomerModel.create({
                    name: customer.name,
                    email: customer.email,
                    password: await bcrypt.hash(customer.password, 10),
                    addresses: customer.addresses,
                    type: customer.type,
                    phone: customer.phone,
                    gender: customer.gender,
                    birthday: customer.birthday,
                    isActive: customer.isActive
                })

                const authTokenService = new AuthTokenService()
                const tokens = await authTokenService.CreateTokenPair({ payload: { id: newCustomer._id, email: newCustomer.email }, uid: newCustomer._id })
                return {
                    metadata: {
                        customer: DataUtil.GetSpecificDataFromObject({ fields: ["_id", "email", "name"], object: newCustomer }),
                        tokens
                    }
                }
            }
        }
        catch (e) {
            throw e;
        }
    }

}