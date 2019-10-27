import actionTypes from './action-types';
import {
    loadInventories as _loadInventories,
    loadAggregations as _loadAggregations
} from '../services/inventory.service';

export const loadInventories = () => dispatch => {
    dispatch(loadingInventory());
    return _loadInventories((items) => dispatch(inventoriesLoaded(items)))
};

export const loadAggregations = (term) => dispatch => {
    dispatch(loadingAggregation());
    return _loadAggregations(term, buckets => dispatch(aggregationLoaded(buckets)))
};

export const loadingInventory = () => ({
    type: actionTypes.LOADING_INVENTORIES,
    payload: { isLoading: true }
});

export const inventoriesLoaded = (items) => ({
    type: actionTypes.INVENTORIES_LOADED,
    payload: { items }
});

export const loadingAggregation = () => ({
    type: actionTypes.LOADING_AGGREGATE_INVENTORIES,
    payload: { isLoading: true }
});

export const aggregationLoaded = (buckets) => ({
    type: actionTypes.AGGREGATE_INVENTORIES_LOADED,
    payload: { buckets }
});

