import actionTypes from './action-types';
import {loadInventories as _loadInventories} from '../services/inventory.service';

export const loadInventories = () => dispatch => {
    dispatch(loadingInventory());
    return _loadInventories((items)=>dispatch(inventoriesLoaded(items)))
};

export const loadingInventory = () => ({
    type: actionTypes.LOADING_INVENTORIES,
    payload:{ isLoading: true}
});

export const inventoriesLoaded = (items) => ({
    type: actionTypes.INVENTORIES_LOADED,
    payload: { items }
});
