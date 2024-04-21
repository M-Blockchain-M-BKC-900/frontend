import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ShowNftInfo({ open, handleClose, handleBuy, nft }) {

    return (
        <Dialog open={open} onClose={handleClose}   PaperProps={{ sx: { borderRadius: "22px" } }}>
            <DialogTitle variant='subtitle'>{nft.title}</DialogTitle>
            <DialogContent>
                <img src={nft.url} alt={nft.title} style={{ width: '100%', height: 'auto' }} />
                <Typography marginTop={'10px'}>{nft.description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={() => handleBuy(nft.nftId)}>Make an offer</Button>
            </DialogActions>
        </Dialog>
    );
}
