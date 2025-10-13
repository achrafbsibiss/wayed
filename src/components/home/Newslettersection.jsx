'use client';

import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 400, md: 500 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="/images/newsletter/newsletter-image.webp"
        alt="Agricultural field"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Dark Overlay for Text Readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src="/images/logos/way-logo-footer.png"
              alt="WAYD Logo"
              sx={{
                height: { xs: 60, md: 80 },
                width: 'auto',
              }}
            />
          </Box>

          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              mb: 4,
              fontSize: { xs: '1.75rem', md: '50px' },
              lineHeight: 1.3,
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            Innovative Solutions For
            <br />
            Optimal Crop Growth
          </Typography>

          {/* Email Subscription Form */}
          <Box
            component="form"
            onSubmit={handleSubscribe}
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: 500,
              mx: 'auto',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField
              fullWidth
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              sx={{
                bgcolor: 'white',
                borderRadius: '50px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  height: 50,
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  px: 3,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<Icon icon="solar:arrow-right-up-outline" width="25" height="25" />}
              sx={{
                minWidth: { xs: '100%', sm: 160 },
                height: 50,
                borderRadius: '50px',
                bgcolor: '#2A2A2A',
                color: 'white',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                px: 4,
                '&:hover': {
                  bgcolor: '#1a1a1a',
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.3s ease',
                boxShadow: 'none',
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}