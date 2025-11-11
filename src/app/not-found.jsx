'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
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
        <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 700, mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '50px',
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}
