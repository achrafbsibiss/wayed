'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import Link from 'next/link';

export default function AboutVision() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 6, lg: 8 }}>
                    {/* Left Sidebar Navigation */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box
                                component='img'
                                src="/images/about/image 28.webp"
                                alt="Vision about"
                            />
                        </Box>
                    </Grid>

                    {/* Main Content */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Header with decorative line */}
                        <Box sx={{ mb: 4 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    mb: 4,
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: { xs: '2rem', md: '64px' },
                                        color: 'text.primary',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Vision
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        height: '2px',
                                        bgcolor: 'text.primary',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                    }}
                                >
                                    03
                                </Typography>
                            </Box>

                            {/* Description Text */}
                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.95rem', md: '20px' },
                                    lineHeight: 1.8,
                                    maxWidth: '900px',
                                }}
                            >
                                Our vision is to establish Morocco as a global leader in high-quality tomato production and export, recognized for both tradition and innovation. We strive to create a sustainable agricultural model that empowers local farmers, embraces advanced technologies, and ensures consistent excellence from seed to shipment. By combining modern precision farming with respect for the land and its people, we aim to deliver products that meet the highest international standards while preserving the authenticity of Moroccan agriculture. Through this vision, we seek not only to nourish communities worldwide but also to build lasting trust, expand Morocco’s presence in global markets, and inspire the next generation of sustainable farming practices.
                            </Typography>

                            {/* //bold Typography */}
                            <Typography
                                sx={{
                                    color: 'text.primary',
                                    fontSize: { xs: '0.95rem', md: '20px' },
                                    fontWeight: 500,
                                    mt:'15px'
                                }}
                            >
                                Empowering Farmers, Elevating Standards, Sharing Morocco With The World
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}