'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import Link from 'next/link';

import { useTranslations } from '../../contexts/TranslationProvider';

export default function AboutVision() {
    const { t } = useTranslations();
    const visionDescriptions = t('about.vision_description_paragraphs');
    const descriptionList = Array.isArray(visionDescriptions) ? visionDescriptions : [];
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
                                                lineHeight: 1.8,
                                                maxWidth: '900px',
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* //bold Typography */}
                            <Typography
                                sx={{
                                    color: 'text.primary',
                                    fontSize: { xs: '0.95rem', md: '20px' },
                                    fontWeight: 500,
                                    mt: '15px'
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