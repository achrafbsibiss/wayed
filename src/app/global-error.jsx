'use client';

import { Box, Typography, Button } from '@mui/material';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography variant="h2" sx={{ mb: 2 }}>
            Something went wrong!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            An unexpected error occurred. Please try refreshing the page.
          </Typography>
          <Button
            variant="contained"
            onClick={() => reset()}
            sx={{
              px: 4,
              py: 1.5,
            }}
          >
            Try again
          </Button>
        </Box>
      </body>
    </html>
  );
}