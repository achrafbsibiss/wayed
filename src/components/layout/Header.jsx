'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Box,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Icon icon="solar:close-circle-bold-duotone" />
        </IconButton>
      </Box>
      <List>
        {NAV_LINKS.map((link) => (
          <ListItem key={link.label} component={Link} href={link.href} onClick={handleDrawerToggle}>
            <ListItemText 
              primary={link.label} 
              sx={{ 
                '& .MuiTypography-root': { 
                  fontWeight: 500,
                  fontSize: '16px',
                }
              }} 
            />
          </ListItem>
        ))}
        <ListItem sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            href="/contact"
            sx={{ 
              borderRadius: '50px',
              bgcolor: '#2d2d2d',
              color: 'white',
              textTransform: 'none',
              fontWeight: 500,
              py: 1.5,
              '&:hover': {
                bgcolor: '#1a1a1a',
              },
            }}
          >
            Request a Quote
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
              {/* Logo */}
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src="/images/hero/logo-wayd-2.webp"
                    alt="WAYD Logo"
                    sx={{
                      height: { xs: 48, md: 61 },
                      width: 'auto',
                      display: 'block',
                    }}
                  />
                </Box>
              </Link>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: { lg: 2, xl: 3 }, alignItems: 'center' }}>
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.label}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: '#2A2A2A',
                      fontWeight: 500,
                      fontSize: '16px',
                      px: 2,
                      textTransform: 'none',
                      '&:hover': {
                        opacity: 0.7,
                        backgroundColor: 'transparent',
                      },
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>

              {/* CTA Buttons */}
              <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 2 }, alignItems: 'center' }}>
                <Button
                  variant="contained"
                  component={Link}
                  href="/contact"
                  sx={{ 
                    display: { xs: 'none', sm: 'inline-flex' },
                    width: '144px',
                    height: '45px',
                    flexShrink: 0,
                    borderRadius: '68px',
                    border: '2px solid rgba(255, 255, 255, 0)',
                    background: '#2A2A2A',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '15px',
                    padding: 0,
                    boxShadow: 'none',
                    '&:hover': {
                      background: '#1a1a1a',
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Request a Quote
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={
                    <Icon icon="solar:global-linear" width="25" height="25" />
                  }
                  endIcon={
                    <Icon icon="solar:alt-arrow-right-linear" width="16" height="16" />
                  }
                  sx={{ 
                    display: { xs: 'none', sm: 'inline-flex' },
                    width: '117px',
                    height: '45px',
                    flexShrink: 0,
                    borderRadius: '68px',
                    border: '2px solid #2A2A2A',
                    background: 'rgba(255, 255, 255, 0)',
                    color: '#2A2A2A',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '15px',
                    padding: 0,
                    '&:hover': {
                      border: '2px solid #2A2A2A',
                      bgcolor: '#2A2A2A',
                      color: 'white',
                      '& svg': {
                        color: 'white',
                      },
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  English
                </Button>

                {/* Mobile menu button */}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    display: { lg: 'none' },
                    color: '#2A2A2A',
                  }}
                >
                  <Icon icon="solar:hamburger-menu-line-duotone" width="28" height="28" />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed header */}
      <Toolbar />
    </>
  );
}