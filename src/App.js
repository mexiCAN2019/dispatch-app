import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import HomePage from './components/landing/landing';
import LoadInference from './components/loads/loadInference';
import NavBar from './components/navbar';
import Calendars from './components/calendar/landing';
import Driver from './components/driver/landing'
import Forms from './components/forms';
import NewDriver from './components/driver/newDriver';
import UnassignedLoads from './components/loads/unassignedLoads'
import Data from './components/loads/Data';
import UnbookedLoads from './components/loads/unbookedLoads';
import Login from './components/login';

function App() {

  const PrivateRoute = ({component, ...options}) => {
    const finalComponent = (localStorage.token /* || user */) ? component : Login;

    return <Route {...options} component={finalComponent}/>;
};

const wrappedRoutes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/' exact component={HomePage} />
        <PrivateRoute path='/newLoad' exact component={LoadInference} />
        <PrivateRoute path='/calendar' exact component={Calendars} />
        <PrivateRoute path='/forms' exact component={Forms} />
        <PrivateRoute path='/newDriver' exact component={NewDriver} />
        <PrivateRoute path='/unassignedLoads' exact component={UnassignedLoads} />
        <PrivateRoute path='/data' exact component={Data} />
        <PrivateRoute path='/unbookedLoads' exact component={UnbookedLoads} />
        <PrivateRoute path='/drivers/:driverID' exact component={Driver} />
      </Switch>
    </div>
  )
};

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </div>
  );
}

export default App;