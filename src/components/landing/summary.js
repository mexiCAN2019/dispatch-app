import React, { useState } from 'react';
import { Card, TextArea, Button } from 'semantic-ui-react';
import Express from './../../fetchExpress';
import ExpressF from './../../fetchFeathers';


function Summary({ load }) {
    const [loadInfo, setLoadInfo] = useState(load);

    const renderColorIfDriverNeedsLoad = () => {
        const greenBorder = {
            border: "green solid 3px",
            margin: '25px 50px', 
            width: '250px', 
            height: '300px',
            borderRadius: '20px'
        };

        const warningBorder = {
            border: "yellow solid 3px",
            margin: '25px 50px', 
            width: '250px', 
            height: '300px',
            borderRadius: '20px'
        };

        const alertBorder = {
            border: "red solid 3px",
            margin: '25px 50px', 
            width: '250px', 
            height: '300px',
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

    } else if( year === d.getFullYear() && month == (d.getMonth() + 1) && day < d.getDate() ){
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
    };

    const handleChange = (e, {name, value}) => {
        setLoadInfo({...loadInfo, [name]: value });
    };


    return(
        <Card style={renderColorIfDriverNeedsLoad()}>
            <Card.Header><b style={{fontSize: '20px', margin: '5px auto'}}>{loadInfo.firstName}</b></Card.Header>
            <Card.Content>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p><u>Most Recent Load</u></p>
                    <p><b>{loadInfo.broker}</b></p>
                    <p style={{margin: '15px auto'}}><i>Pick Up</i>: {loadInfo.puDate} @ {loadInfo.puTime}{loadInfo.endPUTime ? ` - ${loadInfo.endPUTime}` : ''}</p>
                    <p><i>Deliver</i>: {loadInfo.delDate} @ {loadInfo.delTime}{loadInfo.endDelTime ? ` - ${loadInfo.endDelTime}` : ''}</p>
                </div>
            </Card.Content>
            <Card.Content extra style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <TextArea placeholder="Notes about Driver" name="summaryNote" value={loadInfo.summaryNote} onChange={handleChange} />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button icon="save" color="twitter" onClick={handleSubmit} size='mini' style={{width: "20%"}}></Button>
                </div>
            </Card.Content>
        </Card>
    )
};

export default Summary;