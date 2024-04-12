import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ShowNftInfo({ open, handleClose, handleBuy, nft }) {

    return (
        <Dialog open={open} onClose={handleClose}   PaperProps={{ sx: { borderRadius: "22px" } }}>
            <DialogTitle variant='subtitle'>{nft.name}</DialogTitle>
            <DialogTitle>Blockchain : {nft.blockchain}</DialogTitle>
            <DialogContent>
                <img src={nft.image} alt={nft.name} style={{ width: '100%', height: 'auto' }} />
                <Typography marginTop={'10px'}>{nft.description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button variant="contained" color="primary" onClick={() => handleBuy(nft.id)}>Acheter</Button>
            </DialogActions>
        </Dialog>
    );
}
