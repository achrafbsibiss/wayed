'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
      light: '#1a1a1a',
      dark: '#1a1a1a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#eab308',
      light: '#fde047',
      dark: '#ca8a04',
      contrastText: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#f9fafb',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: 'Roboto, system-ui, sans-serif',
    h1: {
      fontFamily: 'Roboto, system-ui, sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontFamily: 'Roboto, system-ui, sans-serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontFamily: 'Roboto, system-ui, sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontFamily: 'Roboto, system-ui, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    button: {
      fontFamily: 'Roboto, system-ui, sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 32px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}