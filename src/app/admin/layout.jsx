'use client';

import { SessionProvider } from 'next-auth/react';
import { useSession, signOut } from 'next-auth/react';
import { Box, AppBar, Toolbar, Typography, Button, Breadcrumbs, Link, Chip } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';

function AdminNavBar() {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/admin/login');
    };

    const isLoginPage = pathname === '/admin/login';

    // Generate breadcrumbs based on pathname
    const breadcrumbs = useMemo(() => {
        if (isLoginPage) return [];
        
        const paths = pathname.split('/').filter(Boolean);
        const crumbs = [];
        
        // Always add dashboard
        crumbs.push({
            label: 'Dashboard',
            path: '/admin',
            icon: 'solar:home-2-linear',
        });
        
        // Add intermediate paths
        let currentPath = '';
        for (let i = 1; i < paths.length; i++) {
            currentPath += '/' + paths[i];
            const segment = paths[i];
            
            // Skip dynamic segments like [id]
            if (!segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}/i)) {
                let label = segment.charAt(0).toUpperCase() + segment.slice(1);
                let icon = null;
                
                if (segment === 'products') {
                    label = 'Products';
                    icon = 'solar:box-linear';
                } else if (segment === 'certificates') {
                    label = 'Certificates';
                    icon = 'solar:document-medicine-linear';
                } else if (segment === 'new') {
                    label = 'New';
                    icon = 'solar:add-circle-linear';
                }
                
                crumbs.push({
                    label,
                    path: '/admin' + currentPath,
                    icon,
                });
            }
        }
        
        return crumbs;
    }, [pathname, isLoginPage]);

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: 'white',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Toolbar sx={{ py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                        >
                            <Icon icon="solar:shield-check-bold" width={24} style={{ color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                                Wayed Groupe
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Admin Panel
                            </Typography>
                        </Box>
                    </Box>

                    {session && !isLoginPage && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {session.user?.email}
                                </Typography>
                                <Chip 
                                    label="Admin" 
                                    size="small" 
                                    sx={{ 
                                        height: 18,
                                        fontSize: '0.7rem',
                                        bgcolor: 'success.50',
                                        color: 'success.700',
                                        fontWeight: 600,
                                    }} 
                                />
                            </Box>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Icon icon="solar:logout-2-linear" />}
                                onClick={handleLogout}
                                sx={{
                                    borderColor: 'divider',
                                    color: 'text.secondary',
                                    '&:hover': {
                                        borderColor: 'error.main',
                                        color: 'error.main',
                                        bgcolor: 'error.50',
                                    },
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 1 && (
                <Box sx={{ bgcolor: '#f8f9fa', borderBottom: '1px solid', borderColor: 'divider', py: 1.5 }}>
                    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
                        <Breadcrumbs 
                            separator={<Icon icon="solar:alt-arrow-right-linear" width={16} style={{ color: '#9ca3af' }} />}
                            sx={{ '& .MuiBreadcrumbs-separator': { mx: 1 } }}
                        >
                            {breadcrumbs.map((crumb, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                
                                if (isLast) {
                                    return (
                                        <Box key={crumb.path} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            {crumb.icon && <Icon icon={crumb.icon} width={16} style={{ color: '#667eea' }} />}
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#667eea' }}>
                                                {crumb.label}
                                            </Typography>
                                        </Box>
                                    );
                                }
                                
                                return (
                                    <Link
                                        key={crumb.path}
                                        onClick={() => router.push(crumb.path)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            color: 'text.secondary',
                                            '&:hover': {
                                                color: 'text.primary',
                                            },
                                        }}
                                    >
                                        {crumb.icon && <Icon icon={crumb.icon} width={16} />}
                                        <Typography variant="body2">
                                            {crumb.label}
                                        </Typography>
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default function AdminLayout({ children }) {
    return (
        <SessionProvider>
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
                <AdminNavBar />
                <Box>{children}</Box>
            </Box>
        </SessionProvider>
    );
}
