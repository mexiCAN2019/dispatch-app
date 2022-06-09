import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, MenuItem } from '@mui/material';
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

    const navigate = useNavigate();
    const { logout, user } = useUser();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(user){
            // setTimeout(() => {
                ExpressF.getDriversLanding(token).then(drivers => setDrivers(drivers));
            // }, 1000); 
        }
    }, [user]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(true);
      };
      const handleMenu = (event) => {
        setAnchorElUser(true);
      };
    
      const handleCloseNavMenu = (urlTarget) => {
        setAnchorElNav(null);
        navigate(`/${urlTarget}`)
      };
    
      const handleClose = () => {
        setAnchorElUser(null);
      };

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
                key='new load'
                onClick={() => handleCloseNavMenu('newLoad')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Drivers
              </Button>
              <Button
                key='new load'
                onClick={() => handleCloseNavMenu('newLoad')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Loads
              </Button>
          </Box>

          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
        </Toolbar>
      </Container>
    </AppBar>
        </div>
    )
}

export default Navbar;