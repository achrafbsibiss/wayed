'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from '../../contexts/TranslationProvider';

const SIDEBAR_LINKS = [
    { label: 'About us', href: '/about' },
    { label: 'Press', href: '/press' },
];

export default function AboutHero() {
    const { t } = useTranslations();
    const descriptions = t('about.hero_description_paragraphs');
    const descriptionList = Array.isArray(descriptions) ? descriptions : [];

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

                            {/* Description Text Split into 4 Parts */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {descriptionList.map((text, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5 }}>
                                        <Box
                                            component="img"
                                            src="/images/hero/decorative-leaf.png"
                                            alt=""
                                            sx={{
                                                width: { xs: 20, md: 24 },
                                                height: 'auto',
                                                mt: 0.5,
                                                opacity: 0.8
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: { xs: '0.95rem', md: '20px' },
                                                maxWidth: '900px',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
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