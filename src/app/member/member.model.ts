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

    // vaccines?: Array<[Vaccine, Vaccine, Vaccine, Vaccine]> ;
    vaccines: Vaccine[];

    // vaccine2Date?: Date;
    // vaccine2Manufacturer?: string;
    
    // vaccine3Date?: Date;
    // vaccine3Manufacturer?: string;

    // vaccine4Date?: Date;
    // vaccine4Manufacturer?: string;
}