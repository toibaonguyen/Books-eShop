import { Date } from "mongoose";

export enum CustomerType {
    COMMON,
    VIP1,
    VIP2
}

export enum Gender {
    MALE,
    FEMALE,
    OTHER
}

export class CustomerDTO {
    public name: string;
    public email: string;
    public phone: string;
    public addresses: string[];
    public password: string;
    public type: CustomerType;
    public gender: Gender;
    public birthday: Date
    public isActive: boolean

    public constructor(name: string, email: string, phone: string, addresses: string[], password: string, type: CustomerType, gender: Gender
        , birthday: Date, isActive: boolean) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.addresses = addresses;
        this.password = password;
        this.type = type;
        this.gender = gender;
        this.birthday = birthday;
        this.isActive = isActive;
    }

}

