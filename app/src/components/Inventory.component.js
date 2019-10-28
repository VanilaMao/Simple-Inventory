import React from 'react'
import { connect } from 'react-redux';
import { loadInventories, loadAggregations,searchByVin } from '../redux/actions';
import { useEffect } from 'react';
import InventoryCard from './inventory-view';
import AggregationView from './aggregate-view';
const InventoryComponent = ({ isLoadingInventory,  loadInventories,inventories, 
    isLoadingAggregation,loadAggregations,treeNode,searchByVin }) => {
    useEffect(() => {
        loadInventories();
        loadAggregations('year')
    }, [loadInventories,loadAggregations]);
    return (
        <div className="d-flex flex-column">
            {renderInventories(isLoadingInventory, inventories, (vin)=>{
                if(!!vin){
                    searchByVin(vin);
                }else{
                    loadInventories();
                }
            })}
            {renderAggregations(isLoadingAggregation,loadAggregations,treeNode)}         
        </div>
    )
};

function renderInventories(isLoadingInventory, inventories, search) {
    if (isLoadingInventory) {
        return 'loading inventories'
    }
    return (<div style={{ padding: 20 }}>
        <InventoryCard inventories={inventories} search={search}/>
    </div>)
}

function renderAggregations(isLoadingAggregation,loadAggregations, treeNode) {
    if (isLoadingAggregation) {
        return 'loading aggegation results'
    }
    return (<div style={{ padding: 20 }}>
        <AggregationView treeNode={treeNode} loadAggregations={loadAggregations} />
    </div>)
}


const mapstateToProps = state => {
    return {
        isLoadingInventory: state.inventory.isLoadingInventory,
        inventories: state.inventory.inventories,
        isLoadingAggregation: state.inventory.isLoadingAggregation,
        treeNode: adjustTreeNode(state.inventory.treeNode)
    }
};

function adjustTreeNode(treeNode){
    if(!treeNode.key){
        treeNode.key="All";
        treeNode.name="All";
    }
    return treeNode;
}

const mapDispatchToProps = {
    loadInventories,
    loadAggregations,
    searchByVin
};
export default connect(mapstateToProps, mapDispatchToProps)(InventoryComponent);