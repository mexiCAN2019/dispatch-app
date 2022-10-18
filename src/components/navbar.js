import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, MenuItem, Menu, Dialog, DialogTitle, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpressF from '../fetchFeathers';
import { useUser } from './../util/react-local-spa';


function Navbar() {
    const [drivers, setDrivers] = useState([]);
    const [anchorElNav, setAnchorElNav] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(false);
    const [anchorElDrivers, setAnchorElDrivers] = useState(null);
    const [anchorElLoads, setAnchorElLoads] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    const navigate = useNavigate();
    const { logout, user } = useUser();

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
    const handleCloseDriversNav = (urlTarget) => {
        setAnchorElNav(null);
        setEditOpen(false);
        navigate(`/drivers/${urlTarget}`)
    }

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

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(
        <div>
            <Dialog onClose={() => setEditOpen(false)} open={editOpen} fullWidth={true} maxWidth="md">
                <DialogTitle>Drivers</DialogTitle>
                <Container>
                    <Stack spacing={2}>
                        {drivers ? drivers.map(driver => {
                            if(driver.firstName === 'Unassigned') return null;
                            return <Button key={driver.id} onClick={() => handleCloseDriversNav(driver.id)}>{driver.firstName}</Button>
                        }) : <Button>Loading...</Button>}
                    </Stack>
                </Container>
            </Dialog>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        <Typography                                       /* MEDIUM - KG Transport */
                            variant="h6"
                            noWrap
                            // component="a"
                            onClick={() => handleCloseNavMenu('')}
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                height: 90,
                                width: 150
                                // maxHeight: { xs: 233, md: 167 },
                                // maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="KG Logo"
                                src="/kg-logo.png"
                            />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> {/* EXTRA SMALL - NAV ICON DROPDOWN */}
                            <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="nav-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                            id="nav-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                                <MenuItem key='1' onClick={() => setEditOpen(true)}>Drivers</MenuItem>
                                <MenuItem key='2' onClick={() => handleCloseNavMenu('newLoad')}>New Load</MenuItem>
                                <MenuItem key='3' onClick={() => handleCloseNavMenu('unassignedLoads')}>Unassigned Loads</MenuItem>
                                <MenuItem key='4' onClick={() => handleCloseNavMenu('calendar')}>Calendar</MenuItem>
                                <MenuItem key='5' onClick={() => handleCloseNavMenu('data')}>Data</MenuItem>
                                <MenuItem key='6' onClick={() => handleCloseNavMenu('unbookedLoads')}>Unbooked Loads</MenuItem>
                            </Menu>
                        </Box>
                                        
                        <Typography         /* EXTRA SMALL - KG TRANSPORT LLC */
                            variant="h5"
                            noWrap
                            // component="a"
                            onClick={() => handleCloseNavMenu('')}
                            sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            cursor: 'pointer'
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                height: 90,
                                width: 150
                                // maxHeight: { xs: 233, md: 167 },
                                // maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="KG Logo"
                                src="/kg-logo.png"
                            />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>  {/* MEDIUM - NEW LOAD */}
                            <Button
                                key='new load'
                                onClick={() => handleCloseNavMenu('newLoad')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                New Load
                            </Button>

                            <Button                                                     /* MEDIUM - DRIVERS DROPDOWN */
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
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorElDrivers} //
                                open={Boolean(anchorElDrivers)}
                                onClose={() => setAnchorElDrivers(null)}
                                anchorOrigin={{ 
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                                transformOrigin={{ 
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                            >
                                {drivers ? drivers.map(driver => {
                                            if(driver.firstName === 'Unassigned') return null;
                                            return <MenuItem key={driver.id} value={driver.id} onClick={() => handleDriversClose(`${driver.id}`)}>{driver.firstName}</MenuItem>
                                        }) : <MenuItem>Loading...</MenuItem>}
                            </Menu>

                            <Button                                         /* MEDIUM - LOADS DROPDOWN */
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

                        <IconButton                             /* MEDIUM/XS - USER DROPDOWN */
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