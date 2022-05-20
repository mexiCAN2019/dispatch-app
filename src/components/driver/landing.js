import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RenderLoads from './renderLoads';
import Express from './../../fetchExpress';
import ExpressF from './../../fetchFeathers';
import { drivers } from './../../util/options'
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


function Driver() {
    const [profile, setProfile] = useState(true);
    const [loads, setLoads] = useState(null);
    const [threeLoads, setThreeLoads] = useState(() => [])
    const [editOpen, setEditOpen] = useState(false)

    const { driverId } = useParams();


    const [driver, setDriver] = useState(null);
    useEffect(() => {
        ExpressF.getDriver(driverId).then(driver => setDriver(driver));
    }, [driverId]);

    useEffect(() => {
        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1) {
            getMonth = `0${getMonth}`;
        };

        ExpressF.getDriverBookedMonthLoads(driverId, new Date().getFullYear(), getMonth).then(loads => {
          setLoads(loads);
          const loadsForProfile = loads.slice(0,3);
          setThreeLoads(loadsForProfile);
        }
      );
      
    }, [driverId]);

    const [driversDropdown, setDriversDropdown] = useState([]);
    useEffect(() => {
        setDriversDropdown(drivers());
    }, []);





    const cancelledLoad = (cancelledLoad) => {
        if (window.confirm('Are you sure you want to cancel load?')) {
            ExpressF.updateLoad(cancelledLoad.id, cancelledLoad);
            alert('load cancelled');
            const filteredLoads = loads.filter(load => load.id != cancelledLoad.id);
            setLoads(filteredLoads);
        } else {
            alert('load not cancelled');
        }
    };

    const getMonthLoads = (driverId, year, month) => {
        if(month == 0){
            ExpressF.getDriverBookedYearLoads(driverId, year).then(loads => setLoads(loads));
        } else {
            ExpressF.getDriverBookedMonthLoads(driverId, year, month).then(loads => setLoads(loads));
        }
    };

    const handleChange = ({target}) => {
        const {name, value} = target;
        setDriver({...driver, [name]: value });
    }

    const handleSubmit = () => {
        const updatedDriver = {
            firstName: driver.firstName,
            lastName: driver.lastName,
            phoneNumber: driver.phoneNumber,
            truckNumber: driver.truckNumber,
            employed: true
        };
        ExpressF.updateDriverInfo(driver.id, updatedDriver).then(response => {
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
            ExpressF.updateDriverInfo(driver.id, firedEmployee);
            alert('Employee Fired');
        } else {
            alert('Employee Not Fired');
        }
    };

    const renderPositive = () => {
        if (profile === true) {
            return (
                <Button.Group>
                    <Button positive onClick={() => setProfile(true)}>Profile</Button>
                    <Button.Or />
                    <Button onClick={() => setProfile(false)}>Driver Loads</Button>
                </Button.Group>
            )
        }
        return (
            <Button.Group>
                <Button onClick={() => setProfile(true)}>Profile</Button>
                <Button.Or />
                <Button positive onClick={() => setProfile(false)}>Driver Loads</Button>
            </Button.Group>
        )
    }
        
    const renderRecentLoads = () => {
        if(!threeLoads) return;
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
                                {`${load.loadStatus} load from ${load.puCity}, ${load.puState} to ${load.delCity}, ${load.delState}`}
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>
                        )
            });
    };





    if(!profile){
        return (
            <div>
                {renderPositive()}
                <RenderLoads loads={loads}
                            cancelLoad={cancelledLoad}
                            monthLoads={getMonthLoads}
                            driverId={driverId}
                            cancel={true}
                            driversDropdown={driversDropdown} />
            </div>
        )
    }
    return (
        <div>
            {renderPositive()}
            <Modal open={editOpen} onSubmit={handleSubmit}>
                <Modal.Header>Edit Driver Info</Modal.Header>
                    <Modal.Content Image>
                        <Form>
                            <Form.Input required label='First Name' name='firstName' value={driver && driver.firstName} onChange={handleChange}></Form.Input>
                            <Form.Input required label='Last Name' name='lastName' value={driver && driver.lastName} onChange={handleChange}></Form.Input>
                            <Form.Input required label='Truck Number' name='truckNumber' value={driver && driver.truckNumber} onChange={handleChange} type='number'></Form.Input>
                            <Form.Input required label='Phone Number' name='phoneNumber' value={driver && driver.phoneNumber} onChange={handleChange}></Form.Input>
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
                                <Card.Header>{driver && driver.firstName} {driver && driver.lastName}</Card.Header>
                                {/* <Card.Meta>
                                    <span className='date'>7/23</span>
                                    <br></br>
                                    <span className='date'>2020</span>
                                </Card.Meta> */}
                            </Card.Content>
                        </Card>

                        <Card>
                            <Card.Content header='Details' />
                            <Card.Content>
                                <Card.Description textAlign='left'>
                                    Truck Number: {driver && driver.truckNumber} 
                                </Card.Description>
                                <Card.Description textAlign='left'>
                                    Phone: {driver && driver.phoneNumber}
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
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Driver;