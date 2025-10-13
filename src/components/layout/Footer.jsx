'use client';

import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { SITE_CONFIG, FOOTER_SECTIONS } from '@/lib/constants';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#E5E5E5',
        color: '#2A2A2A',
        pt: 8,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Box
                  component="img"
                  src="/images/logos/wayd-logo-black.png"
                  alt="WAYD Logo"
                  sx={{
                    height: 66,
                    width: 'auto',
                  }}
                />
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#6B7280', 
                  mb: 3,
                  lineHeight: 1.7,
                  fontSize: '0.9rem',
                }}
              >
                We bring Moroccan farmers to the world stage by exporting fresh, high-quality crops.
              </Typography>
              
              {/* Social Icons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  sx={{ 
                    color: '#2A2A2A',
                    bgcolor: 'transparent',
                    '&:hover': { 
                      color: '#6B7280',
                      bgcolor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Icon icon="mdi:linkedin" width="30" height="30" />
                </IconButton>
                <IconButton 
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  sx={{ 
                    color: '#2A2A2A',
                    bgcolor: 'transparent',
                    '&:hover': { 
                      color: '#6B7280',
                      bgcolor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Icon icon="mdi:instagram" width="30" height="30" />
                </IconButton>
                <IconButton 
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  sx={{ 
                    color: '#2A2A2A',
                    bgcolor: 'transparent',
                    '&:hover': { 
                      color: '#6B7280',
                      bgcolor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Icon icon="ri:twitter-x-fill" width="30" height="30" />
                </IconButton>
                <IconButton 
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  sx={{ 
                    color: '#2A2A2A',
                    bgcolor: 'transparent',
                    '&:hover': { 
                      color: '#6B7280',
                      bgcolor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Icon icon="mdi:facebook" width="30" height="30" />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2.5,
                fontSize: '1rem',
                color: '#2A2A2A',
              }}
            >
              SERVICES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {FOOTER_SECTIONS.services.map((link) => (
                <MuiLink
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: '#6B7280',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#2A2A2A',
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2.5,
                fontSize: '1rem',
                color: '#2A2A2A',
              }}
            >
              RECOURCES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {FOOTER_SECTIONS.resources.map((link) => (
                <MuiLink
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: '#6B7280',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#2A2A2A',
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Products */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2.5,
                fontSize: '1rem',
                color: '#2A2A2A',
              }}
            >
              PRODUCTS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {FOOTER_SECTIONS.products.map((link) => (
                <MuiLink
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: '#6B7280',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#2A2A2A',
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Help */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2.5,
                fontSize: '1rem',
                color: '#2A2A2A',
              }}
            >
              HELP
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {FOOTER_SECTIONS.help.map((link) => (
                <MuiLink
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: '#6B7280',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#2A2A2A',
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: '1px solid #374151',
            mt: 6,
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            © {new Date().getFullYear()} WAYD Groupe. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink
              href="/privacy"
              sx={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="/terms"
              sx={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}