import actionTypes from '../action-types';
import Inventory from '../../models/inventory.model';
const initialState = {
    inventories:[],
    isLoadingInventory: false,
    isLoadingAggregation: false,
    buckets: [],
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
        case actionTypes.AGGREGATE_INVENTORIES_LOADED:screenLeft
            return {
                ...state,
                isLoadingAggregation: false,
                buckets: action.payload.items.map()
            }
        default:
            return state;
    }
}
export default reducer;