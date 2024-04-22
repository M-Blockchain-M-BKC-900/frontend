import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography, Grid, Box, Modal, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  maxWidth: 450,
  borderRadius: '12px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform .5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  }
});

const StyledCardContent = styled(CardContent)({
  paddingBottom: '16px',
});


const NFTCard = ({ nft, offer }) => {
  const [hover, setHover] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const AcceptOffer = () => {
    const url = 'https://87.88.20.110:3000/nft/acceptBuyOffer';
    const accessToken = sessionStorage.getItem('accessToken');
    const queryParams = new URLSearchParams({
      NFT_OFFER: offer[0].nft_offer_index
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
        throw new Error('Failed to accept offer');
      }
      handleClosePopup()
    })
    .catch(error => {
      console.error("Error accepting offer:", error);
    });
  }

  const RejectOffer = () => {
    handleClosePopup()
  }

  const isString = typeof offer === 'string';

  return (
    <div>
      <StyledCard
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CardMedia
          component="img"
          image={nft.url}
          alt={`NFT ${nft.title}`}
          sx={{ height: 200 }}
        />
        <CardContent>
          <Typography variant="h6" color="text.primary" fontWeight='bold'>
            {nft.title}
          </Typography>
          <Grid container justifyContent="space-between" marginTop={2}>
          </Grid>
        </CardContent>
        <StyledCardContent></StyledCardContent>
        {!isString && (
          <Button
            variant='contained'
            size="large"
            onClick={handleOpenPopup}
            style={{ borderRadius: '0 0 12px 12px', height: '35px' }}
            fullWidth>
            See Offer Information
          </Button>
        )}
      </StyledCard>
      <Modal open={openPopup} onClose={handleClosePopup}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Offer Information
          </Typography>
          <TextField
            label="Amount"
            value={offer[0].amount + ' XRP'}
            disabled
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" onClick={RejectOffer} style={{ marginRight: '8px' }}>Refuse</Button>
          <Button variant="contained" color="primary" onClick={AcceptOffer}>Accept</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NFTCard;
