export default class InventoryTreeNode {
    constructor(input){
        this.key = input.value;
        this.label = input.purchasePrice;
        this.nodes = input.buckets.map(bucket=>new InventoryTreeNode(bucket));
    }
}