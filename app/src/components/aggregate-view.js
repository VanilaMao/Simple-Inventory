import React, { useState } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import { Card,Dropdown } from 'react-bootstrap';


const Header = ({ node}) => {
    return (
        <div className="d-flex" >
            {node.name}
            <div className="ml-auto">
                Purchase Price: {node.purchasePrice}$, Count: {node.count}
            </div>
        </div>

    );
};

const AggregationView = ({ treeNode, loadAggregations,aggregationTerm }) => {
    const [data, setData] = useState(treeNode);
    const [term, setTerm] = useState(aggregationTerm);
    const [cursor, setCursor] = useState(false);
    const onClickDropdown = (termName)=>{
        setTerm(termName);
        loadAggregations(termName);
    }
    const onToggle = (node, toggled) => {
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setData(Object.assign({}, data))
    }
    return (
        <Card>
            <Card.Header as="h5">Aggregations</Card.Header>
            <Card.Body>
                <Card.Title>A Good Tool to see aggragation result</Card.Title>
                <Card.Text>
                    Please select a meaningful term:
                </Card.Text>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {term}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>onClickDropdown('year')}>Year</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onClickDropdown('make')}>Make</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onClickDropdown('model')}>Model</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Body>
            <Treebeard data={data} onToggle={onToggle}
                decorators={{ ...decorators, Header }} />
        </Card>
    )
}
    
export default AggregationView;