import React, { useState, useEffect } from 'react';
import NFTCard from '../components/myTokens/nftCards';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';

const MyTokens = () => {
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        const url = 'https://87.88.20.110:3000/nft/findAllOffers';
        const accessToken = sessionStorage.getItem('accessToken');
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                console.log("Data received:", data);
                setNfts(data);
            } else {
                setError("No tokens available at the moment.");
            }
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching tokens:", error);
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
            {isLoading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Grid container spacing={2}>
                    {nfts.map(nft => (
                        <Grid item key={nft.NFT_ID} xs={12} sm={6} md={3}>
                            <NFTCard nft={nft.NFT_ID.metadata} offer={nft.offer} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MyTokens;