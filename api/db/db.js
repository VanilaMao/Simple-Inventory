const db = require("./inventory.db");
const randomUtils = require('../utils/random')
module.exports.init = ()=>{
   for(var i =0; i<100; i++){
      db.save(randomUtils.randomInventory());
   }
}

module.exports.getInventories= ()=>{
   return db.getInventories();
}

module.exports.getAggregateResult = term=>{
   return db.aggregate(term);
}

module.exports.getInventory = vin=>{
   return db.lookup(vin);
}
