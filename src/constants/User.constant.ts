import { Date } from "mongoose";

export enum Gender {
    MALE,
    FEMALE,
    OTHER
}

export abstract class UserDTO {
    public name: string;
    public email: string;
    public password: string;
    public gender: Gender;
    public isActive: boolean;
    public constructor(name: string, email: string, password: string, gender: Gender, isActive: boolean) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.isActive = isActive;
    }
}

export class CustomerDTO extends UserDTO {
    public phone: string;
    public addresses: string[];
    public birthday: Date;
    public constructor(name: string, email: string, phone: string, addresses: string[], password: string, gender: Gender, birthday: Date, isActive: boolean) {
        super(name, email, password, gender, isActive)
        this.phone = phone;
        this.addresses = addresses;
        this.birthday = birthday;
    }
}

export class DeliveryPersonDTO extends UserDTO {
    public phone: string;
    public addresses: string[];
    public birthday: Date;
    public salary: Number;
    public currentLocation?: string
    public constructor(name: string, email: string, phone: string, addresses: string[], password: string, gender: Gender, birthday: Date, salary: Number, isActive: boolean, currentLocation?: string) {
        super(name, email, password, gender, isActive)
        this.phone = phone;
        this.addresses = addresses;
        this.birthday = birthday;
        this.salary = salary;
        this.currentLocation = currentLocation;
    }
}

export class AdminDTO extends UserDTO {

}