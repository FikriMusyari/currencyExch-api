import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingButton({ onClick, loading }) {
  return (
    <div className='flex justify-center items-center'>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button
          size="large"
          onClick={onClick}  
          endIcon={!loading && <CurrencyExchangeIcon />}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#1976d2', 
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            '&.Mui-disabled': {
              backgroundColor: '#1976d2', 
              color: 'white', 
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Convert'
          )}
        </Button>
      </Box>
    </div>
  );
}
