import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import { login, createWallet } from '../api';
import { copyToClipboard } from '../components/utils';

const LoginPage = () => {
  const [walletID, setWalletID] = useState('');
  const [newWalletID, setNewWalletID] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [openSnackbarTimeout, setOpenSnackbarTimeout] = useState(false);
  const [openSnackbarCopied, setOpenSnackbarCopied] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(walletID);
      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem('accessToken', data.access_token);
        console.log('Login successful:', data);
        navigate('/marketplace');
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleCreateWallet = async () => {
    setIsButtonDisabled(true);
    setOpenSnackbarTimeout(true);
  
    try {
      const response = await createWallet();
      const data = await response.json();
      console.log(data);
      setNewWalletID(data.seed);
    } catch (error) {
      console.error('Failed to create wallet:', error);
    }
  
    setTimeout(() => {
      setIsButtonDisabled(false);
      setOpenSnackbarTimeout(false);
    }, 60000);
  };
  

  const handleCopyToClipboard = async () => {
    if (newWalletID) {
      const success = await copyToClipboard(newWalletID);
      setOpenSnackbarCopied(success);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbarTimeout(false);
    setOpenSnackbarCopied(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
    }}>
      <Box sx={{
        width: '50%',
        height: '50%',
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
          Enter your Wallet ID
        </Typography>
        <TextField
            variant="filled"
            fullWidth
            type="password"
            value={walletID}
            onChange={(e) => setWalletID(e.target.value)}
            placeholder="Enter your Wallet ID"
            sx={{
                mb: 2,
                input: {
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '10px 14px',
                    fontSize: '1.25rem',
                }
            }}
        />
        <Button onClick={handleLogin} variant="contained" sx={{ mt: 2, bgcolor: 'white', color: '#1E292E', ':hover': { backgroundColor: 'grey.300' }}}>
          Connect
        </Button>
        <Button onClick={handleCreateWallet} disabled={isButtonDisabled} variant="contained" sx={{ mt: 2, bgcolor: 'white', color: '#1E292E', marginTop: '10px', ':hover': { backgroundColor: 'grey.300' }}}>
          Create Wallet
        </Button>
        <Snackbar open={openSnackbarTimeout} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
            Please wait for 60 seconds before creating a new wallet.
          </Alert>
        </Snackbar>
        <Snackbar open={openSnackbarCopied} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                Seed copied to clipboard!
            </Alert>
        </Snackbar>
        {newWalletID && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', mt: 2 }}>
                <Typography sx={{ color: 'white', marginRight: '10px' }}>
                Copy your Seed
                </Typography>
                <Button onClick={handleCopyToClipboard} sx={{ minWidth: '10px', padding: '4px', bgcolor: 'white', color: '#1E292E', ':hover': { backgroundColor: 'grey.300' }}}>
                <ContentCopyIcon fontSize="small" />
                </Button>
            </Box>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
