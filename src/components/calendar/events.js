import React, { useState, useEffect } from 'react';
import Express from './../../fetchExpress';

// probably will delete this component

function Events(){
    

    const events = [{
      'title': 'Kevin',
      'allDay': false,
      'start': new Date(2020, 7, 3, 12, 30),
      'end': new Date(2020, 7, 5, 7, 30)
    },
    {
      'title': 'Chofo',
      'allDay': false,
      'start': new Date(2020, 7, 3),
      'end': new Date(2020, 7, 5)
    },
    {
      'title': 'Fabio',
      'allDay': false,
      'start': new Date(2020, 7, 3),
      'end': new Date(2020, 7, 5)
    },
    {
      'title': 'Freddy',
      'allDay': false,
      'start': new Date(2020, 7, 3),
      'end': new Date(2020, 7, 5)
    },{
      'title': 'Heber',
      'allDay': false,
      'start': new Date(2020, 7, 3),
      'end': new Date(2020, 7, 5)
    }];


    return (
      <div>
      {events}
      </div>
    )
}

export default Events;