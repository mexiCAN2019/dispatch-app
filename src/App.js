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
      case 'driver':
        finalComponent = (user.role === 'dev' || user.role === 'admin') ? <Driver /> : 'redirect';
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
    <div className='application'>
      {pathname === '/login' ? '' : <NavBar />}
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route path='/' element={<>
            {authenticatedRoutes('home')}
          </>} />
        <Route path='/newLoad' element={<>{authenticatedRoutes('new-load')}</>} />
        <Route path='/calendar' element={<>{authenticatedRoutes('calendar')}</>} />
        <Route path='/newDriver' route='new-driver' element={<>{authenticatedRoutes('new-driver')}</>} />
        <Route path='/unassignedLoads' route='unassigned-loads' element={<>{authenticatedRoutes('unassigned-loads')}</>} />
        <Route path='/data' route='data' element={<>{authenticatedRoutes('data')}</>} />
        <Route path='/unbookedLoads' route='unbooked-loads' element={<>{authenticatedRoutes('unbooked-loads')}</>} />
        <Route path='/drivers/:driverId' element={<>{authenticatedRoutes('driver')}</>} />
      </Routes>
    </div>
  );
}

export default App;

{/* 
<Route path='/login' element={<Login />} />
        <Route path='/' element={<>
            {authenticatedRoutes('home')}
          </>} />
        <Route path='/newLoad' element={<>{authenticatedRoutes('new-load')}</>} />
        <Route path='/calendar' element={<>{authenticatedRoutes('calendar')}</>} />
        <Route path='/newDriver' route='new-driver' element={<>{authenticatedRoutes('new-driver')}</>} />
        <Route path='/unassignedLoads' route='unassigned-loads' element={<>{authenticatedRoutes('unassigned-loads')}</>} />
        <Route path='/data' route='data' element={<>{authenticatedRoutes('data')}</>} />
        <Route path='/unbookedLoads' route='unbooked-loads' element={<>{authenticatedRoutes('unbooked-loads')}</>} />
        <Route path='/drivers/:driverId' element={<>{authenticatedRoutes('driver')}</>} />
*/}