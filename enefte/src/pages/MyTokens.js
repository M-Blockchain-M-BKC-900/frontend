import React, { useState, useEffect } from 'react';
import NFTCard from '../components/nftCards';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';

const MyTokens = () => {
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        const url = 'http://localhost:3000/nft/findAll';
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
        <Box sx={{ width: '100%', padding: 3 }}>
            {isLoading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Grid container spacing={2}>
                    {nfts.map(nft => (
                        <Grid item key={nft.NFT_ID} xs={12} sm={6} md={3}>
                            <NFTCard nft={nft.metadata} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MyTokens;
