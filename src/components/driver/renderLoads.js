import React, { useState, useEffect } from 'react';
import Load from './load';
import { FormControl, InputLabel, Select, Container, Button, MenuItem, TextField, Stack, Backdrop, CircularProgress } from '@mui/material';
import { months } from './../../util/options';


function RenderLoads({ loads, cancelLoad, monthLoads, unbookedLoads, driverId, cancel, driversDropdown }) {
    const [dataCriteria, setDataCriteria] = useState({year: new Date().getFullYear(), month: null});

    useEffect(() => {
        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1){
            getMonth = `0${getMonth}`;
        } else{
            getMonth = getMonth.toString();
        }
        setDataCriteria({...dataCriteria, month: getMonth});
      }, []);


    const handleChange = ({target}) => {
        const {name, value} = target;
        setDataCriteria({...dataCriteria, [name]: value });
    };

    const handleSubmit = () => {
        if(driverId) {
            console.log('driver');
            monthLoads(driverId, dataCriteria.year, dataCriteria.month);
        } else {
            console.log('unbooked');
            unbookedLoads(dataCriteria.year, dataCriteria.month);
        }
    };


    if(!loads) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Container>
                <Stack direction="row" spacing={2} justifyContent="center" style={{margin: '75px auto'}}>
                    <FormControl>
                        <InputLabel>Choose Month</InputLabel>
                        <Select className='white-back' name='month' value={dataCriteria.month || ''} onChange={handleChange} required>
                            {months.map(month => {
                                return <MenuItem key={month.key} value={month.value}>{month.text}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField className='white-back' label="Enter Year" name="year" type='number' value={dataCriteria.year} onChange={handleChange} />
                    <Button variant="contained" onClick={handleSubmit}>Get Loads!</Button>
                </Stack>
            </Container>

            <span><em>Page initially only retreives loads for the current month.</em></span>
            <br></br>
            <em><strong>Green border:</strong> Delivered, <strong>maroon</strong> in transit, <strong>grey:</strong> waiting to be picked up.</em>

            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", }}>
                {loads.map(load => {
                    return <Load load={load}
                                cancelLoad={cancelLoad}
                                key={load.id}
                                cancel={cancel}
                                driversDropdown={driversDropdown} />
                })}
                
            </div>
        </div>
    )
}

export default RenderLoads;