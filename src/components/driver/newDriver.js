import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import ExpressF from '../../fetchFeathers';

function NewDriver() {
    const [driver, setDriver] = useState({firstName: '', lastName: '', truckNumber: null, phoneNumber: ''});

    const handleChange = (e, {name, value}) => {
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
        <Form onSubmit={handleSubmit}>
            <Form.Input required label='First Name' name='firstName' value={driver.firstName} onChange={handleChange}></Form.Input>
            <Form.Input required label='Last Name' name='lastName' value={driver.lastName} onChange={handleChange}></Form.Input>
            <Form.Input required label='Truck Number' name='truckNumber' value={driver.truckNumber} onChange={handleChange} type='number'></Form.Input>
            <Form.Input required label='Phone Number' name='phoneNumber' value={driver.phoneNumber} onChange={handleChange}></Form.Input>
            <Button type="submit" color="green" icon="user" content="Save Changes" />
        </Form>
    )
}

export default NewDriver;