'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import Link from 'next/link';

const SIDEBAR_LINKS = [
    { label: 'About us', href: '/about' },
    { label: 'Press', href: '/press' },
];

export default function AboutHero() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 6, lg: 8 }}>
                    {/* Left Sidebar Navigation */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {SIDEBAR_LINKS.map((link) => (
                                <Typography
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.95rem',
                                        fontWeight: 400,
                                        '&:hover': {
                                            color: 'text.primary',
                                        },
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    {link.label}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>

                    {/* Main Content */}
                    <Grid size={{ xs: 12, md: 9 }}>
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
                                    ABOUT US
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
                                    01
                                </Typography>
                            </Box>

                            {/* Description Text */}
                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.95rem', md: '20px' },
                                    maxWidth: '900px',
                                }}
                            >
                                We are proud to stand at the intersection of tradition and innovation, representing
                                Morocco's agricultural excellence on the global stage. For decades, our farms have
                                cultivated tomatoes under the Moroccan sun, combining the knowledge of generations
                                with modern techniques that ensure consistent quality and sustainability. By investing
                                in advanced greenhouses, precision farming, and software-driven monitoring systems,
                                we maintain full control over every stage of production—from seed selection and growth
                                to harvesting and export. Our commitment extends beyond the fields: we support
                                hundreds of local farmers, create sustainable jobs, and uphold the highest Moroccan
                                and international quality standards. Every tomato we grow carries a story of care,
                                innovation, and respect for the land, making its way from our farms to tables around the
                                world. Through this mission, we not only deliver freshness and flavor but also showcase
                                the pride and potential of Moroccan agriculture on a global scale.
                            </Typography>
                        </Box>



                    </Grid>
                    {/* Image */}
                    <Box
                        sx={{
                            mt: 6,
                            borderRadius: { xs: '30px', md: '40px' },
                            overflow: 'hidden',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/about/image 26.webp"
                            alt="WAYD Groupe Team"
                            sx={{
                                width: '100%',
                                height: { xs: '300px', md: '500px' },
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </Box>
                </Grid>
            </Container>
        </Box>
    );
}