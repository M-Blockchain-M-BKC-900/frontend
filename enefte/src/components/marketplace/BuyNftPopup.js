import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';

const BuyNftPopup = ({ open, handleClose, nft }) => {
  const [price, setPrice] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleOfferSubmit = () => {
    const url = 'https://87.88.20.110:3000/nft/createBuyOffer';
    const accessToken = sessionStorage.getItem('accessToken');
    const queryParams = new URLSearchParams({
      seed: accessToken,
      wallet_dest: nft.walletId,
      NFT_ID: nft.nftId,
      price: price
    });
    fetch(`${url}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit offer');
      }
      setSuccess(true);
    })
    .catch(error => {
      console.error("Error submiting offer:", error);
      setError(true);
    });
  };
  
  const handleClosePopup = () => {
    setSuccess(false);
    setError(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClosePopup} maxWidth="md" fullWidth>
      <DialogTitle>Make an Offer</DialogTitle>
      <div style={{ padding: '20px' }}>
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          fullWidth
        />
      </div>
      <DialogActions>
        <Button onClick={handleClosePopup}>Cancel</Button>
        <Button onClick={handleOfferSubmit} variant="contained" color="primary">
          Make Offer
        </Button>
      </DialogActions>

      <Dialog open={success} onClose={handleClosePopup}>
        <DialogTitle>Offre has been sent</DialogTitle>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={error} onClose={handleClosePopup}>
        <DialogTitle>Error</DialogTitle>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default BuyNftPopup;
