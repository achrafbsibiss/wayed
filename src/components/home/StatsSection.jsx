'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import { STATS } from '@/lib/constants';
import { useEffect, useState, useRef } from 'react';

function AnimatedNumber({ value, inView }) {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value);

    useEffect(() => {
        if (inView && numericValue) {
            let start = 0;
            const duration = 2000;
            const increment = numericValue / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= numericValue) {
                    setCount(numericValue);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [inView, numericValue]);

    return <>{inView ? `${count}+` : value}</>;
}

export default function StatsSection() {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <Box
            ref={ref}
            sx={{
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 3, md: 8 }} alignItems="center">
                    {/* Stats list - Order 2 on mobile (hidden), 1 on desktop */}
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: { xs: 'none', sm: 'flex' }, order: { xs: 2, sm: 1 } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { xs: 4, md: 5 },
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            {STATS.map((stat, index) => (
                                <Box key={index}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontWeight: 500,
                                            color: '#2A2A2A',
                                            mb: 0.5,
                                            fontSize: { xs: '2.5rem', md: '55px' },
                                            lineHeight: 1.1,
                                            fontFamily: 'Roboto',
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        <AnimatedNumber value={stat.value} inView={inView} />
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 500,
                                            mb: 1,
                                            color: '#2A2A2A',
                                            fontSize: { xs: '1rem', md: '18px' },
                                            fontFamily: 'Roboto',
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>

                                    {/* Description with leaf icon */}
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                                        <Box
                                            component="img"
                                            src={stat.image || "/images/hero/decorative-leaf.png"}
                                            alt={stat.label}
                                            sx={{
                                                width: { xs: 40, md: 43 },
                                                height: { xs: 40, md: 19 },
                                                objectFit: 'contain',
                                                mt: 1,
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#2A2A2A',
                                                opacity: 0.6,
                                                fontSize: { xs: '0.9rem', md: '18px' },
                                                fontFamily: 'Roboto',
                                                fontWeight: 400,
                                            }}
                                        >
                                            {stat.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Mobile-only centered stats card */}
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: { xs: 'flex', sm: 'none' }, order: 1 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: 400,
                                borderRadius: '35px',
                                overflow: 'hidden',
                                boxShadow: 'none',
                                flex: 1,
                            }}
                        >
                            {/* Content centered for mobile view */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    zIndex: 1,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    p: 4,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: '#2A2A2A',
                                        fontWeight: 500,
                                        textAlign: 'center',
                                        mb: 4,
                                        fontSize: '1.75rem',
                                        lineHeight: 1.2,
                                        fontFamily: 'Roboto',
                                    }}
                                >
                                    <span style={{ fontWeight: 700 }}>Certified</span> Moroccan<br />Quality Standards
                                </Typography>

                                {/* Stats display in mobile view */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 3,
                                        width: '100%',
                                    }}
                                >
                                    {STATS.map((stat, index) => (
                                        <Box key={index} sx={{ textAlign: 'center' }}>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#2A2A2A',
                                                    mb: 0.5,
                                                    fontSize: '3rem',
                                                    lineHeight: 1.1,
                                                    fontFamily: 'Roboto',
                                                }}
                                            >
                                                <AnimatedNumber value={stat.value} inView={inView} />
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 400,
                                                    color: '#2A2A2A',
                                                    fontSize: '0.9rem',
                                                    fontFamily: 'Roboto',
                                                }}
                                            >
                                                {stat.label}
                                            </Typography>
                                            {index < STATS.length - 1 && (
                                                <Box
                                                    sx={{
                                                        width: '60px',
                                                        height: '1px',
                                                        bgcolor: '#2A2A2A',
                                                        opacity: 0.3,
                                                        mx: 'auto',
                                                        mt: 2,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Desktop certification card with background image */}
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ display: { xs: 'none', sm: 'flex' }, order: 2 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: { xs: 400, md: 500 },
                                borderRadius: '35px',
                                overflow: 'hidden',
                                boxShadow: 'none',
                                flex: 1,
                            }}
                        >
                            {/* Background Image */}
                            <Box
                                component="img"
                                src="/images/hero/quality-badge.webp"
                                alt="Certified Moroccan Quality"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />

                            {/* Gradient overlay for text readability */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
                                }}
                            />

                            {/* Text Content - Positioned on LEFT */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    zIndex: 1,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    p: { xs: 4, md: 5 },
                                    pl: { xs: 4, md: 6 },
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 500,
                                        textAlign: 'left',
                                        mb: 0,
                                        fontSize: { xs: '2rem', md: '55px' },
                                        lineHeight: 1.2,
                                        textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                                        maxWidth: '350px',
                                        fontFamily: 'Roboto',
                                    }}
                                >
                                    Certified <span style={{ fontWeight: 300 }}>Moroccan Quality Standards</span>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}