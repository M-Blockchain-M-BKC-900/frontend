import React from 'react';
import { TextField } from '@mui/material';

export default function CustomTextInput({ label, value, onChange }) {
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
