import React, { useState, useEffect } from 'react';
import NFTCard from '../components/nftCards';
import { Grid, Box } from '@mui/material';

const Marketplace = () => {
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            // const response = await fetch('URL_DE_VOTRE_API');
            // const data = await response.json();
            // setNfts(data);
            setNfts([
                { id: 8267, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', date: '10/10/2024', price: 56 },
                { id: 2634, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', date: '10/10/2024', price: 56 },
                { id: 273, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', date: '10/10/2024', price: 56 },
                { id: 10192, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', date: '10/10/2024', price: 56 },
                { id: 2634, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', date: '10/10/2024', price: 56 },
                { id: 273, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', date: '10/10/2024', price: 56 },
                { id: 10192, image: 'https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2022-06/Collage%20sans%20titre%20%2814%29_5.jpg', name: 'Bored Ape Yacht Club #8911', date: '10/10/2024', price: 56 }
            ]);
        };

        fetchNFTs();
    }, []);

    return (
        <Box sx={{ width: '100%', marginLeft: 'auto'}}>
            <Grid container spacing={5} margin={'auto'} width={'90%'}>
                {nfts.map(nft => (
                    <Grid item key={nft.id} xs={12} sm={6} md={3}>
                        <NFTCard nft={nft} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Marketplace;
