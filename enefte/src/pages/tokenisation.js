import React, { useState } from 'react';
import { Card, Button, Box, Typography } from '@mui/material';
import ImageUpload from '../components/uploadImage';
import CustomTextInput from '../components/customTextInput';

function Tokenisation() {
    const [image, setImage] = useState(null);
    const [tokenName, setTokenName] = useState('');
    const [blockchainName, setBlockchainName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTokenNameChange = (event) => {
        setTokenName(event.target.value);
    };

    const handleBlockchainNameChange = (event) => {
        setBlockchainName(event.target.value);
    };

    const handleConfirm = () => {
        console.log('Confirming NFT creation with:', { image, tokenName, blockchainName });
    };

    const handleCancel = () => {
        if (imagePreview !== null) {
            setImage(null);
            setImagePreview(null)
        }
        setTokenName('');
        setBlockchainName('');
    };

    return (
        <Box sx={{ backgroundColor: 'grey.50', width: '90%', marginLeft: 'auto' }}>
            <Card sx={{ p: 3, width: '20%', margin: 'auto' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Create your own NFT
                </Typography>
                <ImageUpload onImageChange={handleImageChange} imagePreview={imagePreview} />
                <CustomTextInput label="Token name" value={tokenName} onChange={handleTokenNameChange} />
                <CustomTextInput label="Blockchain name" value={blockchainName} onChange={handleBlockchainNameChange} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="outlined" onClick={handleCancel} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

export default Tokenisation;
