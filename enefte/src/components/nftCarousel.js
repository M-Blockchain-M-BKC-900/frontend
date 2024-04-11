import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const NftCarousel = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    setNfts([
      { id: 82267, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', blockchain: 'testnet xrpl', date: '10/10/2024', description: "" },
      { id: 26334, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', blockchain: 'testnet xrpl', date: '10/10/2024', description: "" },
      { id: 2743, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', blockchain: 'testnet xrpl', date: '10/10/2024', description: "" },
      { id: 1092, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', blockchain: 'testnet xrpl', date: '10/10/2024', description: "" },
      { id: 26314, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', blockchain: 'testnet xrpl', date: '10/10/2024', description: "" },
      { id: 2733, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', blockchain: 'testnet xrpl', date: '10/10/2024', description: "" },
      { id: 10132, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', blockchain: 'testnet xrpl', date: '10/10/2024', description: "" }
    ]);
  }, []); 

  const handleExchange = (id) => {
    console.log(`You exchanged your nft: ${id}`);
  };

  return (
    <Carousel>
      {nfts.map((nft, index) => (
        <Paper key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {nft.name}
          </Typography>
          <img src={nft.image} alt={`NFT ${nft.name}`} style={{ width: '100%', height: 'auto' }} />
          <Button variant="contained" color="primary" onClick={() => handleExchange(nft.id)}>
            Exchange
          </Button>
        </Paper>
      ))}
    </Carousel>
  );
};

export default function BuyNftPopup({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Exchange an NFT</DialogTitle>
      <DialogContent>
        <NftCarousel />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

