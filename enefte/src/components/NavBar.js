import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TokenIcon from '@mui/icons-material/AccountBalanceWallet';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('accessToken');

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <Box sx={{
      width: { xs: '200px', sm: '200px' },
      height: '100vh',
      bgcolor: '#1E292E',
      color: 'white',
      boxShadow: '2px 0px 5px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '20px 0',
    }}>
      <img src={logo} alt="Logo" style={{ marginBottom: '20px', height: '50px' }} />
      <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
        <Button
          startIcon={<HomeIcon sx={{ color: '#1E292E' }} />}
          variant="contained"
          component={Link}
          to="/marketplace"
          sx={{
            backgroundColor: isLoggedIn ? 'white' : 'grey',
            color: '#1E292E',
            borderRadius: 0,
            width: '100%',
            ':hover': {
              backgroundColor: isLoggedIn ? 'grey.300' : 'grey'
            }
          }}
        >
          Home
        </Button>
        <Button
          startIcon={<TokenIcon sx={{ color: '#1E292E' }} />}
          variant="contained"
          component={Link}
          to="/token"
          sx={{
            backgroundColor: isLoggedIn ? 'white' : 'grey',
            color: '#1E292E',
            borderRadius: 0,
            width: '100%',
            ':hover': {
              backgroundColor: isLoggedIn ? 'grey.300' : 'grey'
            }
          }}
        >
          Token
        </Button>
        {isLoggedIn ? (
          <Button
            startIcon={<LogoutIcon sx={{ color: 'white' }} />}
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: '#cc0202',
              color: 'white',
              borderRadius: 0,
              width: '100%',
              ':hover': {
                backgroundColor: '#990202'
              }
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            startIcon={<LoginIcon sx={{ color: '#1E292E'}} />}
            variant="contained"
            component={Link}
            to="/login"
            sx={{
              backgroundColor: 'white',
              color: '#1E292E',
              borderRadius: 0,
              width: '100%',
              ':hover': {
                backgroundColor: 'grey.300'
              }
            }}
          >
            Login
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default NavBar;
