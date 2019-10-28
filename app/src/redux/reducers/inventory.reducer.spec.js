import reducer from './inventory.reducer';
import { inventoriesLoaded, loadingInventory, 
    loadingAggregation, aggregationLoaded,
    searchByVinSucess,searchByVinNoResult
} from '../actions';
describe('test inventory reducer', () => {
    let initializeState;
    beforeEach(() =>
        initializeState = {
            inventories: [],
            isLoadingInventory: true,
            isLoadingAggregation: true,
            treeNode: {},
            aggregateTerm: ''
        });
    it('test INVENTORIES_LOADED', () => {
        var inventoriesLoadedAction = inventoriesLoaded([
            {
                year: 2019,
                model: "fick",
                claims: [{
                    details: "something wrong"
                }
                ]
            },
            {
                year: 2018,
                model: "pill",
                claims: [{
                    details: "something"
                }
                ]
            }
        ])
        var result = reducer(initializeState, inventoriesLoadedAction);
        expect(result.isLoadingInventory).toBe(false);
        expect(result.inventories.length).toBe(2);
    });

    it('test LOADING_INVENTORIES', () => {
        const state = { ...initializeState, isLoadingInventory: false }
        var result = reducer(state, loadingInventory());
        expect(result.isLoadingInventory).toBe(true);
    });

    it('test LOADING_AGGREGATE_INVENTORIES', () => {
        const state = { ...initializeState, isLoadingAggregation: false }
        var result = reducer(state, loadingAggregation('bob'));
        expect(result.isLoadingAggregation).toBe(true);
        expect(result.aggregateTerm).toBe('bob');
    });

    it('test AGGREGATE_INVENTORIES_LOADED', () => {
        const buckets = {
            value: '',
            count: 3,
            purchasePrice: 300,
            buckets: [
                {
                    value: 2019,
                    count: 2,
                    purchasePrice: 200,
                    buckets: []
                },
                {
                    value: 2020,
                    count: 1,
                    purchasePrice: 100,
                    buckets: []
                }
            ]

        }
        var state = { ...initializeState, isLoadingAggregation: true }
        var result = reducer(state, aggregationLoaded(buckets));
        expect(result.isLoadingAggregation).toBe(false);
        expect(result.treeNode.count).toBe(3);
        expect(result.treeNode.children.length).toBe(2);
    });

    it('test SEARCH_INVENTORY_BY_VIN_SUCCESS', () => {
        var item =
        {
            year: 2019,
            model: "fick",
            claims: [{
                details: "something wrong"
            }
            ]
        };
        var state = { ...initializeState, isLoadingInventory: true }
        var result = reducer(state, searchByVinSucess(item));
        expect(result.isLoadingInventory).toBe(false);
        expect(result.inventories.length).toBe(1);
    });

    it('test SEARCH_INVENTORY_NO_RESULT', () => {
        var state = { ...initializeState, isLoadingInventory: true }
        var result = reducer(state,searchByVinNoResult("something"));
        expect(result.isLoadingInventory).toBe(false);
        expect(result.inventories.length).toBe(0);
    });
})