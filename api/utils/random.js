const vin = require('vin-generator');
const InventoryItem = require('../models/inventory-item.model');
const details = ["run into a lake", "hit a deer", "drive in one way revservely"];
const companies = ["Geico", "progressive", "triple a", "state farm"];

const randomNumber = (from, to) => {
    return Math.floor(Math.random() * (from - to + 1)) + to;
}

const randomClaims = (from, to) => {
    var claims = [];
    for (var i = from; i < randomNumber(to, from) + 1; i++) {
        claims.push({
            details: details[Math.floor(Math.random() *details.length)],
            company: companies[i]
        })
    }
    return claims;
}

const randomMakeModel = () => {
    const makes = [
        { make: 'toyota', models: ["rav4","camry"] },
        { make: 'honda', models: ["civic", "crv"] },
        { make: 'ford', models: ["explorer","crestline", "parklane"] },
        { make: 'gmc', models: ["canyon", "acadia", "terrain"] }];
    var makeModel = makes[Math.floor(Math.random() * makes.length)];
    return {
        make: makeModel.make,
        model: makeModel.models[Math.floor(Math.random() * makeModel.models.length)]
    }
}

module.exports.randomInventory = () => {
    var makeModel = randomMakeModel();
    return new InventoryItem({
        year: randomNumber(2016, 2020),
        make: makeModel.make,
        model: makeModel.model,
        purchaseValue: randomNumber(100, 2000),
        vin: vin.generateVin(),
        claims: randomClaims(0, 3)
    });
}