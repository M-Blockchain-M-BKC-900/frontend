import React, { useState, useEffect } from 'react';
import NFTCard from '../components/nftCards';
import { Grid, Box } from '@mui/material';

const Marketplace = () => {
    const [nfts, setNfts] = useState([]);

    function concatNfts(nftsData) {
        let concatenatedNfts = [];
    
        nftsData.forEach(walletData => {
            walletData.nfts.forEach(nft => {
                let concatenatedNft = {
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

        const fetchNFTs = async () => {
            const url = 'http://87.88.20.110:3000/nft/marketplace';
            const accessToken = sessionStorage.getItem('accessToken');
            const formData = new URLSearchParams();
            formData.append('token', accessToken);
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    const tmp = concatNfts(data);
                    setNfts(tmp)
                } else {
                    throw new Error('Fail sending request');
                }
            } catch (error) {
                console.error('Login error:', error);
            }
        }
        fetchNFTs();
    }, []);

    return (
        <Box sx={{ width: '100%', marginLeft: 'auto' }}>
            <Grid container spacing={5} margin={'auto'} width={'90%'}>
                {nfts.map(nft => (
                    <Grid item key={nft.nftId} xs={12} sm={6} md={3}>
                        <NFTCard nft={nft} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Marketplace;
