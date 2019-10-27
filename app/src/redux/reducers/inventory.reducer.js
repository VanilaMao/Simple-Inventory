import actionTypes from '../action-types';
import Inventory from '../../models/inventory.model';
const initialState = {
    inventories:[],
    isLoadingInventory: false,
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
        default:
            return state;
    }
}
export default reducer;