export default class InventoryTreeNode {
    constructor(input){
        this.id = input.value;
        this.name = input.value;
        this.count = input.count;
        this.purchasePrice = input.purchasePrice;
        this.children = input.buckets.map(bucket=>new InventoryTreeNode(bucket));
    }
}