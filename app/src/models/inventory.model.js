export class Claim{
    constructor(input){
        this.details= input.details;
        this.company = input.company;
    }
}
export default class Inventory {
    constructor(input){
        this.make = input.make;
        this.year = input.year;
        this.vin = input.vin;
        this.value = input.purchaseValue;
        this.claims = input.claims.map(claim=>new Claim(claim));
        this.model = input.model;
        this.licenseNumber = input.plate;
        this.licenseState= input.plateState;
    }
}