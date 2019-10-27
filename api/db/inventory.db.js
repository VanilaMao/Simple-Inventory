const InventoryItem = require('../models/inventory-item.model');
const Bucket = require('./bucket.result');
class InventoryDB {
    constructor() {
        this.initiallize();
    }
    save(inventory) {
        var item = new InventoryItem(inventory);
        var vin = item.vin;
        this.dataSetIndexTable[vin] = this.dataSetIndex;
        this.dataSet.push(item);
        this.dataSetIndex++;
    }

    initiallize() {
        this.dataSet = [];
        this.dataSetIndex = 0;
        this.dataSetIndexTable = {};
    }
    //no nest term now, if that, can use recusive to handle it
    //term is one of the property name of the inventory, return bucket 
    aggregate(term) {
        var rootBucket = new Bucket({ count: 0, purchasePrice: 0, value: '' });
        this.dataSet.map(item => {
            var value = item[term];
            var bucket = rootBucket.buckets.find(x => x.value === value);
            if (!bucket) {
                rootBucket.buckets.push(
                    new Bucket(
                        { count: 1, purchasePrice: item.purchaseValue, value: value }))
            } else {
                bucket.purchasePrice += item.purchaseValue;
                bucket.count++;
            }
            rootBucket.count++;
            rootBucket.purchasePrice += item.purchaseValue;
        });
        return rootBucket;
    }

    lookup(vin) {
        var index = this.dataSetIndexTable[vin];
        return this.dataSet[index];
    }

    getInventories() {
        return this.dataSet;
    }
}

module.exports = new InventoryDB();