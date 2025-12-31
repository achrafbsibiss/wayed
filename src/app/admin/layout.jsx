'use client';

import { SessionProvider } from 'next-auth/react';
import { useSession, signOut } from 'next-auth/react';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

function AdminNavBar() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/admin/login');
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(135deg, #163266 0%, #1F4186 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
        >
            <Toolbar>
                <Icon icon="mdi:certificate" width={32} height={32} style={{ marginRight: '12px' }} />
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                    Wayed Groupe - Admin Panel
                </Typography>

                {session && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2">
                            {session.user?.email}
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<Icon icon="mdi:logout" />}
                            onClick={handleLogout}
                            sx={{
                                color: 'white',
                                borderColor: 'white',
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                },
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default function AdminLayout({ children }) {
    return (
        <SessionProvider>
            <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
                <AdminNavBar />
                <Box>{children}</Box>
            </Box>
        </SessionProvider>
    );
}
