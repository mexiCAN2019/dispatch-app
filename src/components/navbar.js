import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  Image } from 'semantic-ui-react';
// Menu, Dropdown,, Icon
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Express from '../fetchExpress';
import ExpressF from '../fetchFeathers';
import { useUser } from './../util/react-local-spa';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const [drivers, setDrivers] = useState([]);
    const [anchorElNav, setAnchorElNav] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(false);
    const [anchorElDrivers, setAnchorElDrivers] = useState(null);
    const [anchorElLoads, setAnchorElLoads] = useState(null);

    const navigate = useNavigate();
    const { logout, user } = useUser();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //         ExpressF.getDriversLanding(token).then(drivers => setDrivers(drivers));
    // }, [user]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        ExpressF.getDrivers(token).then(fetchedDrivers => {
            setDrivers(fetchedDrivers);
        }); 
    }, []);

    const handleOpenNavMenu = (event) => { //SMALL
        setAnchorElNav(true);
      };

    const handleCloseNavMenu = (urlTarget) => { //SMALL
        setAnchorElNav(null);
        navigate(`/${urlTarget}`)
    };

    //USER
    const handleUserMenu = (event) => {
    setAnchorElUser(true);
    };

    const handleUserClose = () => {
    setAnchorElUser(null);
    };

    //DRIVERS
    const handleDriversClick = (event) => {
        setAnchorElDrivers(event.currentTarget);
    };
    const handleDriversClose = (urlTarget) => {
        setAnchorElDrivers(null);
        navigate(`/drivers/${urlTarget}`)
    };

    //LOADS
    const handleLoadsClick = (event) => {
        setAnchorElLoads(event.currentTarget);
    };
    const handleLoadsClose = (urlTarget) => {
        setAnchorElLoads(null);
        navigate(`/${urlTarget}`)
    };
    // const renderDrivers = () => {
    //     if(drivers) return drivers.filter(arrayDriver => arrayDriver.firstName !== "Unassigned").map(driver => {
    //         return (
    //             <Dropdown.Item 
    //                 key={driver.id}
    //                 name={`${driver.firstName}`}
    //                 as={NavLink}
    //                 to={`/drivers/${driver.id}`}
    //                 exact>
    //                     {driver.firstName}
    //             </Dropdown.Item>
    //         );
    //     });
    // };

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(
        <div>
            {/* <Menu>
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
                    </Dropdown> */}
                    {/* <Menu.Item text='forms' as={NavLink} exact to='/forms'>
                        Forms
                    </Menu.Item> */}
                    {/* <Dropdown item text={user ? user.email : 'user'}>
                        <Dropdown.Menu>
                            <Dropdown.Item name='logout' onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu> */}
            <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

        <Image src='/logo192.png' size='tiny' />
          <Typography                                       /* MEDIUM */
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KG Transport
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> {/* EXTRA SMALL */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem key='newLoad' onClick={() => handleCloseNavMenu()} to='/newLoad' as={NavLink}>
                  <Typography textAlign="center">New Load</Typography>
                </MenuItem>
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> {/* EXTRA SMALL */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KG Transport LLC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>  {/* MEDIUM */}
              <Button
                key='new load'
                onClick={() => handleCloseNavMenu('newLoad')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                New Load
              </Button>

              <Button
                    id="demo-positioned-button"
                    aria-controls={Boolean(anchorElDrivers) ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorElDrivers) ? 'true' : undefined}
                    onClick={handleDriversClick}
                    color="inherit"
                >
                    Drivers
                </Button>
                <Menu
                    id="demo-positioned-menu" //
                    aria-labelledby="demo-positioned-button" ////
                    anchorEl={anchorElDrivers} //
                    open={Boolean(anchorElDrivers)} // 
                    onClose={() => setAnchorElDrivers(null)} //
                    anchorOrigin={{ //
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                    transformOrigin={{ //
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                >
                    {drivers ? drivers.map(driver => {
                                if(driver.firstName === 'Unassigned') return;
                                return <MenuItem value={driver.id} onClick={() => handleDriversClose(`${driver.id}`)}>{driver.firstName}</MenuItem>
                            }) : <MenuItem>Loading...</MenuItem>}
                </Menu>

                <Button
                    id="loads-positioned-button"
                    aria-controls={Boolean(anchorElLoads) ? 'loads-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorElLoads) ? 'true' : undefined}
                    onClick={handleLoadsClick}
                    color="inherit"
                >
                    Loads
                </Button>
                <Menu
                    id="loads-positioned-menu" //
                    aria-labelledby="loads-positioned-button" ////
                    anchorEl={anchorElLoads} //
                    open={Boolean(anchorElLoads)} // 
                    onClose={() => setAnchorElLoads(null)} //
                    anchorOrigin={{ //
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                    transformOrigin={{ //
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={() => handleLoadsClose('unassignedLoads')}>Unassigned Loads</MenuItem>
                    <MenuItem onClick={() => handleLoadsClose('calendar')}>Calendar</MenuItem>
                    <MenuItem onClick={() => handleLoadsClose('data')}>Data</MenuItem>
                    <MenuItem onClick={() => handleLoadsClose('unbookedLoads')}>Unbooked Loads</MenuItem>
                </Menu>
            </Box>

            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
              >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleUserClose}
            >
                <MenuItem>{user ? user.email : 'user'}</MenuItem>
                <MenuItem name='logout' onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </Container>
    </AppBar>
        </div>
    )
}

export default Navbar;