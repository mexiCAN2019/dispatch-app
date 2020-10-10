import React, { useState, useEffect } from 'react';
import { Button, Form, Select } from 'semantic-ui-react';
import Express from './../../fetchExpress';
import { months, reloadSelect, dataType } from './../../util/options';

function Data() {
    const [dataCriteria, setDataCriteria] = useState({dataType: null, year: new Date().getFullYear(), month: null, reloadLoad: null, driverID: null});
    const [data, setData] = useState({rate: null, numberOfLoads: null});

    const handleChange = (e, {name, value}) => {
        setDataCriteria({...dataCriteria, [name]: value });
    };

    const handleSubmit = () => {
        if(dataCriteria.driverID === 0){
            switch(dataCriteria.dataType){
                case "average":
                    if(dataCriteria.month == 0){
                        Express.getYearRateAverage(dataCriteria.year, dataCriteria.reloadLoad).then(response => setData({rate: response.averageRate, numberOfLoads: response.numberOfLoads}));
                        console.log("year");
                    } else{
                        Express.getMonthRateAverage(dataCriteria.year, dataCriteria.month, dataCriteria.reloadLoad).then(response => setData({rate: response.averageRate, numberOfLoads: response.numberOfLoads}));
                        console.log("month");
                    }
                    break;
                case "sum":
                    if(dataCriteria.month == 0){
                        Express.getYearRateSum(dataCriteria.year, dataCriteria.reloadLoad).then(response => setData({rate: response.sumRate, numberOfLoads: response.numberOfLoads}));
                    } else{
                        Express.getMonthRateSum(dataCriteria.year, dataCriteria.month, dataCriteria.reloadLoad).then(response => setData({rate: response.sumRate, numberOfLoads: response.numberOfLoads}));
                    }
                    break;
                default:
                    return;
            }
        } else {
            switch(dataCriteria.dataType){
                case "average":
                    if(dataCriteria.month == 0){
                        Express.getDriverYearRateAverage(dataCriteria.year, dataCriteria.reloadLoad, dataCriteria.driverID).then(response => setData({rate: response.averageRate, numberOfLoads: response.numberOfLoads}));
                    } else{
                        Express.getDriverMonthRateAverage(dataCriteria.year, dataCriteria.month, dataCriteria.reloadLoad, dataCriteria.driverID).then(response => setData({rate: response.averageRate, numberOfLoads: response.numberOfLoads}));
                        console.log("Drivermonth");
                    }
                    break;
                case "sum":
                    if(dataCriteria.month == 0){
                        Express.getDriverYearRateSum(dataCriteria.year, dataCriteria.reloadLoad, dataCriteria.driverID).then(response => setData({rate: response.sumRate, numberOfLoads: response.numberOfLoads}));
                    } else{
                        Express.getDriverMonthRateSum(dataCriteria.year, dataCriteria.month, dataCriteria.reloadLoad, dataCriteria.driverID).then(response => setData({rate: response.sumRate, numberOfLoads: response.numberOfLoads}));
                    }
                    break;
                default:
                    return;
                }
        }
        
    };


    const [driversDropdown, setDriversDropdown] = useState();
    useEffect(() => {
        Express.getDrivers().then(fetchedDrivers => {
            let drivers = [{key: 0, value: 0, text: 'All Drivers'}];
            fetchedDrivers.map(driver => {
                drivers.push({key: driver.id, value: driver.id, text: `${driver.firstName}`})
            });
            console.log(drivers);
        setDriversDropdown(drivers);
        }) 
    }, []);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Form onSubmit={handleSubmit}>
                
            <Form.Input style={{width:"300px"}} required control={Select} label='Driver' placeholder='Driver' name='driverID' value={dataCriteria.driverID} options={driversDropdown} onChange={handleChange} width={6} />
            <Form.Input style={{width:"300px"}} required control={Select} label='Choose Data Type' placeholder='Average or Total?' name='dataType' value={dataCriteria.dataType} options={dataType} onChange={handleChange} width={6} />
            <Form.Input style={{width:"300px"}} required control={Select} label='Choose Month' placeholder='Month' name='month' value={dataCriteria.month} options={months} onChange={handleChange} width={6} />
            <Form.Input style={{width:"300px"}} required type='number' label='Enter Year' placeholder='Year' name='year' value={dataCriteria.year} onChange={handleChange} width={6} />
            <Form.Input style={{width:"300px"}} required control={Select} label='Choose Load Type' placeholder='Reload?' name='reloadLoad' value={dataCriteria.reloadLoad} options={reloadSelect} onChange={handleChange} width={6} />
            
            <br></br>
            <Button type="submit" color="green" icon="truck" content="Get Data!" />
            </Form>
            </div>
            <label>{dataCriteria.dataType} Rate for {dataCriteria.month} {dataCriteria.year} is</label>
            <h5>${data.rate}</h5>
            <label>Total number of loads:</label>
            <h5>{data.numberOfLoads}</h5>
        </div>
    )
};


export default Data;