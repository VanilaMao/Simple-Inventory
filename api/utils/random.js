const vin = require('vin-generator');
const InventoryItem = require('../models/inventory-item.model');
const details =["run into a lake", "hit a deer", "drive in one way revservely"];
const companies =["Geico","progressive","triple a","state farm"];

const randomNumber = (from,to)=>{
    return Math.floor(Math.random() * (from - to + 1)) + to;
}
const randomClaim = ()=>{
    return {
        details:details[randomNumber(0,details.length-1)],
        company: companies[randomNumber(0,companies.length-1)]
    }
}

const randomClaims = (from,to)=>{
    var claims = [];
    for(var i=from; i<randomNumber(to,from)+1;i++ ){
        claims.push(randomClaim());
    }
    return claims;
}

const randomMake = ()=>{
    const makes = ['toyota','honda','ford','gm'];
    return makes[Math.floor(Math.random()*makes.length)]
}

module.exports.randomInventory = ()=>{
    return new InventoryItem({
        year:randomNumber(2016,2020),
        make: randomMake(),
        purchaseValue: randomNumber(100,2000),
        vin:vin.generateVin(),
        claims:randomClaims(1,3)
    });
}