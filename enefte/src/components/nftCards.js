import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  maxWidth: 345,
});

const NFTCard = ({ nft }) => {
  const handleBuy = () => {
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        image={nft.image}
        alt={`NFT ${nft.name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nft.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {nft.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleBuy}>Acheter pour {nft.price} ETH</Button>
      </CardActions>
    </StyledCard>
  );
};

export default NFTCard;
