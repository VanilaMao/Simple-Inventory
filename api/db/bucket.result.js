module.exports = class Bucket{
    constructor(input){
        this.count = input.count;
        this.purchasePrice = input.purchasePrice;
        //the value to aggregate
        this.value = input.value;
        this.buckets = [];
    }
    add(bucket){
        this.buckets.put(bucket)
    }
}