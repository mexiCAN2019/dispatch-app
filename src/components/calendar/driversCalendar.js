import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Express from '../../fetchExpress';
import { trailerOptions, trailerNumbers, states, status, dispatched } from '../../util/options'
import { DateInput } from 'semantic-ui-calendar-react';

  const localizer = momentLocalizer(moment);


  function DriversCalendar({ loads }) {
    const [calendarSize, setCalendarSize] = useState(1700);
    // const [editOpen, setEditOpen] = useState(false);
    // const [load, setLoad] = useState([]); //load info for modal

   



    // const handleSelect = (e) => {
    //   setEditOpen(true);
    //   console.log(e);
    // };

    // const handleChange = () => {
    //   console.log('testing');
    // }

    // const handleSubmit = () => {
    //   console.log('submit');
    // }
    // const cancelledLoad = () => {
    //   console.log('load cancelled')
    // }

    // const [driversDropdown, setDriversDropdown] = useState();
    // useEffect(() => {
    //     Express.getDrivers().then(fetchedDrivers => {
    //         let drivers = [];
    //         fetchedDrivers.map(driver => {
    //             drivers.push({key: driver.id, value: driver.id, text: `${driver.firstName}, ${driver.truckNumber}, ${driver.phoneNumber}`})
    //         });
    //         console.log(drivers);
    //     setDriversDropdown(drivers);
    //     }) 
    // }, []);

    return(
      <div>
      <div style={{ height: calendarSize }}>
        <Calendar
          views={['month', "work_week"]}
          events={loads}
          localizer={localizer}
          popup
          // selectable
          // onSelectEvent={e => handleSelect(e)}
          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                borderRadius: "0px",
                border: "none"
              };
        
              if (event.driver == "Kevin"){
                newStyle.backgroundColor = "red"

              } else if (event.driver == "Fabio") {
                newStyle.backgroundColor = "blue"

              } else if(event.driver == "Tiburcio"){
                newStyle.backgroundColor = "teal"

              } else if(event.driver == "Freddy"){
                newStyle.backgroundColor = "black"

              } else if(event.driver == "Heber"){
                newStyle.backgroundColor = "green"

              } else if(event.driver == "Unassigned"){
                newStyle.backgroundColor = "grey"
              } 
              
        
              return {
                className: "",
                style: newStyle
              };
            }
          }
        />
      
        
      </div>
      </div>
    )
  }


export default DriversCalendar;



{/* <Modal open={editOpen} size='large'>
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content image>
          <Form widths='equal' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Input label='Load ID' placeholder='PRO#, Confirmation#, etc...' name='loadID' value={loadInfo.loadID} onChange={handleChange} />
                <Form.Input control={Select} label='Dispatched' name='dispatched' value={loadInfo.dispatched} options={dispatched} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Input control={Select} options={status} label='Status' name='loadStatus' value={loadInfo.loadStatus} onChange={handleChange} />
                <Form.Input required control={Select} label='Driver' placeholder='Driver' name='driverID' value={loadInfo.driverID} options={driversDropdown} onChange={handleChange} />
                <Form.Input required control={Select} label='Trailer Type' placeholder='Trailer Type' name='trailerType' value={loadInfo.trailerType} options={trailerOptions} onChange={handleChange} />
                <Form.Input control={Select} label='Trailer Number' placeholder='Trailer Number' name='trailerNumber' value={loadInfo.trailerNumber} options={trailerNumbers} onChange={handleChange} />
            </Form.Group>    

            <Form.Group>
                <Form.Input required label='Pickup City' placeholder='Pickup City' name='puCity' value={loadInfo.puCity} onChange={handleChange} />
                <Form.Input required control={Select} search options={states} label='Pickup State' placeholder='State' name='puState' value={loadInfo.puState} onChange={handleChange} />
                <Form.Field>
                <DateInput
                    label='Pickup Date*'
                    dateFormat='MM/DD/YYYY'
                    name='puDate' value={loadInfo.puDate} onChange={handleChange} />
                </Form.Field>
                <Form.Input required label='Pickup Time' placeholder='Pickup Time' type='time' name='puTime' value={loadInfo.puTime} onChange={handleChange} />
                <Form.Input label='Latest PU Time' placeholder='Latest Time' type='time' name='endPUTime' value={loadInfo.endPUTime} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Input required label='Deliver City' placeholder='Deliver City' name='delCity' value={loadInfo.delCity} onChange={handleChange} />
                <Form.Input required control={Select} search options={states} label='Deliver State' placeholder='State' name='delState' value={loadInfo.delState} onChange={handleChange} />
                <Form.Field>
                <DateInput
                        label='Deliver Date*'
                        dateFormat='MM/DD/YYYY'
                        name='delDate' value={loadInfo.delDate} onChange={handleChange} />
                </Form.Field>
                <Form.Input required label='Deliver Time' placeholder='Deliver Time' type='time' name='delTime' value={loadInfo.delTime} onChange={handleChange} />
                <Form.Input label='Latest Del Time' placeholder='Latest Time' type='time' name='endDelTime' value={loadInfo.endDelTime} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Input required label='Commodity' placeholder='Commodity' name='commodity' value={loadInfo.commodity} onChange={handleChange} />
                <Form.Field>
                    <Label basic style={{border: 'none'}}>Weight*</Label>
                    <Input label={{ basic: true, content: 'K Lbs' }} labelPosition='right' placeholder='Weight' name='weight' value={loadInfo.weight} type='number' onChange={handleChange} />
                </Form.Field>
                <Form.Input required label='Broker' placeholder='Broker' name='broker' value={loadInfo.broker} onChange={handleChange} />
                <Form.Field>
                    <Label basic style={{border: 'none'}}>Rate*</Label>
                    <Input label={{ basic: true, content: '$' }} labelPosition='left' placeholder='Rate' name='rate' value={loadInfo.rate} type='number' onChange={handleChange} />
                </Form.Field>
            </Form.Group>

            <Form.Input label="Additional Note" control={TextArea} placeholder="note" name='notes' value={loadInfo.notes} onChange={handleChange} />
            <Button type="submit" color="green" icon="truck" content="Save Changes" />
            <Button onClick={()=> setEditOpen(false)} color='gray'>Close</Button>
            
        </Form>
                </Modal.Content>
                <Button color='red' onClick={cancelledLoad}>Cancel Load</Button>
            </Modal> */}