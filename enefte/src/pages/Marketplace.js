import React, { useState, useEffect } from 'react';
import NFTCard from '../components/marketplace/nftCards';
import { Grid, Box, CircularProgress, Typography, Button, Modal, TextField, DialogActions } from '@mui/material';
import { createOffer } from '../api';

const Marketplace = () => {
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [openOfferPopup, setOpenOfferPopup] = useState(false);
    const [walletId, setWalletId] = useState('');
    const [nftId, setNftId] = useState('');
    const [price, setPrice] = useState('');

    function concatNfts(nftsData) {
        let concatenatedNfts = [];
        nftsData.forEach(walletData => {
            walletData.nfts.forEach(nft => {
                let concatenatedNft = {
                    walletSeed: walletData.seed,
                    walletId: walletData.wallet,
                    nftId: nft.NFT_ID,
                    title: nft.metadata.title,
                    description: nft.metadata.description,
                    url: nft.metadata.url
                };
                concatenatedNfts.push(concatenatedNft);
            });
        });
        return concatenatedNfts;
    }

    useEffect(() => {
        setIsLoading(true);
        const url = 'https://87.88.20.110:3000/nft/marketplace';
        const accessToken = sessionStorage.getItem('accessToken');
        const headers = new Headers({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        fetch(url, { method: 'GET', headers })
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    setNfts(concatNfts(data));
                } else {
                    setError('No NFTs available at the moment.');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching NFTs:', error);
                setError('Failed to load NFTs.');
                setIsLoading(false);
            });
    }, []);

    const handleOpenOfferPopup = () => {
        setOpenOfferPopup(true);
    };

    const handleCloseOfferPopup = () => {
        setOpenOfferPopup(false);
    };

    const handleConfirmOffer = async () => {
        try {
            const response = await createOffer(walletId, nftId, price);
            if (response.ok) {
                console.log('Offer successfully created!');
            } else {
                console.error('Failed to create offer');
            }
        } catch (error) {
            console.error('Error creating offer:', error);
        } finally {

            setWalletId('');
            setNftId('');
            setPrice('');
            setOpenOfferPopup(false);
        }
    };

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" onClick={handleOpenOfferPopup} sx={{ mb: 2 }}>Make Offer</Button>

            {isLoading ? (
                <CircularProgress />
            ) : error ? (
                <Typography variant="h6" textAlign="center">{error}</Typography>
            ) : (
                <Grid container spacing={5} margin={'auto'} width={'90%'}>
                    {nfts.length > 0 ? nfts.map(nft => (
                        <Grid item key={nft.nftId} xs={12} sm={6} md={3}>
                            <NFTCard nft={nft} />
                        </Grid>
                    )) : (
                        <Typography variant="h6" textAlign="center">
                            No NFTs available at the moment.
                        </Typography>
                    )}
                </Grid>
            )}

            <Modal open={openOfferPopup} onClose={handleCloseOfferPopup} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: 300, bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Make Offer</Typography>
                    <TextField
                        label="Wallet ID"
                        value={walletId}
                        onChange={(e) => setWalletId(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="NFT ID"
                        value={nftId}
                        onChange={(e) => setNftId(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <DialogActions>
                        <Button onClick={handleCloseOfferPopup}>Cancel</Button>
                        <Button onClick={handleConfirmOffer} variant="contained" color="primary">Confirm</Button>
                    </DialogActions>
                </Box>
            </Modal>
        </Box>
    );
};

export default Marketplace;
