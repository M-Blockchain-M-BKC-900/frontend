import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShowNftInfo from './ShowNftInfo';
import BuyNftPopup from './BuyNftPopup';
import { wait } from '@testing-library/user-event/dist/utils';

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

const StyledCardActions = styled(CardActions)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  justifyContent: 'center',
  padding: 0,
  transition: 'opacity 0.3s ease-in-out',
});

const NFTCard = ({ nft }) => {
  const [hover, setHover] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openOfferPopup, setOpenOfferPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleOpenOfferPopup = () => {
    setOpenOfferPopup(true);
  };

  const handleCloseOfferPopup = () => {
    setOpenOfferPopup(false);
  };

  const handleBuy = (product) => {
    handleClosePopup();
    setTimeout(() => {
      handleOpenOfferPopup();
    }, 1000);
  };

  return (
    <StyledCard
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardMedia
        component="img"
        image={nft.url}
        alt={`NFT ${nft.title}`}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary" fontWeight='bold'>
          {nft.title}
        </Typography>
        <Grid container justifyContent="space-between" marginTop={2}>
        </Grid>
      </CardContent>
      <StyledCardContent></StyledCardContent>
      <ShowNftInfo open={openPopup} handleClose={handleClosePopup} handleBuy={handleBuy} nft={nft} />
      <BuyNftPopup open={openOfferPopup} handleClose={handleCloseOfferPopup} nft={nft} />
      <StyledCardActions style={{ opacity: hover ? 1 : 0 }}>
        <Button
          variant='contained'
          size="large"
          onClick={handleOpenPopup}
          style={{ borderRadius: '0 0 12px 12px', height: '35px' }}
          fullWidth>
          See more
        </Button>
      </StyledCardActions>
    </StyledCard>
  );
};

export default NFTCard;
