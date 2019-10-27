const request = require('supertest');
const db = require('../db/db');
const express = require('express');
const api = require('./api');

const app = express();
app.use(express.json());
app.use('/api', api);


describe('all the endpoints should resonpse correctly', () => {
    it('get /inventories', () => {
        const inventories = [
            {
                year: 2019,
                vin: "somevin1",
                purchaseValue: 1,
                claims: [{
                    details: "sleeping driving",
                    company: 'google'
                }]
            },
            {
                year: 2020,
                vin: "somevin2",
                purchaseValue: 2,
                claims: [{
                    details: "try to code javascript when car is still moving",
                    company: 'Amazon'
                }]
            }
        ];
        const spy = jest.spyOn(db, 'getInventories').mockImplementation(() => inventories);
        return request(app).get('/api/inventories').expect(response => {
            expect(spy).toHaveBeenCalled();
            expect(response.status).toEqual(200);
            expect(response.body.length).toEqual(2);
            expect(response.body[0].year).toEqual(2019);
        });
    });
    it('get /aggregate/:term', () => {
        const aggregate = {
            count: 5,
            purchasePrice: 500,
            value: '',
            buckets: [{
                count: 2,
                purchasePrice: 200,
                value: '2019',
                buckets: []
            },
            {
                count: 3,
                purchasePrice: 300,
                value: '2020',
                buckets: []
            }]
        };
        const spy = jest.spyOn(db, 'getAggregateResult').mockImplementation((year) => aggregate);
        return request(app).get('/api/aggregate/year').expect(response => {
            expect(spy).toHaveBeenCalledWith('year');
            expect(response.status).toEqual(200);
            expect(response.body.buckets.length).toEqual(2);
            expect(response.body.purchasePrice).toEqual(500);
            expect(response.body.count).toEqual(5);
        });
    });
    describe('get /inventory/:vin', () => {
        it('should return 200', () => {
            const inventory = {
                year: 2019,
                vin: "somevin1",
                purchaseValue: 1,
                claims: [{
                    details: "sleeping driving",
                    company: 'google'
                }]
            };
            const spy = jest.spyOn(db, 'getInventory').mockImplementation(vin => inventory);
            return request(app).get('/api/inventory/somevin1').expect(response => {
                expect(spy).toHaveBeenCalledWith('somevin1');
                expect(response.status).toEqual(200);
                expect(response.body.year).toEqual(2019);
                expect(response.body.purchaseValue).toEqual(1);
                expect(response.body.claims.length).toEqual(1);
            });
        });
        it('should return 404 if vin is not found', () => {
            const spy = jest.spyOn(db, 'getInventory').mockImplementation(vin => undefined);
            return request(app).get('/api/inventory/somevin1').expect(response => {
                expect(spy).toHaveBeenCalledWith('somevin1');
                expect(response.status).toEqual(404);
            });
        });
    });

});