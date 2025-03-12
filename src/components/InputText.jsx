import React, { useState } from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';

    const InputText = ({ amount, onAmountChange }) => {
        const [error, setError] = useState(false);
        const [helperText, setHelperText] = useState('');
      
        const handleChange = (e) => {
            const value = e.target.value;
            onAmountChange(value);
      
            const angka = parseFloat(value);
            if (isNaN(angka) || value === '') {
              setError(true);
              setHelperText('Isi angka yang valid');
            } else {
              setError(false);
              setHelperText('');
              onAmountChange(angka);
            }
          };
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div className='w-screen mb-5'>
        <FormControl fullWidth sx={{ m: 1 }} error={error}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={amount}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
          {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </div>
    </Box>
  );
}

export default InputText;