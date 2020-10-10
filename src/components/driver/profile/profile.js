import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    Image,
    Button,
    Segment,
    Tab,
    Modal,
    Form,
    Feed
} from 'semantic-ui-react';
import Express from '../../../fetchExpress';



//add modal to edit profile
//edit Recent Activity to show load status
function Profile({ driverID, threeLoads }) {
    const [driver, setDriver] = useState([]);
    const [editOpen, setEditOpen] = useState(false)

    useEffect(() => {
        Express.getDriver(driverID).then(driver => setDriver(driver));
    }, []);


    const handleChange = (e, {name, value}) => {
        setDriver({...driver, [name]: value });
    }

    const handleSubmit = () => {
        const updatedDriver = {
            firstName: driver.firstName,
            lastName: driver.lastName,
            phoneNumber: driver.phoneNumber,
            truckNumber: driver.truckNumber
        };
        Express.updateDriverInfo(driver.id, updatedDriver).then(response => {
            if(response === 400){
                return alert('Make sure all areas with * are filled');
            } 
            console.log(response);
            alert('Load Updated');
            setEditOpen(false);
        });
    }

    const handleFired = () => {
        const firedEmployee = {
            firstName: driver.firstName,
            lastName: driver.lastName,
            phoneNumber: driver.phoneNumber,
            truckNumber: driver.truckNumber,
            employed: false
        }
        if (window.confirm('Are you sure you want to fire employee?')) {
            Express.updateDriverInfo(driver.id, firedEmployee);
            alert('Employee fired');
        } else {
            alert('Jk, employee not fired lol');
        }
    };
        
    const renderRecentLoads = () => {
        if(!threeLoads[0]){
            return (
                <Feed.Event>
                    <Feed.Label icon="truck" />
                    <Feed.Content>
                        <Feed.Summary>
                            No Recent Loads
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
            )
        }
           return threeLoads.map(load => {
                return (                                    
                    <Feed.Event>
                        <Feed.Label icon="truck" />
                        <Feed.Content>
                            <Feed.Date content={`${load.delDate}`} />
                            <Feed.Summary>
                                {`Delivered load from ${load.puCity}, ${load.puState} to ${load.delCity}, ${load.delState}`}
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>
                        )
            });
    };


    return(
        <div>
            <Modal open={editOpen} onSubmit={handleSubmit}>
                <Modal.Header>Edit Driver Info</Modal.Header>
                    <Modal.Content Image>
                        <Form>
                            <Form.Input required label='First Name' name='firstName' value={driver.firstName} onChange={handleChange}></Form.Input>
                            <Form.Input required label='Last Name' name='lastName' value={driver.lastName} onChange={handleChange}></Form.Input>
                            <Form.Input required label='Truck Number' name='truckNumber' value={driver.truckNumber} onChange={handleChange} type='number'></Form.Input>
                            <Form.Input required label='Phone Number' name='phoneNumber' value={driver.phoneNumber} onChange={handleChange}></Form.Input>
                            <Button type="submit" color="green" icon="user" content="Save Changes" />
                            <Button onClick={()=> setEditOpen(false)} color='google plus'>Close</Button>
                        </Form>
                    </Modal.Content>
            </Modal>
            <Grid celled='internally' style={{margin: "25px auto"}}>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Card>
                            <Image src='/truck-2.jpeg' wrapped
                                ui={false}/>
                            <Card.Content>
                                <Card.Header>{driver.firstName} {driver.lastName}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>7/23</span>
                                    <br></br>
                                    <span className='date'>2020</span>
                                </Card.Meta>
                                <Card.Description>
                                    Description
                                </Card.Description>
                            </Card.Content>
                        </Card>

                        <Card>
                            <Card.Content header='Details' />
                            <Card.Content>
                                <Card.Description textAlign='left'>
                                    Truck Number: {driver.truckNumber} 
                                </Card.Description>
                                <Card.Description textAlign='left'>
                                    Phone: {driver.phoneNumber}
                                </Card.Description>
                                <Card.Description textAlign='left'>
                                    License Expiration: 1/1/2030
                                </Card.Description>
                            </Card.Content>
                        </Card>

                        <Card>
                            <Card.Content header='Actions' />
                            <Card.Content extra>
                                <div className='ui three buttons'>
                                    <Button basic color='green' onClick={()=> setEditOpen(true)}>
                                        Edit
                                    </Button>
                                    <Button onClick={handleFired}  basic color='red'>
                                        FIRED
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Segment style={{overflow: 'auto', maxHeight: '60em'}}>
                            <Tab />
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={4}>
                    
                    <Card>
                        <Card.Content>
                            <Card.Header>Recent Loads</Card.Header>
                        </Card.Content>
                        {renderRecentLoads()}
                    </Card>

                        <Card>
                            <Card.Content header='Notes' />
                                <Card.Content>
                                    positions
                                </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
};

export default Profile;

                           
                            