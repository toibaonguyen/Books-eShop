import { CustomerDTO, DeliveryPersonDTO } from "../constants/User.constant";
import { BadRequestError } from "../constants/Error.constants";
import DeliveryPersonModel from "../models/DeliveryPerson.users.model";
import bcrypt from "bcrypt";
import { AuthTokenService } from "./AuthToken.service";
import { DataUtil } from "../utils/Data.util";

export class DeliveryPersonService {
    private ALREADY_REGISTERED_DELIVERY_PERSON = "This delivery person is already registered";
    public async CreateNewDeliveryPerson(user: DeliveryPersonDTO) {
        try {
            const matchedEmailRegisteredCustomer = await this.FindDeliveryPersonByEmail(user.email);
            if (matchedEmailRegisteredCustomer) {
                throw new BadRequestError(this.ALREADY_REGISTERED_DELIVERY_PERSON);
            }
            else {
                const newCustomer = await DeliveryPersonModel.create({
                    name: user.name,
                    email: user.email,
                    password: await bcrypt.hash(user.password, 10),
                    addresses: user.addresses,
                    phone: user.phone,
                    gender: user.gender,
                    birthday: user.birthday,
                    isActive: user.isActive,
                    currentLocation: undefined
                })
                return newCustomer;
            }
        }
        catch (e) {
            throw e;
        }
    }

    public async FindDeliveryPersonByEmail(email: string) {
        try {
            const matchedEmailRegisteredCustomer = await DeliveryPersonModel.findOne({ email: email }).lean();
            return matchedEmailRegisteredCustomer;
        }
        catch (e) {
            throw e;
        }
    }
}