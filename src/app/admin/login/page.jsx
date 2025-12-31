'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
} from '@mui/material';
import { Icon } from '@iconify/react';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else if (result?.ok) {
                router.push('/admin/certificates');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #163266 0%, #1F4186 100%)',
                py: 8,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={10}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Icon
                            icon="mdi:shield-lock"
                            width={64}
                            height={64}
                            style={{ color: '#163266', marginBottom: '16px' }}
                        />
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                mb: 1,
                            }}
                        >
                            Admin Login
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Certificate Management System
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ mb: 3 }}
                            autoComplete="email"
                            InputProps={{
                                startAdornment: (
                                    <Icon
                                        icon="mdi:email"
                                        width={20}
                                        style={{ marginRight: '8px', color: '#163266' }}
                                    />
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ mb: 4 }}
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <Icon
                                        icon="mdi:lock"
                                        width={20}
                                        style={{ marginRight: '8px', color: '#163266' }}
                                    />
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                background: 'linear-gradient(135deg, #163266 0%, #1F4186 100%)',
                                fontWeight: 600,
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1F4186 0%, #163266 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 16px rgba(22, 50, 102, 0.3)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <Typography
                        variant="caption"
                        sx={{ display: 'block', textAlign: 'center', mt: 3, color: 'text.secondary' }}
                    >
                        Wayed Groupe © {new Date().getFullYear()}
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
