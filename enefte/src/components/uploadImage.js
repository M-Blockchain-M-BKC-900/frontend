import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ImageUpload({ onImageChange, imagePreview }) {
  return (
    <Box
      border={1}
      borderColor="grey.400"
      borderRadius={2}
      p={2}
      textAlign="center"
      sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Preview"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      ) : (
        <>
          <Typography variant="body1">
            Drag and drop or{' '}
            <label htmlFor="image-upload" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
              click here
            </label>
            {' '}to upload your image
          </Typography>
          <input
            type="file"
            onChange={onImageChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
        </>
      )}
    </Box>
  );
}
