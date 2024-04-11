import React from 'react';
import { TextField } from '@mui/material';

export default function CustomTextInput({ label, value, onChange, scalable }) {
  if (scalable) {
    return (
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={onChange}
        margin="normal"
        variant="outlined"
        multiline
        minRows={3}
        maxRows={10}
        sx={{ minHeight: '100px' }}
      />
    );
  } else {
    return (
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={onChange}
        margin="normal"
        variant="outlined"
      />
    );
  }
}
