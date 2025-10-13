'use client';

import { Box, Container, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const INNOVATIONS = [
    {
        title: 'Precision Agriculture',
        description: 'Leverage advanced tools to optimize planting, watering, and harvesting for maximum yield and quality.',
        image: '/images/technology/image 22.webp',
    },
    {
        title: 'Crop Monitoring',
        description: 'Continuous surveillance of plants using modern sensors and software to ensure healthy growth at every stage.',
        image: '/images/technology/image 23.webp',
    },
    {
        title: 'Smart Automation',
        description: 'Automated systems manage irrigation, climate, and harvesting, improving efficiency and consistency across our farms.',
        image: '/images/technology/Rectangle 18.webp',
    },
];

export default function InnovationSection() {
    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="flex-start">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: 'sticky',
                                top: 100,
                                pr: { md: 4 },
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 3,
                                    color: '#2A2A2A',
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    lineHeight: 1.2,
                                }}
                            >
                                Innovative Solutions For Optimal Crop Growth
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#6B7280',
                                fontSize: { xs: '1rem', md: '1.05rem' },
                                lineHeight: 1.7,
                            }}
                        >
                            We Use Advanced Software And The Latest Technology To Monitor And Control Every Stage Of Tomato Cultivation, Ensuring Maximum Efficiency, Quality, And Sustainability.
                        </Typography>
                    </Grid>
                </Grid>

                {/* Images Grid */}
                <Grid container spacing={4} sx={{ mt: 6 }}>
                    {INNOVATIONS.map((innovation, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Box>
                                {/* Image Container */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        height: { xs: 300, md: index === 1 ? 344 : 400 },
                                        borderRadius: '35px',
                                        overflow: 'hidden',
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={innovation.image}
                                        alt={innovation.title}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>

                                {/* Title and Description - Bottom Left */}
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 500,
                                            color: '#2A2A2A',
                                            fontSize: { xs: '1.25rem', md: '32px' },
                                            fontFamily: 'Roboto',
                                        }}
                                    >
                                        {innovation.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#2A2A2A',
                                            opacity: 0.6,
                                            fontSize: { xs: '0.95rem', md: '20px' },
                                            fontFamily: 'Roboto',
                                            fontWeight: 400,
                                        }}
                                    >
                                        {innovation.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Centered Learn More Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Button
                        variant="outlined"
                        component={Link}
                        href="/about"
                        sx={{
                            width: '123px',
                            height: '45px',
                            fontSize: '15px',
                            fontWeight: 500,
                            borderRadius: '68px',
                            border: '2px solid #2A2A2A',
                            background: 'rgba(42, 42, 42, 0)',
                            color: '#2A2A2A',
                            textTransform: 'none',
                            fontFamily: 'Roboto',
                            padding: 0,
                            '&:hover': {
                                border: '2px solid #2A2A2A',
                                bgcolor: '#2A2A2A',
                                color: 'white',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Learn More
                    </Button>
                </Box>
            </Container >
        </Box >
    );
}