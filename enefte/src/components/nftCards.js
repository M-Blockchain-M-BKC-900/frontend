import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography, Grid, Box } from '@mui/material';
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

  const handleBuy = () => {
    // Logique pour gérer l'achat
  };

  return (
    <StyledCard 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <CardMedia
        component="img"
        image={nft.image}
        alt={`NFT ${nft.name}`}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary" fontWeight='bold'>
          {nft.name}
        </Typography>
        <Grid container justifyContent="space-between" marginTop={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Date
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight='bold'>
              {nft.date}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Price
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight='bold'>
              {nft.price} ETH
            </Typography>
          </Box>
        </Grid>
      </CardContent>
      <StyledCardContent></StyledCardContent>
      <StyledCardActions style={{ opacity: hover ? 1 : 0 }}>
        <Button 
          variant='contained' 
          size="large" 
          onClick={handleBuy} 
          style={{ borderRadius: '0 0 12px 12px', height: '35px' }}
          fullWidth>
          Buy
        </Button>
      </StyledCardActions>
    </StyledCard>
  );
};

export default NFTCard;
