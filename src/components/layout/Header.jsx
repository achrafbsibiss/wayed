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
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { NAV_LINKS } from '@/lib/constants';
import { useTranslations } from '@/hooks/useTranslations';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const { t, locale, changeLocale } = useTranslations();

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

  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const handleLanguageSelect = (newLocale) => {
    if (newLocale !== locale) {
      handleLanguageClose();
      changeLocale(newLocale);
    } else {
      handleLanguageClose();
    }
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
              primary={t(`nav.${link.key}`)}
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
            href="/quote"
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
            {t('nav.requestQuote')}
          </Button>
        </ListItem>
        
        {/* Language selector for mobile */}
        <ListItem sx={{ mt: 2, px: 2 }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
              Language / Langue
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                fullWidth
                variant={locale === 'en' ? 'contained' : 'outlined'}
                onClick={() => handleLanguageSelect('en')}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  py: 1,
                  bgcolor: locale === 'en' ? '#2d2d2d' : 'transparent',
                  color: locale === 'en' ? 'white' : '#2d2d2d',
                  border: '1px solid #2d2d2d',
                  '&:hover': {
                    bgcolor: locale === 'en' ? '#1a1a1a' : 'rgba(45, 45, 45, 0.05)',
                  },
                }}
              >
                EN
              </Button>
              <Button
                fullWidth
                variant={locale === 'fr' ? 'contained' : 'outlined'}
                onClick={() => handleLanguageSelect('fr')}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  py: 1,
                  bgcolor: locale === 'fr' ? '#2d2d2d' : 'transparent',
                  color: locale === 'fr' ? 'white' : '#2d2d2d',
                  border: '1px solid #2d2d2d',
                  '&:hover': {
                    bgcolor: locale === 'fr' ? '#1a1a1a' : 'rgba(45, 45, 45, 0.05)',
                  },
                }}
              >
                FR
              </Button>
            </Box>
          </Box>
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
          <Toolbar sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {/* Left: mobile menu icon (visible on mobile) */}
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
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

              {/* Center: Logo (centered on mobile, left-aligned on desktop) */}
              <Box sx={{ flex: { xs: 1, lg: 1 }, display: 'flex', justifyContent: { xs: 'center', lg: 'flex-start' }, alignItems: 'center' }}>
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      component="img"
                      src="/images/hero/logo-wayd-2.webp"
                      alt="WAYD Logo"
                      sx={{
                        height: { xs: 48, md: 58 },
                        width: 'auto',
                        display: 'block',
                      }}
                    />
                  </Box>
                </Link>
              </Box>

              {/* Right: Desktop nav + CTAs */}
              <Box sx={{ flex: 1, display: 'flex', gap: { xs: 1.5, lg: 1.5, xl: 2 }, alignItems: 'center', justifyContent: 'flex-end' }}>
                {/* Desktop Navigation */}
                <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: { lg: 1, xl: 1.5 }, alignItems: 'center' }}>
                  {NAV_LINKS.map((link) => (
                    <Button
                      key={link.label}
                      component={Link}
                      href={link.href}
                      sx={{
                        color: '#2A2A2A',
                        fontWeight: 500,
                        fontSize: { lg: '15px', xl: '16px' },
                        px: { lg: 1.2, xl: 1.5 },
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          opacity: 0.7,
                          backgroundColor: 'transparent',
                        },
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      {t(`nav.${link.key}`)}
                    </Button>
                  ))}
                </Box>

                {/* CTA Buttons */}
                <Button
                  variant="contained"
                  component={Link}
                  href="/quote"
                  sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    minWidth: { sm: '140px', lg: '130px', xl: '144px' },
                    width: 'auto',
                    height: '45px',
                    flexShrink: 0,
                    borderRadius: '68px',
                    border: '2px solid rgba(255, 255, 255, 0)',
                    background: '#163266',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '15px',
                    px: { sm: 2.5, lg: 2, xl: 2.5 },
                    boxShadow: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      background: '#1F4186',
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {t('nav.requestQuote')}
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleLanguageClick}
                  startIcon={<Icon icon="solar:global-linear" width="25" height="25" />}
                  endIcon={<Icon icon="solar:alt-arrow-down-linear" width="16" height="16" />}
                  sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    minWidth: { sm: '110px', lg: '100px', xl: '117px' },
                    width: 'auto',
                    height: '45px',
                    flexShrink: 0,
                    borderRadius: '68px',
                    border: '2px solid #2A2A2A',
                    background: 'rgba(255, 255, 255, 0)',
                    color: '#2A2A2A',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '15px',
                    px: { sm: 1.5, lg: 1, xl: 1.5 },
                    whiteSpace: 'nowrap',
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
                  {t('nav.language')}
                </Button>

                {/* Language Dropdown Menu */}
                <Menu
                  anchorEl={languageAnchor}
                  open={Boolean(languageAnchor)}
                  onClose={handleLanguageClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    mt: 1,
                    '& .MuiPaper-root': {
                      borderRadius: '12px',
                      minWidth: '140px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => handleLanguageSelect('en')}
                    selected={locale === 'en'}
                    sx={{
                      py: 1.5,
                      px: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      '&.Mui-selected': {
                        bgcolor: 'rgba(42, 42, 42, 0.08)',
                        '&:hover': {
                          bgcolor: 'rgba(42, 42, 42, 0.12)',
                        },
                      },
                    }}
                  >
                    <Box>English</Box>
                    {locale === 'en' && (
                      <Icon icon="solar:check-circle-bold" width="20" height="20" color="#2A2A2A" />
                    )}
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleLanguageSelect('fr')}
                    selected={locale === 'fr'}
                    sx={{
                      py: 1.5,
                      px: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      '&.Mui-selected': {
                        bgcolor: 'rgba(42, 42, 42, 0.08)',
                        '&:hover': {
                          bgcolor: 'rgba(42, 42, 42, 0.12)',
                        },
                      },
                    }}
                  >
                    <Box>Français</Box>
                    {locale === 'fr' && (
                      <Icon icon="solar:check-circle-bold" width="20" height="20" color="#2A2A2A" />
                    )}
                  </MenuItem>
                </Menu>
              </Box>
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