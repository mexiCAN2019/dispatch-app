import React, { useState, useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Stack, InputLabel, TextField, Select, FormControl, Container, Button, MenuItem } from '@mui/material';
import StatusCalendar from './statusCalendar';
import Express from '../../fetchExpress';
import { months } from './../../util/options';

function Calendars() {
    const [statusLoads, setStatusLoads] = useState([]);
    useEffect(() => {
        //new Date() function doesn't take in numbers with zero in front. So must check if the month or day pulled from database has a zero in front
        //Might be able to just put Number() instead of checkZero function
        const checkForZero = (monthOrDay) => {
          if(monthOrDay[0] === 0){
            return monthOrDay.slice(1);
          }
          return monthOrDay;
        };

        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1) {
            getMonth = `0${getMonth}`;
        };

        Express.getMonthLoads(new Date().getFullYear(), getMonth).then(loads => {
          loads.map(load => {
            const startYear = load.puDate.slice(6);
            const startMonth = checkForZero(load.puDate.slice(0, 2));
            const startDay = checkForZero(load.puDate.slice(3, 5));
            const startHour = checkForZero(load.puTime.slice(0,2));
  
            const endYear = load.delDate.slice(6);
            const endMonth = checkForZero(load.delDate.slice(0, 2));
            const endDay = checkForZero(load.delDate.slice(3, 5));
            const endHour = checkForZero(load.delTime.slice(0,2));
  
            return setStatusLoads(prevLoad => [...prevLoad, {title: `${load.firstName}, ${load.puCity} to ${load.delCity} - ${load.dispatched ? 'dispatched' : 'not dispathed'}`, 
                                                    start: new Date(`${startYear}`, `${Number(startMonth) - 1}`, `${startDay}`, `${startHour}`), 
                                                    end: new Date(`${endYear}`, `${Number(endMonth) - 1}`, `${endDay}`, `${endHour}`), 
                                                    delMonthYear: `${load.delDate.slice(0, 2)}${load.delDate.slice(6)}`, 
                                                    status: load.loadStatus,
                                                    driverId: load.driverId}]);
          });
        });
      }, []);

    const [dateCriteria, setDateCriteria] = useState({year: new Date().getFullYear(), month: null});
    useEffect(() => {
        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1){
            getMonth = `0${getMonth}`;
        } else{
            getMonth = getMonth.toString();
        }
        setDateCriteria({...dateCriteria, month: getMonth});
    }, []);



    const renderLoader = () => {
        if(statusLoads == null){
            return (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )
        }
            return (
                <Dimmer>
                    <Loader />
                </Dimmer>
            )
    }

    const handleSubmit = () => {
        const loadsAlreadyFetched = statusLoads.find((load) => load.delMonthYear === `${dateCriteria.month}${dateCriteria.year}`);
        if(loadsAlreadyFetched) return;
        
        const checkForZero = (monthOrDay) => {
            if(monthOrDay[0] === 0){
                return monthOrDay.slice(1);
            }
            return monthOrDay;
        };

        Express.getMonthLoads(dateCriteria.year, dateCriteria.month).then(loads => {
            loads.map(load => {
                const startYear = load.puDate.slice(6);
                const startMonth = checkForZero(load.puDate.slice(0, 2));
                const startDay = checkForZero(load.puDate.slice(3, 5));
                const startHour = checkForZero(load.puTime.slice(0,2));
    
                const endYear = load.delDate.slice(6);
                const endMonth = checkForZero(load.delDate.slice(0, 2));
                const endDay = checkForZero(load.delDate.slice(3, 5));
                const endHour = checkForZero(load.delTime.slice(0,2));
    
                return setStatusLoads(prevLoad => [...prevLoad, {title: `${load.firstName}, ${load.puCity} to ${load.delCity} - ${load.dispatched ? 'dispatched' : 'not dispathed'}`, start: new Date(`${startYear}`, `${Number(startMonth) - 1}`, `${startDay}`, `${startHour}`), end: new Date(`${endYear}`, `${Number(endMonth) - 1}`, `${endDay}`, `${endHour}`), delMonthYear: `${load.delDate.slice(0, 2)}${load.delDate.slice(6)}`, status: load.loadStatus}]);
            });
        });
    };

    const handleChange = (e) => {
        const {value, name} = e.target;
        setDateCriteria({...dateCriteria, [name]: value });
    };

    return(
        <Container>
            <Stack direction="row" spacing={2} justifyContent="center" style={{margin: '75px auto'}}>
                <FormControl>
                    <InputLabel>Choose Month</InputLabel>
                    <Select name='month' value={dateCriteria.month || ''} onChange={handleChange} required>
                        {months.map(month => {
                            if(month.value === 0) return null;
                            return <MenuItem key={month.key} value={month.value}>{month.text}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <TextField label="Enter Year" name="year" type='number' value={dateCriteria.year} onChange={handleChange} />
                <Button variant="contained" onClick={handleSubmit}>Get Loads!</Button>
            </Stack>
            <div>
                <h4 style={{textAlign:"center"}}><i>Calendar initially only retreives loads for the current month. Must get loads and then hit "back" to see the month and loads.</i></h4>
           
                {renderLoader()}

                <StatusCalendar loads={statusLoads} />
            </div>
                  
        </Container>
    )
}

export default Calendars;