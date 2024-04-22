import React, { useState } from 'react';
import { Card, Button, Box, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CustomTextInput from '../components/customTextInput';

function Tokenisation() {
    const [tokenName, setTokenName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tokenDescription, setTokenDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);

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
        setLoading(true);
        const url = 'https://87.88.20.110:3000/nft/create';
        const accessToken = sessionStorage.getItem('accessToken');
        const formData = new URLSearchParams();
        formData.append('seed', accessToken);
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
            if (response.ok) {
                setSuccessDialogOpen(true);
                setImagePreview(null);
                setTokenName('');
                setTokenDescription('');
                console.log("Token creation success")
            } else {
                setErrorDialogOpen(true);
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorDialogOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (imagePreview !== null) {
            setImagePreview(null)
        }
        setLoading(false);
        setTokenName('');
        setImageUrl('');
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
    };

    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ p: 3, width: '20%' }}>
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
                    <Button variant="contained" onClick={handleConfirm} disabled={!tokenName || !imageUrl || !tokenDescription || loading}>
                        {loading ? <CircularProgress size={24} /> : 'Confirm'}
                    </Button>
                </Box>
            </Card>
            <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
                <DialogTitle>NFT Created</DialogTitle>
                <DialogContent>
                    <Typography>
                        NFT created successfully!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>
                        Failed to create NFT. Please try again later.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Tokenisation;
