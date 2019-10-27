const InventoryItem = require('../models/inventory-item.model');
const Bucket = require('./bucket.result');
var inventoryDB = require('./inventory.db');
const utils = require('../utils/random');

describe('test inventory DB functions', () => {
    beforeEach(() => {
        inventoryDB.initiallize();
    });

    it('save', () => {
        item = utils.randomInventory();
        inventoryDB.save(item);
        expect(inventoryDB.dataSet.length).toEqual(1);
        expect(inventoryDB.dataSetIndexTable[item.vin]).toEqual(0);
    });

    describe('test aggragate and lookup vin', () => {
        let items;
        beforeEach(()=>{
            items = [
            {
                year: 2019,
                vin:'123',
                purchaseValue:100,
                claims:[{
                    details:'read block chain article while driving',
                    company:'google'
                }]
            },
            {
                year: 2020,
                vin:'456',
                purchaseValue:200,
                claims:[{
                    details:'thinking why Java is so great while driving',
                    company:'amazon'
                }]
            },
            {
                year: 2019,
                vin:'789',
                purchaseValue:300,
                claims:[{
                    details:'how to introduce directive, pipe cool things into react while driving',
                    company:'facebook'
                }]
            }];
        });

        it('should return correct aggregation result',()=>{
            items.map(item=>inventoryDB.save(item));
            const result = inventoryDB.aggregate('year');
            expect(result.value).toEqual('');
            expect(result.purchasePrice).toEqual(600);
            expect(result.count).toEqual(3);
            expect(result.buckets.length).toEqual(2);
            expect(result.buckets[0].count).toEqual(2);
            expect(result.buckets[0].value).toEqual(2019);
            expect(result.buckets[0].purchasePrice).toEqual(400);
        });
        
        it('should return correct lookup result',()=>{
            items.map(item=>inventoryDB.save(item));
            const result = inventoryDB.lookup('456');
            expect(result.year).toEqual(2020);
            expect(result.purchaseValue).toEqual(200);
        })
    });
})