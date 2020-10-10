import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/landing/landing';
import LoadInference from './components/loads/loadInference';
import NavBar from './components/navbar';
import Calendars from './components/calendar/landing';
import Driver from './components/driver/landing'
import Forms from './components/forms/landing';
import NewDriver from './components/driver/newDriver';
import UnassignedLoads from './components/loads/unassignedLoads'
import Data from './components/loads/Data';
import UnbookedLoads from './components/loads/unbookedLoads';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/newLoad' exact component={LoadInference} />
        <Route path='/calendar' exact component={Calendars} />
        <Route path='/forms' exact component={Forms} />
        <Route path='/newDriver' exact component={NewDriver} />
        <Route path='/unassignedLoads' exact component={UnassignedLoads} />
        <Route path='/data' exact component={Data} />
        <Route path='/unbookedLoads' exact component={UnbookedLoads} />
        <Route path='/:driverID' exact component={Driver} />
      </Switch>
    </div>
  );
}

export default App;