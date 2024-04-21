import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';

const BuyNftPopup = ({ open, handleClose, nft }) => {
  const [price, setPrice] = useState('');

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleOfferSubmit = () => {
    const url = 'http://127.0.0.1:3000/nft/createBuyOffer';
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
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to submit offer');
      }
      handleClose()
    })
    .catch(error => {
      console.error("Error submiting offer:", error);
    });
  };
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOfferSubmit} variant="contained" color="primary">
          Make Offer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyNftPopup;
