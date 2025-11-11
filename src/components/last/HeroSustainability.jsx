'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSustainability() {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '700px', md: '960px' },
                flexShrink: 0,
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '0 0 70px 70px',
                pt: { xs: '96px', md: '10px' },
                pb: { xs: 8, md: 16 },
                px: { xs: 2, md: 4 },
            }}
        >
            {/* Background container with rounded corners */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    borderRadius: '0 0 70px 70px',
                }}
            >
                {/* White gradient overlay for smooth transition */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, #F0EFEF 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 15%, rgba(255, 255, 255, 0.92) 25%, rgba(255, 255, 255, 0.8) 35%, rgba(255, 255, 255, 0.5) 45%, rgba(255, 255, 255, 0.2) 55%, rgba(255, 255, 255, 0.08) 65%, transparent 75%)',
                        zIndex: 10,
                    }}
                />

                {/* Image container - FIXED: Same dimensions as parent */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '0 0 70px 70px',
                        overflow: 'hidden',
                    }}
                >
                    {/* Main image with proper object-fit */}
                    <Box
                        component="img"
                        src="/images/hero/hero 3.webp"
                        alt="Moroccan harvest fields"
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center center',
                        }}
                    />
                </Box>
            </Box>

            {/* Content */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 20, mt: { xs: -15, md: -30 } }}>
                <Box
                    sx={{
                        maxWidth: '800px',
                        mx: 'auto',
                        textAlign: 'center',
                        animation: 'fadeInUp 1s ease-out',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 600,
                            mb: { xs: 3, md: 2 },
                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '64px' },
                            lineHeight: 1.15,
                            color: '#2A2A2A',
                            px: 2,
                        }}
                    >
                        Committed to a Greener Future
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            mb: { xs: 2, md: 3 },
                            color: '#2A2A2A',
                            fontWeight: 400,
                            fontSize: { xs: '1rem', md: '18px' },
                            maxWidth: '500px',
                            mx: 'auto',
                            px: 1,
                        }}
                    >
                        We believe in sustainable farming and eco-friendly innovation that protects our planet for generations.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            component={Link}
                            href="/harvest"
                            endIcon={<Icon icon="solar:arrow-right-outline" width="25.612" height="25.612" />}
                            sx={{
                                width: '164px',
                                height: '45px',
                                flexShrink: 0,
                                fontSize: '15px',
                                borderRadius: '68px',
                                border: '2px solid rgba(255, 255, 255, 0)',
                                background: 'linear-gradient(180deg, #2A2A2A 45.2%, #3A3636 100%)',
                                color: '#FFF',
                                textTransform: 'none',
                                fontFamily: 'Roboto',
                                fontWeight: 500,
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                boxShadow: 'none',
                                padding: 0,
                                '&:hover': {
                                    background: 'linear-gradient(180deg, #1a1a1a 45.2%, #2A2A2A 100%)',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                                },
                                transition: 'all 0.3s ease',
                                '& .MuiButton-endIcon': {
                                    transition: 'transform 0.3s ease',
                                    marginLeft: '8px',
                                },
                                '&:hover .MuiButton-endIcon': {
                                    transform: 'translateX(4px)',
                                },
                            }}
                        >
                            Our Initiatives
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Bottom Left Decorative Element */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: 0,
                    zIndex: 20,
                }}
            >
                <Image
                    src="/images/hero/decorative-left.png"
                    alt="Decorative Element"
                    width={153}
                    height={86}
                />
            </Box>

            <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </Box>
    );
}