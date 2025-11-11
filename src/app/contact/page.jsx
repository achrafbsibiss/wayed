'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Icon } from '@iconify/react';

export default function ContactPage() {
    return (
        <Box>
            {/* Hero Section with Background Image */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: { xs: '400px', md: '500px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    pt: { xs: '96px', md: '128px' },
                    pb: { xs: 8, md: 12 },
                }}
            >
                {/* Background Image Container with Curved Bottom */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        overflow: 'hidden',
                    }}
                >
                    {/* Curved Shape */}
                    {/* <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            borderBottomLeftRadius: '50%',
                            borderBottomRightRadius: '50%',
                            overflow: 'hidden',
                        }}
                    > */}
                    {/* SVG Clip Path for Eye Shape */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            clipPath: {
                                xs: 'ellipse(100% 80% at 50% 20%)',
                                md: 'ellipse(60% 70% at 50% 10%)',
                            },
                        }}
                    >
                        {/* Background Image */}
                        <Box
                            component="img"
                            src="/images/hero/hero.webp"
                            alt="Contact Us"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        {/* Dark Overlay */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 1%, rgba(255,255,255,0.7) 15%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
                            }}
                        />
                    </Box>
                </Box>

                {/* Hero Content */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 20 }}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            animation: 'fadeInUp 1s ease-out',
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                                lineHeight: 1.2,
                                color: 'white',
                                position: 'relative',
                                display: 'inline-block',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '120px',
                                    height: '4px',
                                    bgcolor: 'white',
                                    borderRadius: '2px',
                                },
                            }}
                        >
                            CONTACT US
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mt: 5,
                                color: 'white',
                                fontWeight: 400,
                                fontSize: { xs: '1rem', md: '1.2rem' },
                                lineHeight: 1.6,
                                maxWidth: '600px',
                                mx: 'auto',
                                px: 2,
                            }}
                        >
                            Have questions or want to learn more? Get in touch with us we'd love to hear from you!
                        </Typography>
                    </Box>
                </Container>

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

            {/* Contact Information Section */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        {/* Visit Us */}
                        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 2,
                                        bgcolor: '#41873C',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3,
                                    }}
                                >
                                    <Icon icon="solar:home-2-bold" width="50" height="50" color="white" />
                                </Box>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        color: 'text.primary',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    VISIT US
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#41873C',
                                        mb: 1,
                                    }}
                                >
                                    123 Farm Road, Taddart, Morocco
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Come see our fields and greenhouses in person!
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Call Us */}
                        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 2,
                                        bgcolor: '#41873C',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3,
                                    }}
                                >
                                    <Icon icon="solar:phone-bold" width="50" height="50" color="white" />
                                </Box>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        color: 'text.primary',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    CALL US
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#41873C',
                                        mb: 1,
                                    }}
                                >
                                    +212 600 123 456
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    We're happy to answer your questions and provide support
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Contact Us (Email) */}
                       <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 2,
                                        bgcolor: '#41873C',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3,
                                    }}
                                >
                                    <Icon icon="solar:letter-bold" width="50" height="50" color="white" />
                                </Box>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        color: 'text.primary',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    CONTACT US
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#41873C',
                                        mb: 1,
                                    }}
                                >
                                    info@WaydGroupe.com
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Send us an email and we'll get back to you promptly
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </Box>
    );
}