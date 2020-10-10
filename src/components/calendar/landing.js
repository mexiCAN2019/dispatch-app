import React, { useState, useEffect } from 'react';
import { Button, Dimmer, Loader, Segment, Form, Select } from 'semantic-ui-react';
import DriversCalendar from './driversCalendar';
import StatusCalendar from './statusCalendar';
import Express from '../../fetchExpress';
import { months } from './../../util/options';

function Calendars() {
    const [inference, setInference] = useState(true);
    const [dispatchedLoads, setDispatchedLoads] = useState([]); //stores all loads from fetch
    const [statusLoads, setStatusLoads] = useState([]);

    const [dataCriteria, setDataCriteria] = useState({year: new Date().getFullYear(), month: null});

    useEffect(() => {
        //new Date() function doesn't take in numbers with zero in front. So must check if the month or day pulled from database has a zero in front
        //Might be able to just put Number() instead of checkZero function
        const checkForZero = (monthOrDay) => {
          if(monthOrDay[0] == 0){
            return monthOrDay.slice(1);
          }
          return monthOrDay;
        };

        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1) {
            getMonth = `0${getMonth}`;
        };

        Express.getLoads(new Date().getFullYear(), getMonth).then(loads => {
          loads.map(load => {
            console.log(load);
            const startYear = load.puDate.slice(6);
            const startMonth = checkForZero(load.puDate.slice(0, 2));
            const startDay = checkForZero(load.puDate.slice(3, 5));
            const startHour = checkForZero(load.puTime.slice(0,2));
            console.log(`${startYear}, ${startMonth}, ${startDay}, ${startHour}`);
  
            const endYear = load.delDate.slice(6);
            const endMonth = checkForZero(load.delDate.slice(0, 2));
            const endDay = checkForZero(load.delDate.slice(3, 5));
            const endHour = checkForZero(load.delTime.slice(0,2));
            console.log(`${endYear}, ${endMonth}, ${endDay}, ${endHour}`);
  
            setDispatchedLoads(prevLoad => [...prevLoad, {'title': `${load.firstName}, ${load.puCity} to ${load.delCity} - ${load.dispatched ? "dispatched" : "not dispatched"}`, 'start': new Date(`${startYear}`, `${Number(startMonth) - 1}`, `${startDay}`, `${startHour}`), 'end': new Date(`${endYear}`, `${Number(endMonth) - 1}`, `${endDay}`, `${endHour}`), 'driver': load.firstName, 'dispatched': load.dispatched}]);
            setStatusLoads(prevLoad => [...prevLoad, {'title': `${load.firstName}, ${load.puCity} to ${load.delCity} - ${load.loadStatus}`, 'start': new Date(`${startYear}`, `${Number(startMonth) - 1}`, `${startDay}`, `${startHour}`), 'end': new Date(`${endYear}`, `${Number(endMonth) - 1}`, `${endDay}`, `${endHour}`), 'driver': load.firstName, 'status': load.loadStatus}]);
          });
        });
      }, []);

      useEffect(() => {
        let getMonth = new Date().getMonth();
        if(getMonth.toString().length === 1){
            getMonth = `0${getMonth}`;
        }
        setDataCriteria({...dataCriteria, month: getMonth})
      }, []);



    const renderDataOrInference = () => {
        if(inference === true){
            return <DriversCalendar loads={dispatchedLoads} />
        }
        return <StatusCalendar loads={statusLoads} />
    };

    const renderPositive = () => {
        if(inference === true){
            return (
                <Button.Group>
                    <Button positive onClick={() => setInference(true)}>Drivers</Button>
                    <Button.Or />
                    <Button onClick={() => setInference(false)}>Load Status</Button>
                </Button.Group>
            )
        }
        return (
            <Button.Group>
                <Button onClick={() => setInference(true)}>Drivers</Button>
                <Button.Or />
                <Button positive onClick={() => setInference(false)}>Load Status</Button>
            </Button.Group>
        )
    }


    const renderLoader = () => {
        if(dispatchedLoads == false){
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
        const checkForZero = (monthOrDay) => {
            if(monthOrDay[0] == 0){
                return monthOrDay.slice(1);
            }
            return monthOrDay;
            };
            Express.getLoads(dataCriteria.year, dataCriteria.month).then(loads => {
            loads.map(load => {
                console.log(load);
                const startYear = load.puDate.slice(6);
                const startMonth = checkForZero(load.puDate.slice(0, 2));
                const startDay = checkForZero(load.puDate.slice(3, 5));
                const startHour = checkForZero(load.puTime.slice(0,2));
                console.log(`${startYear}, ${startMonth}, ${startDay}, ${startHour}`);
    
                const endYear = load.delDate.slice(6);
                const endMonth = checkForZero(load.delDate.slice(0, 2));
                const endDay = checkForZero(load.delDate.slice(3, 5));
                const endHour = checkForZero(load.delTime.slice(0,2));
                console.log(`${endYear}, ${endMonth}, ${endDay}, ${endHour}`);
    
                setDispatchedLoads(prevLoad => [...prevLoad, {'title': `${load.firstName}, ${load.puCity} to ${load.delCity} - ${load.dispatched ? "dispatched" : "not dispatched"}`, 'start': new Date(`${startYear}`, `${Number(startMonth) - 1}`, `${startDay}`, `${startHour}`), 'end': new Date(`${endYear}`, `${Number(endMonth) - 1}`, `${endDay}`, `${endHour}`), 'driver': load.firstName, 'dispatched': load.dispatched}]);
                setStatusLoads(prevLoad => [...prevLoad, {'title': `${load.firstName}, ${load.puCity} to ${load.delCity} - ${load.loadStatus}`, 'start': new Date(`${startYear}`, `${Number(startMonth) - 1}`, `${startDay}`, `${startHour}`), 'end': new Date(`${endYear}`, `${Number(endMonth) - 1}`, `${endDay}`, `${endHour}`), 'driver': load.firstName, 'status': load.loadStatus}]);
            });
        });
    };

    const handleChange = (e, {name, value}) => {
        setDataCriteria({...dataCriteria, [name]: value });
    };

    return(
        <div>
           {renderPositive()}
           <Form onSubmit={handleSubmit}>
                <Form.Group style={{display: 'flex', justifyContent: "center", margin: '75px auto'}}>
                    <Form.Input control={Select} label='Choose Month' placeholder='Month' name='month' value={dataCriteria.month} options={months} onChange={handleChange} />
                    <Form.Input required type='number' label='Enter Year' placeholder='Year' name='year' value={dataCriteria.year} onChange={handleChange} />
                    <Button type="submit" color="green" icon="truck" content="Get Loads!" />
                </Form.Group>
            </Form>

           <Segment>
                {renderLoader()}

                {renderDataOrInference()} 
            </Segment>
                  
        </div>
    )
}

export default Calendars;