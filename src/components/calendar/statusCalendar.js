import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

  const localizer = momentLocalizer(moment);


  function StatusCalendar({ loads }) {

    
    return(
      <div style={{ height: 1700 }}>
        <Calendar
          views={['month', "work_week"]}
          events={loads}
          localizer={localizer}
          popup
          selectable={true}
          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                borderRadius: "0px",
                border: "none"
              };
        
              if (event.status == "Delivered"){
                newStyle.backgroundColor = "green"

              } else if (event.status == "In-transit") {
                newStyle.backgroundColor = "maroon"

              } else if(event.status == "waiting"){
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
    )
  }


export default StatusCalendar;