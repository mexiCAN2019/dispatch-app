import React, {useState, useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import { useUser } from './util/react-local-spa';

function App() {

  const {user} = useUser();

  const checkLoggedIn = () => {
    const loggedIn = (localStorage.token && user) ? true : false;
    return loggedIn;
  };

  const checkRole = ({route, component, ...options}) => {
    let finalComponent;
    switch(route){
      case 'home':
        console.log(user);
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? component : 'redirect';
        break;
      case 'new-load':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? component : 'redirect';
        break;
      case 'new-driver':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? component : 'redirect';
        break;
      case 'unassigned-loads':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? component : 'redirect';
        break;
      case 'data':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? component : 'redirect';
        break;
      case 'unbooked-loads':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? component : 'redirect';
        break;
      default:
        finalComponent = component;
        break;
    };
    if(finalComponent === 'redirect') return <Redirect to="/" />;
    console.log(component);
    console.log(finalComponent);
    return <Route {...options} component={finalComponent} />;
  };

  const CustomRoute = ({route, component, ...options}) => {
    console.log(checkLoggedIn());
    if(!checkLoggedIn()) return <Route {...options} component={Login}/>;
    const path = checkRole({route, component, ...options});
    return path; 
    // return <Route {...options} component={HomePage} />;
  };

const wrappedRoutes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/login' exact component={Login} />
        <CustomRoute path='/' exact route='home' component={HomePage} />
        <CustomRoute path='/newLoad' exact route='new-load' component={LoadInference} />
        <CustomRoute path='/calendar' exact component={Calendars} />
        <CustomRoute path='/forms' exact component={Forms} />
        <CustomRoute path='/newDriver' exact route='new-driver' component={NewDriver} />
        <CustomRoute path='/unassignedLoads' exact route='unassigned-loads' component={UnassignedLoads} />
        <CustomRoute path='/data' exact route='data' component={Data} />
        <CustomRoute path='/unbookedLoads' exact route='unbooked-loads' component={UnbookedLoads} />
        <CustomRoute path='/drivers/:driverId' exact component={Driver} />
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