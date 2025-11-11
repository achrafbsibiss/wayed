'use client';

import { Box, Container, Typography, Button } from '@mui/material';

export default function Error({ error, reset }) {
  return (
    <Container>
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography variant="h2" sx={{ mb: 2 }}>
          Something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
          We're sorry, but something unexpected happened. Please try again.
        </Typography>
        <Button
          variant="contained"
          onClick={() => reset()}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '50px',
          }}
        >
          Try again
        </Button>
      </Box>
    </Container>
  );
}