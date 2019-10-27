import React from 'react'
import { connect } from 'react-redux';
import { loadInventories } from '../redux/actions';
import {useEffect} from 'react';
import InventoryCard from './inventory-view';
const InventoryComponent = ({isLoadingInventory,inventories,loadInventories}) => {
    useEffect(()=>{
        loadInventories();
    },[loadInventories]);
    return (
        renderInventories(isLoadingInventory,inventories)
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