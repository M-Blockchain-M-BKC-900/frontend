import React, { useState } from 'react';
import { Card, Button, Box, Typography } from '@mui/material';
import CustomTextInput from '../components/customTextInput';

function Tokenisation() {
    const [tokenName, setTokenName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tokenDescription, setTokenDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const handleTokenNameChange = (event) => {
        setTokenName(event.target.value);
    };

    const handleTokenDescription = (event) => {
        setTokenDescription(event.target.value);
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
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
        formData.append('picture', String(imageUrl))
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
            setImagePreview(null)
        }
        setTokenName('');
        setImageUrl('');
    };

    return (
        <Box sx={{ width: '100%', marginLeft: 'auto' }}>
            <Card sx={{ p: 3, width: '20%', margin: 'auto' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Create your own NFT
                </Typography>
                {imagePreview && (
                    <Box sx={{ textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px', p: 1 }}>
                        <img src={imagePreview} alt="" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </Box>
                )}
                <CustomTextInput label="Token name" value={tokenName} onChange={handleTokenNameChange} />
                <CustomTextInput label="Image URL" value={imageUrl} onChange={handleImageUrlChange} />
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