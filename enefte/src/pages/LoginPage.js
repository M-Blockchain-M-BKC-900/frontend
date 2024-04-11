import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const LoginPage = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }}>
      <Box sx={{
        width: '50%',
        height: '100%',
        bgcolor: '#1E292E',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'white', mb: 3 }}>
          Login or Register
        </Typography>
        <Typography sx={{ color: 'white', mb: 2 }}>
          Enter your email address and password manually
        </Typography>
        <Typography sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
          Email Address
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          placeholder="Enter your email address"
          sx={{ mb: 2, input: { color: 'white' }, backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
        <Typography sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
          Password
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          placeholder="Enter your password"
          sx={{ mb: 2, input: { color: 'white' }, backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
        <Button variant="contained" sx={{ mt: 2, bgcolor: 'white', color: '#1E292E' }}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
