import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RenderLoads from './renderLoads';
import ExpressF from './../../fetchFeathers';
import { drivers } from './../../util/options'
import { Divider, Stack, Dialog, Container, Button, ToggleButtonGroup, ToggleButton, CardMedia, CardContent, Grid, TextField, DialogTitle, Card, Avatar, Typography } from '@mui/material';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";


function Driver() {
    const [alignment, setAlignment] = useState('loads');
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
            const filteredLoads = loads.filter(load => load.id !== cancelledLoad.id);
            setLoads(filteredLoads);
            return true;
        }
    };

    const getMonthLoads = (driverId, year, month) => {
        if(month === 0){
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

    const handleProfileChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
          }
      };

    const renderProfileOrLoads = () => {
        return (
            <ToggleButtonGroup
                className='white-back'
                color="primary"
                value={alignment}
                exclusive
                onChange={handleProfileChange}
                style={{margin: '15px auto'}}
            >
                <ToggleButton value="profile">Profile</ToggleButton>
                <ToggleButton value="loads">Driver Loads</ToggleButton>
            </ToggleButtonGroup>
        )
    }
        
    const renderRecentLoads = () => {
        if(!threeLoads){
            return (
                <>
                    <LocalShippingIcon />
                    <Typography>
                        No Recent Loads
                    </Typography>
                </>
            )
        }
           return threeLoads.map(load => {
                return (                                    
                    <div key={load.id}>
                        <LocalShippingIcon />
                        <Typography>{load.delDate}</Typography>
                        <Typography>{`${load.loadStatus} load from ${load.puCity}, ${load.puState} to ${load.delCity}, ${load.delState}`}</Typography>
                    </div>
                )
            });
    };





    if(alignment === 'loads'){
        return (
            <Container>
                {renderProfileOrLoads()}
                <RenderLoads loads={loads}
                            cancelLoad={cancelledLoad}
                            monthLoads={getMonthLoads}
                            driverId={driverId}
                            cancel={true}
                            driversDropdown={driversDropdown} />
            </Container>
        )
    }
    return (
        <Container>
            {renderProfileOrLoads()}
            <Dialog onClose={() => setEditOpen(false)} open={editOpen} fullWidth={true}>
                <DialogTitle>Edit Driver Info</DialogTitle>
                <Container>
                    <Stack spacing={3}>
                        <TextField label="First Name" name="firstName" value={driver && driver.firstName} onChnage={handleChange} />
                        <TextField label="Lase Name" name="lastName" value={driver && driver.lastName} onChnage={handleChange} />
                        <TextField label="Truck Number" name="truckNumber" value={driver && driver.truckNumber} onChnage={handleChange} type="number" />
                        <TextField label="Phone Number" name="phoneNumber" value={driver && driver.phoneNumber} onChnage={handleChange} />
                    </Stack>
                </Container>
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={()=> setEditOpen(false)}>Close</Button>
            </Dialog>
            
            <Grid container justifyContent="center" spacing={3}>
                <Grid item md={3}>
                    <Stack spacing={2}>
                        <Card>
                            <CardMedia component="img" image="/blank-profile-picture.png" alt="profile pic" />
                            <CardContent>
                                <h2>{driver && driver.firstName} {driver && driver.lastName}</h2>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <h2>Details</h2>
                                <Divider />
                                <Stack spacing={1}>
                                    <span>Truck Number: {driver && driver.truckNumber}</span>
                                    <span>Phone: {driver && driver.phoneNumber}</span>
                                    <span>License Expiration: 1/1/2020</span>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <h2>Actions</h2>
                                <Divider />
                                <div>
                                    <Button onClick={()=> setEditOpen(true)}>
                                        Edit
                                    </Button>
                                    <Button onClick={handleFired}>
                                        FIRED
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item md={6}>
                    <Stack spacing={3}>
                        <Card>
                            <CardContent>
                                <h2>Licensing Info</h2>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <h2>History</h2>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <h2>Requests</h2>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item md={3}>
                    <Stack>
                        <Card>
                            <CardContent>
                                <h2>Recent Loads This Month</h2>
                                <Divider />
                                {renderRecentLoads()}
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
            </Container>
    )
}

export default Driver;