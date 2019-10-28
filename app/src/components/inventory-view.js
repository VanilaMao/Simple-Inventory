import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button,InputGroup,FormControl} from 'react-bootstrap';

const InventoryCard = ({ inventories,search }) => {
    const [dispaly, setDisplay] = useState(false);
    const [vinNumber,setVinNumber] = useState('');
    const [showDetails, setShowDetails] = useState(createShowDetailsObject(inventories));
    return ( <div>
        <Card>
            <Card.Header as="h5">Inventrories</Card.Header>
            <Card.Body>
                <Card.Title>Inventory Broswer tool for business decision</Card.Title>
                <Card.Text>
                    better description in the future
                </Card.Text>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">*</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Please Input a Vin or empty string to search "
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={e=>setVinNumber(e.target.value)}
                    />
                    <Button className="ml-1" onClick={()=>search(vinNumber)}>Search</Button>
                </InputGroup>
                <Button variant="primary" onClick={() => setDisplay(true)}>Show</Button>
                <Button variant="secondary" onClick={() => setDisplay(false)} className="ml-3">Hide</Button>
            </Card.Body>
            {dispaly?
                <ListGroup variant="flush" className="list-group-flush" >
                    {inventories.length!==0? inventories.map(item => !showDetails[item.vin] ? renderItemSummary(item, () => setShowDetails({
                        ...showDetails,
                        [item.vin]: true
                    }))
                        : renderItemDetails(item, () => setShowDetails({
                            ...showDetails,
                            [item.vin]: false
                        }))):'No result, please input a valid vin number or check with adminstration!'}
                </ListGroup> : null}
        </Card>
    </div>)
}

function createShowDetailsObject(inventories) {
    var showDetails = {};
    inventories.map(item => showDetails[item.vin] = false);
    return showDetails;
}

function renderItemSummary(item, showDetails) {
    return (
        <div key={item.vin}>
            <ListGroupItem >
                <div className="d-flex">
                    {item.year + ' ' + item.make + ' (' + item.vin + ' )'}
                    <Button onClick={() => showDetails()} variant="primary" className="ml-auto">Details</Button>
                </div>
            </ListGroupItem>
        </div>);
}

function renderItemDetails(item, showDetails) {
    return (
        <div key={item.vin}>
            <ListGroupItem >
                <Card >
                    <Card.Header bg="blue" as="h5"> {item.year + ' ' + item.make + ' (' + item.vin + ' )'}</Card.Header>
                    <Card.Body>
                        <Card.Title>A Good Car</Card.Title>
                        <Card.Text>
                            very good car!
                            </Card.Text>
                        <Button onClick={() => showDetails()} variant="secondary" className="ml-auto">Hide Details</Button>
                    </Card.Body>
                    <ListGroup variant="flush" className="list-group-flush active" >
                        <ListGroupItem>Purchase Value: {item.value}$</ListGroupItem>
                        <ListGroupItem>Year: {item.year}</ListGroupItem>
                        <ListGroupItem>Model: {item.model}</ListGroupItem>
                        <ListGroupItem>Make: {item.make}</ListGroupItem>
                        <ListGroupItem>Vin: {item.vin}</ListGroupItem>
                        <Card>
                            <Card.Header as="h5"> Claim History</Card.Header>
                            <ListGroup variant="flush" className="list-group-flush" >
                                {item.claims.map((claim, index) => <ListGroupItem key={index}>
                                    <div className="d-flex flex-column">
                                        <span className="">Comapny: {claim.company}</span>
                                        <span className="">Details: {claim.details}</span>
                                    </div>
                                </ListGroupItem>)}
                            </ListGroup>
                        </Card>
                    </ListGroup>
                </Card>
            </ListGroupItem>
        </div>);
}
export default InventoryCard;