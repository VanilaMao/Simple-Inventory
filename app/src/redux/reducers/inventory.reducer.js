import actionTypes from '../action-types';
import Inventory from '../../models/inventory.model';
import InventoryTreeNode from '../../models/inventory-tree.model';
const initialState = {
    inventories:[],
    isLoadingInventory: false,
    isLoadingAggregation: false,
    treeNode: {},
    searchResult: {}
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.INVENTORIES_LOADED:
            return {
                ...state,
                isLoadingInventory:false,
                inventories: action.payload.items.map(item=>new Inventory(item))
            }
        case actionTypes.LOADING_INVENTORIES:
            return {
                ...state,
                isLoadingInventory: true
            }
        case actionTypes.LOADING_AGGREGATE_INVENTORIES:
            return {
                ...state,
                isLoadingAggregation: true
            }
        case actionTypes.AGGREGATE_INVENTORIES_LOADED:
            console.log(new InventoryTreeNode(action.payload.buckets))
            return {
                ...state,
                isLoadingAggregation: false,
                treeNode: new InventoryTreeNode(action.payload.buckets)
            }
        default:
            return state;
    }
}
export default reducer;