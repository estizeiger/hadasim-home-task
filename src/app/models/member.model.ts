import { Vaccine } from "./vaccine.model";

export function defaultMember() : Member {
    return {
        id: "",
        firstName:"",
        lastName:"",
        tz:0,
        city:"",
        street:"",
        houseNumber:0,
        phone:"",
        mobile:"",
        vaccines: []
    }
}

export interface Member{
    id: string;
    firstName: string;
    lastName: string;
    tz: number;

    city: string;
    street: string;
    houseNumber:  number;
    phone: string;
    mobile: string;

    positiveResultDate?: Date;
    recoveryDate?: Date;

    vaccines: Vaccine[];
}

