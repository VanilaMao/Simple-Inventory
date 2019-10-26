var express = require('express');
var router = express.Router();
var db = require('../db/db');

router.get("/inventories", (req, res,next)=>{
    res.send(db.getInventories());
});

router.get("/aggregate/:term", (req, res,next)=>{
    const {term} = req.params;
    res.send(db.getAggregateResult(term));
});

router.get("/inventory/:vin", (req, res,next)=>{
    const {vin} = req.params;
    var item = db.getInventory(vin);
    if(item){
        res.send();
    }else{
        res.status(404).send(`Vin: ${vin} Not found`);
    }     
});

module.exports = router;