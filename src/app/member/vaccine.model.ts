export class Vaccine {
    vaccineDate: Date;
    manufacturer: string;

    constructor(vaccineDate: Date, manufacturer: string){
        this.vaccineDate = vaccineDate;
        this.manufacturer = manufacturer;
    }
}