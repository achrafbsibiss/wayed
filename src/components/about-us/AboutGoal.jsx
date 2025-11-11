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
        quote: "We grow with care and share Morocco's best with the world",
        name: 'Omar Bensalah',
        title: 'FOUNDER',
        image: '/images/about/founder.png',
    },
    // Add more testimonials here if needed
];

export default function AboutGoal() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const handlePrev = () => {
        setCurrentTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 6, lg: 8 }}>
                    {/* Main Content */}
                    <Grid size={{ xs: 12, md: 12 }}>
                        {/* Header Section */}
                        <Grid container spacing={{ xs: 4, md: 12 }}>
                            {/* Left - Goal Text */}
                            <Grid size={{ xs: 12, md: 7 }}>
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
                                            OUR GOAL
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
                                        Our goal is to position Morocco as a trusted source of premium
                                        tomatoes on the global market by combining tradition, innovation,
                                        and sustainability. We aim to empower local farmers, implement
                                        the latest farming technologies, and ensure that every harvest
                                        reflects the richness of our land. By maintaining the highest
                                        standards of quality and care, we strive to deliver fresh, healthy,
                                        and reliable produce that connects Moroccan agriculture to tables
                                        worldwide.
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Right - Values Images in Triangle */}
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        height: '100%',
                                        minHeight: { xs: '300px', md: '400px' },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {/* Triangle Layout */}
                                    {VALUES.map((value, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                position: 'absolute',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: 1,
                                                // Triangle positioning
                                                ...(index === 0 && {
                                                    // Top center (Sustainability)
                                                    top: { xs: '0%', md: '5%' },
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                }),
                                                ...(index === 1 && {
                                                    // Bottom left (Innovation)
                                                    bottom: { xs: '5%', md: '10%' },
                                                    left: { xs: '10%', md: '15%' },
                                                }),
                                                ...(index === 2 && {
                                                    // Bottom right (Quality)
                                                    bottom: { xs: '5%', md: '10%' },
                                                    right: { xs: '10%', md: '15%' },
                                                }),
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={value.image}
                                                alt={value.label}
                                                sx={{
                                                    width: { xs: 80, md: 100 },
                                                    height: { xs: 80, md: 100 },
                                                    borderRadius: 2,
                                                    bgcolor: 'white',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '0.95rem',
                                                    color: 'text.primary',
                                                }}
                                            >
                                                {value.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Testimonial Section */}
                        <Box
                            sx={{
                                mt: 8,
                                position: 'relative',
                                minHeight: { xs: '500px', md: '512px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: { xs: '30px', md: 0 },
                                py: { xs: 4, md: 0 },
                            }}
                        >
                            {/* Desktop Layout - Original Design */}
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    position: 'relative',
                                    width: '819px',
                                    height: '512px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* Quote Text */}
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        width: '458px',
                                        top: '70px',
                                        left: '220px',
                                        opacity: 0.6,
                                        color: '#2A2A2A',
                                        fontSize: '40px',
                                        fontFamily: 'Roboto',
                                        fontWeight: 300,
                                        lineHeight: 1.2,
                                        zIndex: 2,
                                    }}
                                >
                                    {TESTIMONIALS[currentTestimonial].quote}
                                </Typography>

                                {/* Opening Quote Mark - Top Left */}
                                <Box
                                    component="img"
                                    src="/images/about/quote-open.png"
                                    alt=""
                                    sx={{
                                        position: 'absolute',
                                        width: '300px',
                                        height: '300px',
                                        left: '8px',
                                        top: '100px',
                                        zIndex: 1,
                                        objectFit: 'contain',
                                    }}
                                />

                                {/* Closing Quote Mark - Bottom Right */}
                                <Box
                                    component="img"
                                    src="/images/about/quote-close.png"
                                    alt=""
                                    sx={{
                                        position: 'absolute',
                                        width: '300px',
                                        height: '300px',
                                        left: '140px',
                                        bottom: '40px',
                                        zIndex: 1,
                                        objectFit: 'contain',
                                    }}
                                />

                                {/* Founder Image */}
                                <Box
                                    component="img"
                                    src={TESTIMONIALS[currentTestimonial].image}
                                    alt={TESTIMONIALS[currentTestimonial].name}
                                    sx={{
                                        position: 'absolute',
                                        width: '166px',
                                        height: '165px',
                                        left: '370px',
                                        top: '220px',
                                        borderRadius: '21px',
                                        objectFit: 'cover',
                                        zIndex: 3,
                                    }}
                                />

                                {/* Founder Name and Title */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: '370px',
                                        top: '390px',
                                        zIndex: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontSize: '20px',
                                            fontFamily: 'Roboto',
                                            fontWeight: 300,
                                        }}
                                    >
                                        {TESTIMONIALS[currentTestimonial].name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontSize: '20px',
                                            fontFamily: 'Roboto',
                                            fontStyle: 'italic',
                                            fontWeight: 500,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {TESTIMONIALS[currentTestimonial].title}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Mobile Layout - New Design (matches image) */}
                            <Box
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                    px: 3,
                                    py: 4,
                                    gap: 3,
                                }}
                            >
                                {/* Large Opening Quote Mark */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        mb: -2,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/images/about/quote-open.png"
                                        alt=""
                                        sx={{
                                            width: '120px',
                                            height: '120px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>

                                {/* Quote Text in Dark Box */}
                                <Box
                                    sx={{
                                        bgcolor: '#2A2A2A',
                                        borderRadius: '20px',
                                        p: 3,
                                        width: '100%',
                                        maxWidth: '400px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '18px',
                                            fontFamily: 'Roboto',
                                            fontWeight: 300,
                                            lineHeight: 1.4,
                                            textAlign: 'center',
                                        }}
                                    >
                                        " {TESTIMONIALS[currentTestimonial].quote} "
                                    </Typography>
                                </Box>

                                {/* Founder Image */}
                                <Box
                                    component="img"
                                    src={TESTIMONIALS[currentTestimonial].image}
                                    alt={TESTIMONIALS[currentTestimonial].name}
                                    sx={{
                                        width: '160px',
                                        height: '160px',
                                        borderRadius: '20px',
                                        objectFit: 'cover',
                                        mt: 2,
                                    }}
                                />

                                {/* Founder Name and Title */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontSize: '18px',
                                            fontFamily: 'Roboto',
                                            fontWeight: 400,
                                        }}
                                    >
                                        {TESTIMONIALS[currentTestimonial].name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontSize: '18px',
                                            fontFamily: 'Roboto',
                                            fontStyle: 'italic',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {TESTIMONIALS[currentTestimonial].title}
                                    </Typography>
                                </Box>

                                {/* Large Closing Quote Mark */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        mt: -2,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/images/about/quote-close.png"
                                        alt=""
                                        sx={{
                                            width: '120px',
                                            height: '120px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Navigation Arrows - Desktop Only */}
                            <IconButton
                                onClick={handlePrev}
                                disabled={TESTIMONIALS.length <= 1}
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    position: 'absolute',
                                    left: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    bgcolor: 'white',
                                    color: '#2A2A2A',
                                    width: '80px',
                                    height: '80px',
                                    '&:hover': {
                                        bgcolor: '#f5f5f5',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    },
                                    '&:disabled': {
                                        opacity: 0.3,
                                    },
                                    zIndex: 4,
                                }}
                            >
                                <Icon icon="solar:alt-arrow-left-linear" width="60" height="60" />
                            </IconButton>

                            <IconButton
                                onClick={handleNext}
                                disabled={TESTIMONIALS.length <= 1}
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    bgcolor: 'white',
                                    color: '#2A2A2A',
                                    width: '80px',
                                    height: '80px',
                                    '&:hover': {
                                        bgcolor: '#f5f5f5',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    },
                                    '&:disabled': {
                                        opacity: 0.3,
                                    },
                                    zIndex: 4,
                                }}
                            >
                                <Icon icon="solar:alt-arrow-right-linear" width="60" height="60" />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}