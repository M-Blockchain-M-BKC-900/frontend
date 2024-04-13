import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';

const BuyNftPopup = ({ open, handleClose }) => {
  const [price, setPrice] = useState('');

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleOfferSubmit = () => {
    const url = 'http://87.88.20.110:3000/nft/createBuyOffer';
    const accessToken = sessionStorage.getItem('accessToken');
    const formData = new URLSearchParams();
    formData.append('seed', accessToken);
    formData.append('wallet_dest', "")
    formData.append('NFT_ID', "")
    formData.append('price', String(price))
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          console.log("Data received:", data);
        } else {
          console.log("No tokens available at the moment.");
        }
      })
      .catch(error => {
        console.error("Error fetching tokens:", error);
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
