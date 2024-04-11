import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const LoginPage = () => {
  const [walletID, setWalletID] = useState('');
  const [newWalletID, setNewWalletID] = useState('');

  // Simuler la création d'un wallet
  const handleCreateWallet = () => {
    // Simuler un ID de wallet généré
    const generatedWalletID = 'xrp1234567890';
    setNewWalletID(generatedWalletID);
  };

  // Fonction pour copier l'ID du Wallet dans le presse-papiers
  const handleCopyToClipboard = () => {
    if (newWalletID) {
      navigator.clipboard.writeText(newWalletID).then(() => {
        alert('Wallet ID copied to clipboard!'); // Notification de la copie réussie
      }, (err) => {
        console.error('Could not copy text: ', err); // Gérer les erreurs de copie
      });
    }
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
          value={walletID}
          onChange={(e) => setWalletID(e.target.value)}
          placeholder="Enter your Wallet ID"
          sx={{ mb: 2, input: { color: 'white' }, backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
        <Button variant="contained" sx={{ 
            mt: 2, 
            bgcolor: 
            'white', 
            color: '#1E292E' , 
            ':hover': {
                backgroundColor: 'grey.300'
            }}}>
            Connect
        </Button>
        <Button onClick={handleCreateWallet} variant="contained" sx={{
            mt: 2, 
            bgcolor: 'white', 
            color: '#1E292E', 
            marginTop: '10px', 
            ':hover': {
                backgroundColor: 'grey.300'
            }}}>
            Create Wallet
        </Button>
        {newWalletID && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', mt: 2 }}>
                <Typography sx={{ mr: 1 }}>
                New Wallet ID: {newWalletID}
                </Typography>
                <Button onClick={handleCopyToClipboard} sx={{ 
                    minWidth: '10px', 
                    padding: '4px', 
                    bgcolor: 'white', 
                    color: '#1E292E', 
                    ':hover': {
                        backgroundColor: 'grey.300'
                }}}>
                    <ContentCopyIcon fontSize="small" />
                </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
