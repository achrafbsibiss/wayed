'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Chip,
} from '@mui/material';
import { Icon } from '@iconify/react';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!session) {
        return null;
    }

    const menuItems = [
        {
            title: 'Products Management',
            description: 'Create and manage products with variants for the harvest page',
            icon: 'solar:box-bold-duotone',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            iconColor: '#667eea',
            path: '/admin/products',
            stats: 'Products & Variants',
        },
        {
            title: 'Certificates Management',
            description: 'Upload and organize certification documents',
            icon: 'solar:document-medicine-bold-duotone',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            iconColor: '#f5576c',
            path: '/admin/certificates',
            stats: 'Certificates',
        },
    ];

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)' }}>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Icon icon="solar:user-bold-duotone" width={28} style={{ color: '#667eea' }} />
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            Welcome back!
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        {session.user?.email}
                    </Typography>
                    <Chip 
                        label="Administrator" 
                        size="small" 
                        sx={{ 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontWeight: 600,
                        }} 
                    />
                </Box>

                <Grid container spacing={3}>
                    {menuItems.map((item) => (
                        <Grid item xs={12} md={6} key={item.path}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 3,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                                        borderColor: 'transparent',
                                        '& .hover-gradient': {
                                            opacity: 1,
                                        },
                                        '& .arrow-icon': {
                                            transform: 'translateX(4px)',
                                        },
                                    },
                                }}
                                onClick={() => router.push(item.path)}
                            >
                                <Box
                                    className="hover-gradient"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 4,
                                        background: item.gradient,
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                    }}
                                />
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                                        <Box
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: 2.5,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: item.gradient,
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            <Icon
                                                icon={item.icon}
                                                width={32}
                                                height={32}
                                                style={{ color: 'white' }}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="h5"
                                        sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 3, lineHeight: 1.7 }}
                                    >
                                        {item.description}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Chip 
                                            label={item.stats} 
                                            size="small" 
                                            variant="outlined"
                                            sx={{ borderRadius: 1.5 }}
                                        />
                                        <Box
                                            className="arrow-icon"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                color: 'text.secondary',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                Open
                                            </Typography>
                                            <Icon icon="solar:alt-arrow-right-linear" width={20} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
