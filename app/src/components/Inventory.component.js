import React from 'react'
import { connect } from 'react-redux';
import { loadInventories } from '../redux/actions';
import {useEffect} from 'react';
import InventoryCard from './inventory-view';
const InventoryComponent = ({isLoadingInventory,inventories,isLoadingAggregation,loadInventories}) => {
    useEffect(()=>{
        loadInventories();
    },[loadInventories]);
    return (
        <div className="d-flex flex-column">
            {renderInventories(isLoadingInventory,inventories)}
            {renderAggregations(isLoadingAggregation,result)}
        </div>
    )
};

function renderInventories(isLoadingInventory,inventories){
    if(isLoadingInventory){
        return 'loading inventories'
    }
    return (<div style={{padding:20}}>
       <InventoryCard inventories = {inventories}/>
    </div>)
}

function renderAggregations(isLoadingAggregation,result){
    if(isLoadingAggregation){
        return 'loading aggegation results'
    }
    return (<div style={{padding:20}}>
       <InventoryCard inventories = {inventories}/>
    </div>)
}


const mapstateToProps = state => {
    return {
        isLoadingInventory: state.inventory.isLoadingInventory,
        inventories: state.inventory.inventories
    }
};

const mapDispatchToProps = {
    loadInventories
};
export default connect(mapstateToProps, mapDispatchToProps)(InventoryComponent);