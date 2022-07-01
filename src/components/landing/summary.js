import React, { useState } from 'react';
import { Stack, Button, TextField, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpressF from './../../fetchFeathers';


function Summary({ load }) {
    const [loadInfo, setLoadInfo] = useState(load);
    const [snackbar, setSnackbar] = useState({success: false, info: false, error: false, vertical: 'top', horizontal: 'center',})
    
    const naviagate = useNavigate();
    const { vertical, horizontal } = snackbar;

    const renderColorIfDriverNeedsLoad = () => {
        const greenBorder = {
            border: "green solid 3px",
            margin: '25px 50px', 
            width: '250px', 
            borderRadius: '20px'
        };

        const warningBorder = {
            border: "yellow solid 3px",
            margin: '25px 50px', 
            width: '250px', 
            borderRadius: '20px'
        };

        const alertBorder = {
            border: "red solid 3px",
            margin: '25px 50px', 
            width: '250px', 
            borderRadius: '20px'
        };

    const year = Number(loadInfo.delDate.slice(6));
    const month = Number(loadInfo.delDate.slice(0, 2));
    const day = Number(loadInfo.delDate.slice(3, 5));

    const d = new Date();

    console.log(loadInfo.id, year, month, day, d.getFullYear(), d.getMonth() + 1, d.getDate());

    if(year === d.getFullYear() && month === (d.getMonth() + 1) && day === d.getDate()){
        return warningBorder;
        
    } else if( year < d.getFullYear() &&  month > (d.getMonth() + 1)){
        return alertBorder;

    } else if( year === d.getFullYear() && month < (d.getMonth() + 1)){
        return alertBorder;

    } else if( year === d.getFullYear() && month === (d.getMonth() + 1) && day < d.getDate() ){
        return alertBorder;

    } else {
        return greenBorder;
    }
};


    const handleSubmit = () => {
        const updatedDriver = {
            firstName: loadInfo.firstName,
            lastName: loadInfo.lastName,
            phoneNumber: loadInfo.phoneNumber,
            truckNumber: loadInfo.truckNumber,
            employed: loadInfo.employed,
            summaryNote: loadInfo.summaryNote
        };

        ExpressF.updateDriverInfo(loadInfo.id, updatedDriver);
        setSnackbar({ ...snackbar, success: true });
    };

    const handleChange = ({target}) => {
        const {name, value} = target;
        setLoadInfo({...loadInfo, [name]: value });
    };

    const handleClose = () => {
        setSnackbar({ ...snackbar, success: false, info: false, error: false });
    };

    return(
        <Card style={renderColorIfDriverNeedsLoad()}>
            <Stack alignItems="center">
            <Button onClick={() => naviagate(`/drivers/${loadInfo.driverId}`)}>{loadInfo.firstName}</Button>
            <CardContent>
                <Stack alignItems="center">
                    <p><u>Most Recent Load</u></p>
                    <p><b>{loadInfo.broker}</b></p>
                    <p><i>Pick Up</i>: {loadInfo.puDate} @ {loadInfo.puTime} {loadInfo.endPUTime ? `- ${loadInfo.endPUTime}` : ''}</p>
                    <p><i>Deliver</i>: {loadInfo.delDate} @ {loadInfo.delTime} {loadInfo.endDelTime ? `- ${loadInfo.endDelTime}` : ''}</p>
                    <TextField label="Notes about Driver" name="summaryNote" multiline maxRows={2} value={loadInfo.summaryNote} onChange={handleChange} />
                    <Button onClick={handleSubmit}>Save</Button>
                </Stack>
            </CardContent>
            </Stack>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbar.success}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity="success"></Alert>
            </Snackbar>
        </Card>
        
    )
};

export default Summary;