import React, { useState, useEffect } from 'react';
import NFTCard from '../components/marketplace/nftCards';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';

const Marketplace = () => {
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
        const url = 'http://127.0.0.1:3000/nft/marketplace';
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

    return (
        <Box sx={{ width: '100%', marginLeft: 'auto', mt: 2 }}>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
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
        </Box>
    );
};

export default Marketplace;
