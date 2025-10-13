'use client';

import { Box, Container, Typography, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const SLIDES = [
    {
        id: 1,
        title: 'We Use Technology',
        subtitle: 'To Grow And Export Morocco\'s Finest Tomatoes With Quality.',
        image: '/images/technology/image-technology.webp',
        description: 'Modern farming techniques combined with traditional knowledge',
    },
    //   {
    //     id: 2,
    //     title: 'Sustainable Farming',
    //     subtitle: 'Protecting Our Land For Future Generations',
    //     image: '/images/technology/sustainable.jpg',
    //     description: 'Eco-friendly practices that preserve soil health',
    //   },
    //   {
    //     id: 3,
    //     title: 'Quality Control',
    //     subtitle: 'Every Tomato Meets Our High Standards',
    //     image: '/images/technology/quality.jpg',
    //     description: 'Rigorous testing and inspection at every stage',
    //   },
];

export default function TechnologySection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        position: 'relative',
                        height: { xs: 400, md: 600 },
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    }}
                >
                    {/* Background Image with Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${SLIDES[currentSlide].image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'all 0.5s ease',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
                            },
                        }}
                    />

                    {/* Content */}
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'flex-start',
                            pt: { xs: 4, md: 8 },
                            px: { xs: 3, md: 8 },
                        }}
                    >
                        <Box sx={{ maxWidth: 600, color: 'white' }}>
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    mb: 0,
                                    fontSize: { xs: '2rem', md: '45px' },
                                    fontFamily: 'Roboto',
                                    lineHeight: 1.2,
                                    animation: 'fadeInLeft 0.6s ease-out',
                                }}
                            >
                                We Use <span style={{ fontWeight: 700 }}>Technology</span>
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 300,
                                    mt: 1,
                                    fontSize: { xs: '1.1rem', md: '40px' },
                                    fontFamily: 'Roboto',
                                    lineHeight: 1.2,
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
                                    animation: 'fadeInLeft 0.6s ease-out 0.2s backwards',
                                }}
                            >
                                {SLIDES[currentSlide].subtitle}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Navigation Arrows */}
                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            left: 20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.3)',
                            },
                            zIndex: 2,
                        }}
                    >
                        <Icon icon="solar:alt-arrow-left-bold" width="24" height="24" />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: 20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.3)',
                            },
                            zIndex: 2,
                        }}
                    >
                        <Icon icon="solar:alt-arrow-right-bold" width="24" height="24" />
                    </IconButton>

                    {/* Slide Indicators */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 30,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: 2,
                            zIndex: 2,
                        }}
                    >
                        {SLIDES.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                sx={{
                                    width: currentSlide === index ? 40 : 12,
                                    height: 12,
                                    borderRadius: 6,
                                    bgcolor: currentSlide === index ? 'primary.main' : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: currentSlide === index ? 'primary.dark' : 'rgba(255,255,255,0.8)',
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <style jsx global>{`
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
            </Container>
        </Box>
    );
}