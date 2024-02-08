import { CustomerDTO } from "../constants/User.constant";
import { BadRequestError } from "../constants/Error.constants";
import CustomerModel from "../models/Customer.users.model";
import bcrypt from "bcrypt";
import { AuthTokenService } from "./AuthToken.service";
import { DataUtil } from "../utils/Data.util";
import { UserType } from "../constants/AuthToken.constants";

export class CustomerService {
    private ALREADY_REGISTERED_CUSTOMER = "This customer is already registered";
    public async CreateNewCustomer(customer: CustomerDTO) {
        try {
            const matchedEmailRegisteredCustomer = await this.FindCustomerByEmail(customer.email);
            if (matchedEmailRegisteredCustomer) {
                throw new BadRequestError(this.ALREADY_REGISTERED_CUSTOMER);
            }
            else {
                const newCustomer = await CustomerModel.create({
                    name: customer.name,
                    email: customer.email,
                    password: await bcrypt.hash(customer.password, 10),
                    addresses: customer.addresses,
                    phone: customer.phone,
                    gender: customer.gender,
                    birthday: customer.birthday,
                    isActive: customer.isActive
                })
                return newCustomer;
            }
        }
        catch (e) {
            throw e;
        }
    }
    public async FindCustomerByEmail(email: string) {
        try {
            const matchedEmailRegisteredCustomer = await CustomerModel.findOne({ email: email, userType: UserType.CUSTOMER }).lean();
            return matchedEmailRegisteredCustomer;
        }
        catch (e) {
            throw e;
        }
    }
    public async FindCustomerById(userId: string) {
        try {
            return await CustomerModel.findById(userId).findOne({ userType: UserType.CUSTOMER }).lean();
        }
        catch (e) {
            throw e;
        }
    }
}