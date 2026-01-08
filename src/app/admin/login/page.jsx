'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Card,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    InputAdornment,
} from '@mui/material';
import { Icon } from '@iconify/react';

export default function AdminLogin() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/admin');
            router.refresh();
        }
    }, [status, router]);

    // Show loading while checking session
    if (status === 'loading') {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#f8f9fa',
                }}
            >
                <CircularProgress sx={{ color: '#667eea' }} />
            </Box>
        );
    }

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
                router.push('/admin');
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
                bgcolor: '#f8f9fa',
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 87, 108, 0.05) 0%, transparent 50%)',
                py: 8,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'white',
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                mx: 'auto',
                                mb: 3,
                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                            }}
                        >
                            <Icon
                                icon="solar:shield-check-bold-duotone"
                                width={48}
                                height={48}
                                style={{ color: 'white' }}
                            />
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                mb: 1,
                            }}
                        >
                            Admin Access
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to manage your content
                        </Typography>
                    </Box>

                    {error && (
                        <Alert 
                            severity="error" 
                            icon={<Icon icon="solar:shield-warning-bold" width={22} />}
                            sx={{ mb: 3, borderRadius: 2 }}
                        >
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ mb: 2.5 }}
                            autoComplete="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            icon="solar:letter-linear"
                                            width={22}
                                            style={{ color: '#9ca3af' }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ mb: 4 }}
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            icon="solar:lock-password-linear"
                                            width={22}
                                            style={{ color: '#9ca3af' }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Box
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                        >
                                            <Icon
                                                icon={showPassword ? 'solar:eye-linear' : 'solar:eye-closed-linear'}
                                                width={22}
                                                style={{ color: '#9ca3af' }}
                                            />
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Icon icon="solar:login-3-linear" />}
                            sx={{
                                py: 1.5,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontWeight: 600,
                                fontSize: '1rem',
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                                },
                                '&:disabled': {
                                    background: 'linear-gradient(135deg, #667eea80 0%, #764ba280 100%)',
                                },
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <Typography
                        variant="caption"
                        sx={{ display: 'block', textAlign: 'center', mt: 4, color: 'text.secondary' }}
                    >
                        Wayed Groupe © {new Date().getFullYear()}
                    </Typography>
                </Card>
            </Container>
        </Box>
    );
}
