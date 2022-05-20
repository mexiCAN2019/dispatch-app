import React, {useState, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

  const checkRole = (route) => {
    let finalComponent;
    switch(route){
      case 'home':
        console.log(user);
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? <HomePage /> : 'redirect';
        break;
      case 'new-load':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? <LoadInference /> : 'redirect';
        break;
        case 'calendar':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? <Calendars /> : 'redirect';
        break;
        case 'forms':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? <Forms /> : 'redirect';
        break;
      case 'new-driver':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <NewDriver /> : 'redirect';
        break;
      case 'unassigned-loads':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? <UnassignedLoads /> : 'redirect';
        break;
      case 'data':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? <Data /> : 'redirect';
        break;
      case 'unbooked-loads':
        finalComponent = (user.role === 'dev' || user.role === 'dispatch') ? <UnbookedLoads /> : 'redirect';
        break;
      default:
        break;
    };
    if(finalComponent === 'redirect') return <Navigate to="/" />;
    console.log(finalComponent);
    return finalComponent;
  };

  const authenticatedRoutes = (route) => {
    return checkLoggedIn() ? checkRole(route) : <Navigate to='/login' />
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          <>
            {authenticatedRoutes('home')}
          </>
        } />
        <Route path='/newLoad' element={<>{authenticatedRoutes('new-load')}</>} />
        <Route path='/calendar' element={<>{authenticatedRoutes('calendar')}</>} />
        <Route path='/forms' element={<>{authenticatedRoutes('forms')}</>} />
        <Route path='/newDriver' route='new-driver' element={<>{authenticatedRoutes('new-driver')}</>} />
        <Route path='/unassignedLoads' route='unassigned-loads' element={<>{authenticatedRoutes('unassigned-loads')}</>} />
        <Route path='/data' route='data' element={<>{authenticatedRoutes('data')}</>} />
        <Route path='/unbookedLoads' route='unbooked-loads' element={<>{authenticatedRoutes('unbooked-loads')}</>} />
        <Route path='/drivers/:driverId' element={<Driver />} />
      </Routes>
    </div>
  );
}

export default App;