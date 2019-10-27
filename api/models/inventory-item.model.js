const uuid = require('uuid/v4');
const Claim = require('./claim.model')
module.exports = class InventoryItem {
    constructor(input){
        this.id = uuid();
        this.year = input.year;
        this.make = input.make;
        this.model = input.model;
        this.purchaseValue = input.purchaseValue;
        this.vin = input.vin;
        this.plate = input.plate;
        this.plateState = this.plateState;
        this.claims = input.claims.map(
            claim=>new Claim({details:claim.details,company:claim.company}));
    }

};
