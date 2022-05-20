import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import Express from '../fetchExpress';
import ExpressF from '../fetchFeathers';
import { useUser } from './../util/react-local-spa';

function Navbar(props) {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(user){
            setTimeout(() => {
                ExpressF.getDriversLanding(token).then(drivers => setDrivers(drivers));
            }, 1000); 
        }
    }, []);

    const navigate = useNavigate();
    const { logout, user } = useUser();

    const renderDrivers = () => {
        if(drivers) return drivers.filter(arrayDriver => arrayDriver.firstName !== "Unassigned").map(driver => {
            return (
                <Dropdown.Item 
                    key={driver.id}
                    name={`${driver.firstName}`}
                    as={NavLink}
                    to={`/drivers/${driver.id}`}
                    exact>
                        {driver.firstName}
                </Dropdown.Item>
            );
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(
        <div>
            <Menu>
                <Menu.Item name='home' as={NavLink} exact to='/'>
                    <Image src='/logo192.png' size='tiny' />
                    KG Transport
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item text='Strings' name='plus' as={NavLink} exact to='/newLoad'>
                        <Icon name='plus' />
                        New Load
                    </Menu.Item>
                    <Dropdown item text='Drivers'>
                        <Dropdown.Menu>
                            {renderDrivers()}
                            <Dropdown.Item to='/newDriver' name='new driver' as={NavLink} exact >+ Add New Driver</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text='Loads'>
                        <Dropdown.Menu>
                            <Dropdown.Item to='/unassignedLoads' name='unassigned loads' as={NavLink} exact >Unassigned Loads</Dropdown.Item>
                            <Dropdown.Item to='/calendar' name='calendar and data' as={NavLink} exact >Calendar</Dropdown.Item>
                            <Dropdown.Item to='/data' name='calendar and data' as={NavLink} exact >Data</Dropdown.Item>
                            <Dropdown.Item to='/unbookedLoads' name='calendar and data' as={NavLink} exact >Unbooked Loads</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item text='forms' as={NavLink} exact to='/forms'>
                        Forms
                    </Menu.Item>
                    <Dropdown item text={user ? user.email : 'user'}>
                        <Dropdown.Menu>
                            <Dropdown.Item name='logout' onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default Navbar;