import actionTypes from '../action-types';
import Inventory from '../../models/inventory.model';
import InventoryTreeNode from '../../models/inventory-tree.model';
const initialState = {
    inventories:[],
    isLoadingInventory: false,
    isLoadingAggregation: false,
    treeNode: {},
    aggregateTerm: ''
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
                isLoadingAggregation: true,
                aggregateTerm: action.payload.term
            }
        case actionTypes.AGGREGATE_INVENTORIES_LOADED:
            return {
                ...state,
                isLoadingAggregation: false,
                treeNode: new InventoryTreeNode(action.payload.buckets)
            }
        case actionTypes.SEARCH_INVENTORY_BY_VIN_SUCCESS:
            return {
                ...state,
                isLoadingInventory: false,
                inventories: [new Inventory(action.payload.item)]
            }
        case actionTypes.SEARCH_INVENTORY_NO_RESULT:
            return{
                ...state,
                isLoadingInventory: false,
                inventories: []
            }
        default:
            return state;
    }
}
export default reducer;