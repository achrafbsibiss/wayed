'use client';

import { Box, Container, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const VALUES = [
    {
        image: '/images/about/sustainability.png',
        label: 'Sustainability',
    },
    {
        image: '/images/about/innovation.png',
        label: 'Innovation',
    },
    {
        image: '/images/about/quality.png',
        label: 'Quality',
    },
];

const TESTIMONIALS = [
    {
        id: 1,
        quote: "Working with GLOBALG.A.P standards since 1997, I have seen the change they've brought not only from the food safety perspective that is so important to consumers, but also as a practical tool that helps improve social and environmental aspects in the lives of smallholders all over the world.",
        name: 'OMAR BENSALAH',
        title: 'Founder and general manager of Wayd groupe',
        image: '/images/about/founder.png',
    },
];

export default function CertificatesHero() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Header Section */}
                    <Grid size={{ xs: 12 }}>
                        <Typography
                            variant="h1"
                            sx={{
                                mb: 4,
                                fontWeight: 700,
                                fontSize: { xs: '2rem', md: '64px' },
                                color: 'text.primary',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                                marginBottom: { xs: 4, md: 8 },
                            }}
                        >
                            Certification
                        </Typography>
                    </Grid>

                    {/* Left - Goal Text */}
                    <Grid size={{ xs: 12, md: 6 }}>
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
                                    Global G.A.P
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        height: '2px',
                                        bgcolor: 'text.primary',
                                        maxWidth: '200px',
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

                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.95rem', md: '20px' },
                                }}
                            >
                                Fostering the global adoption of safer and more responsible farming practices is a collective effort, which is why GLOBALG.A.P. works with a global network of stakeholder parties. Through working groups, capacity-building partners, and more than 440 member organizations from all sides of the value chain in our GLOBALG.A.P. community, we strive to connect with as many contributors as possible.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right - one unique image */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            component="img"
                            src="/images/certificates/globalegap-green.png"
                            sx={{
                                width: { xs: '100%', md: '318px' },
                                height: { xs: 'auto', md: '318px' },
                                objectFit: 'cover',
                                marginLeft: { xs: '0', md: 'auto' },
                                display: 'block',
                            }}
                        />
                    </Grid>

                    {/* Testimonial Section */}
                    <Grid size={{ xs: 12 }}>
                        <Box
                            sx={{
                                mt: 8,
                                position: 'relative',
                                minHeight: { xs: '500px', md: '600px' },
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Main Content Container */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '900px',
                                    height: { xs: 'auto', md: '600px' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: { xs: 2, md: 4 },
                                }}
                            >
                                {/* Opening Quote Mark - Left Side */}
                                <Box
                                    component="img"
                                    src="/images/certificates/quotation-green.png"
                                    alt=""
                                    sx={{
                                        position: 'absolute',
                                        width: { xs: '180px', md: '167px' },
                                        height: { xs: '180px', md: '145px' },
                                        left: { xs: '0', md: '140px' },
                                        top: { xs: '20px', md: '20px' },
                                        zIndex: 1,
                                        objectFit: 'contain',
                                    }}
                                />

                                {/* Quote Text - Middle Right */}
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        width: { xs: '85%', md: '550px' },
                                        top: { xs: '120px', md: '80px' },
                                        left: { xs: '15%', md: '250px' },
                                        color: '#2A2A2A',
                                        fontSize: { xs: '18px', md: '24px' },
                                        fontFamily: 'Roboto',
                                        fontWeight: 500,
                                        zIndex: 2,
                                    }}
                                >
                                    {TESTIMONIALS[currentTestimonial].quote}
                                </Typography>

                                {/* Founder Section - Bottom */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: { xs: '50%', md: '250px' },
                                        bottom: { xs: '20px', md: '150px' },
                                        transform: { xs: 'translateX(-50%)', md: 'none' },
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    {/* Founder Image */}
                                    <Box
                                        component="img"
                                        src={TESTIMONIALS[currentTestimonial].image}
                                        alt={TESTIMONIALS[currentTestimonial].name}
                                        sx={{
                                            width: { xs: '60px', md: '80px' },
                                            height: { xs: '60px', md: '80px' },
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />

                                    {/* Founder Name and Title */}
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: 'black',
                                                fontSize: { xs: '14px', md: '16px' },
                                                fontFamily: 'Roboto',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                mb: 0.5,
                                            }}
                                        >
                                            {TESTIMONIALS[currentTestimonial].name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#666',
                                                fontSize: { xs: '12px', md: '14px' },
                                                fontFamily: 'Roboto',
                                                fontWeight: 400,
                                            }}
                                        >
                                            {TESTIMONIALS[currentTestimonial].title}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Left - certificate Text */}
                    <Grid size={{ xs: 12, md: 6 }}>
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
                                    Certificat 2
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        height: '2px',
                                        bgcolor: 'text.primary',
                                        maxWidth: '200px',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                    }}
                                >
                                    02
                                </Typography>
                            </Box>

                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.95rem', md: '20px' },
                                }}
                            >
                                Fostering the global adoption of safer and more responsible farming practices is a collective effort, which is why GLOBALG.A.P. works with a global network of stakeholder parties. Through working groups, capacity-building partners, and more than 440 member organizations from all sides of the value chain in our GLOBALG.A.P. community, we strive to connect with as many contributors as possible.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right - one unique image */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            component="img"
                            src="/images/certificates/globalegap-black.png"
                            sx={{
                                width: { xs: '100%', md: '318px' },
                                height: { xs: 'auto', md: '318px' },
                                objectFit: 'cover',
                                marginLeft: { xs: '0', md: 'auto' },
                                display: 'block',
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}