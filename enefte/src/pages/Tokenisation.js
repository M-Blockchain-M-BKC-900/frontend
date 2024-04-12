import React, { useState } from 'react';
import { Card, Button, Box, Typography } from '@mui/material';
import ImageUpload from '../components/uploadImage';
import CustomTextInput from '../components/customTextInput';

function Tokenisation() {
    const [image, setImage] = useState(null);
    const [tokenName, setTokenName] = useState('');
    const [blockchainName, setBlockchainName] = useState('');
    const [tokenDescription, setTokenDescription] = useState('');
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

    const handleTokenDescription = (event) => {
        setTokenDescription(event.target.value);
    };

    const handleBlockchainNameChange = (event) => {
        setBlockchainName(event.target.value);
        fetchImageFromLink(event.target.value);
    };

    const fetchImageFromLink = (link) => {
        fetch(link)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                setImagePreview(null);
            });
    };

    const handleConfirm = async () => {
        const url = 'http://localhost:3000/nft';
        const accessToken = sessionStorage.getItem('accessToken');
        const formData = new URLSearchParams();
        formData.append('token', accessToken);
        formData.append('title', tokenName)
        formData.append('text', tokenDescription)
        formData.append('picture', String(blockchainName))
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });
            const data = await response.json();
            console.log(response)
            if (response.ok) {
                console.log("coucou les loulous")
            } else {
                throw new Error('Fail sending request');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
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
        <Box sx={{ width: '100%', marginLeft: 'auto' }}>
            <Card sx={{ p: 3, width: '20%', margin: 'auto' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Create your own NFT
                </Typography>
                <ImageUpload onImageChange={handleImageChange} imagePreview={imagePreview} />
                <CustomTextInput label="Token name" value={tokenName} onChange={handleTokenNameChange} />
                <CustomTextInput label="Blockchain name" value={blockchainName} onChange={handleBlockchainNameChange} />
                <CustomTextInput label="Description" value={tokenDescription} onChange={handleTokenDescription} scalable={true} />
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
