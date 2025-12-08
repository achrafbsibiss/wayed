'use client';

import { Box, Container, Typography, Link as MuiLink, IconButton } from '@mui/material';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const footerLinks = [
    { label: 'HOME', href: '/' },
    { label: 'A PROPOS', href: '/about' },
    { label: 'HELP', href: '/contact' },
    { label: 'PRODUCTS', href: '/harvest' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#E5E5E5',
        color: '#2A2A2A',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Centered Content */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {/* Logo */}
          <Box sx={{ mb: 3 }}>
            <Box
              component="img"
              src="/images/hero/logo-wayd-2.webp"
              alt="WAYD Logo"
              sx={{
                height: 90,
                width: 'auto',
              }}
            />
          </Box>

          {/* Description */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#4B5563', 
              mb: 4,
              lineHeight: 1.7,
              fontSize: '0.95rem',
              maxWidth: '600px',
            }}
          >
            We bring Moroccan farmers to the world stage by exporting fresh, high-quality crops.
          </Typography>

          {/* Separator Line */}
          <Box 
            sx={{ 
              width: '80px', 
              height: '1px', 
              bgcolor: '#D1D5DB', 
              mb: 3,
            }} 
          />

          {/* Navigation Links */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
            mb: 4,
          }}>
            {footerLinks.map((link, index) => (
              <MuiLink
                key={`${link.label}-${index}`}
                component={Link}
                href={link.href}
                sx={{
                  color: '#2A2A2A',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#6B7280',
                  },
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Box>

          {/* Social Icons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <IconButton 
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              sx={{ 
                color: '#2A2A2A',
                bgcolor: 'transparent',
                '&:hover': { 
                  color: '#0077B5',
                  bgcolor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <Icon icon="mdi:linkedin" width="28" height="28" />
            </IconButton>
            <IconButton 
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              sx={{ 
                color: '#2A2A2A',
                bgcolor: 'transparent',
                '&:hover': { 
                  color: '#E4405F',
                  bgcolor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <Icon icon="mdi:instagram" width="28" height="28" />
            </IconButton>
            <IconButton 
              href={SITE_CONFIG.social.twitter}
              target="_blank"
              sx={{ 
                color: '#2A2A2A',
                bgcolor: 'transparent',
                '&:hover': { 
                  color: '#1DA1F2',
                  bgcolor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <Icon icon="ri:twitter-x-fill" width="28" height="28" />
            </IconButton>
            <IconButton 
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              sx={{ 
                color: '#2A2A2A',
                bgcolor: 'transparent',
                '&:hover': { 
                  color: '#1877F2',
                  bgcolor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <Icon icon="mdi:facebook" width="28" height="28" />
            </IconButton>
          </Box>

          {/* Separator Line */}
          <Box 
            sx={{ 
              width: '100%', 
              maxWidth: '500px',
              height: '1px', 
              bgcolor: '#D1D5DB', 
              mb: 3,
            }} 
          />

          {/* Copyright */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6B7280',
              fontSize: '0.875rem',
            }}
          >
            Wayd Copyright {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}