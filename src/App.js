import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
  const {pathname} = useLocation();

  const checkLoggedIn = () => {
    const loggedIn = (/* localStorage.token && */ user) ? true : false; //localStorage.token returns false even though auth is successful
    // console.log(localStorage.token, user, loggedIn);
    return loggedIn;
  };

  const checkRole = (route) => {
    let finalComponent;
    switch(route){
      case 'home':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <HomePage /> : 'redirect';
        break;
      case 'new-load':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <LoadInference /> : 'redirect';
        break;
        case 'calendar':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <Calendars /> : 'redirect';
        break;
        case 'forms':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <Forms /> : 'redirect';
        break;
      case 'new-driver':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <NewDriver /> : 'redirect';
        break;
      case 'unassigned-loads':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <UnassignedLoads /> : 'redirect';
        break;
      case 'data':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <Data /> : 'redirect';
        break;
      case 'unbooked-loads':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <UnbookedLoads /> : 'redirect';
        break;
      default:
        break;
    };
    if(finalComponent === 'redirect') return <Navigate to="/" />;
    return finalComponent;
  };

  const authenticatedRoutes = (route) => {
    return checkLoggedIn() ? checkRole(route) : <Navigate to='/login' />
  };

  return (
    <div>
      {pathname === '/login' ? '' : <NavBar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/newLoad' element={<LoadInference />} />
        <Route path='/calendar' element={<Calendars />} />
        {/* <Route path='/forms' element={<>{authenticatedRoutes('forms')}</>} /> */}
        <Route path='/newDriver' route='new-driver' element={<NewDriver />} />
        <Route path='/unassignedLoads' route='unassigned-loads' element={<UnassignedLoads />} />
        <Route path='/data' route='data' element={<Data />} />
        <Route path='/unbookedLoads' route='unbooked-loads' element={<UnbookedLoads />} />
        <Route path='/drivers/:driverId' element={<Driver />} />
      </Routes>
    </div>
  );
}

export default App;

{/* <>
            {authenticatedRoutes('home')}
          </>
<>{authenticatedRoutes('new-load')}</>
<>{authenticatedRoutes('calendar')}</>
<>{authenticatedRoutes('new-driver')}</>
<>{authenticatedRoutes('unassigned-loads')}</>
<>{authenticatedRoutes('data')}</>
<>{authenticatedRoutes('unbooked-loads')}</> */}