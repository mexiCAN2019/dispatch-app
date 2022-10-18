import { TextField, Button, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import ExpressF from '../../fetchFeathers';

function NewDriver() {
    const [driver, setDriver] = useState({firstName: '', lastName: '', truckNumber: null, phoneNumber: ''});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDriver({...driver, [name]: value });
    }

    const handleSubmit = () => {
        const newDriver = {
            firstName: driver.firstName,
            lastName: driver.lastName,
            truckNumber: driver.truckNumber,
            phoneNumber: driver.phoneNumber,
            employed: true,
            summaryNote: null
        };
        ExpressF.newDriver(newDriver).then(response => {
            console.log(response);
            if(response === 400){
                return alert('Make sure all fields are filled out');
            } else{
                setDriver({firstName: '', lastName: '', truckNumber: '', phoneNumber: ''});
                alert('New driver has been added!');
            }
        });
    };


    return(
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{height: "90vh"}}>
            <Grid item>
                <Stack spacing={5}>
                    <TextField required name='firstName' value={driver.firstName} label="First Name" onChange={handleChange} />
                    <TextField required name='lastName' value={driver.lastName} label="Last Name" onChange={handleChange} />
                    <TextField required name='truckNumber' value={driver.truckNumber} label="Truck Number" onChange={handleChange} />
                    <TextField required name='phoneNumber' value={driver.phoneNumber} label="Phone Number" onChange={handleChange} placeholder='123-456-7890' type='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                    <Button onClick={handleSubmit} variant='contained'>Add Driver</Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default NewDriver;