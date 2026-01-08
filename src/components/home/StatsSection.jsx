'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import { STATS } from '@/lib/constants';
import { useEffect, useState, useRef } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

function AnimatedNumber({ value, inView }) {
    const [count, setCount] = useState(0);
    // Extract number from string (e.g., "50+" -> 50)
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

    // Preserve the suffix (e.g., "+") if present in the original value
    const suffix = value.toString().replace(/[0-9]/g, '');
    return <>{inView ? `${count}${suffix}` : value}</>;
}

export default function StatsSection() {
    const { t } = useTranslations();
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
                                        <AnimatedNumber value={t(`stats.${stat.id}.value`)} inView={inView} />
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
                                        {t(`stats.${stat.id}.label`)}
                                    </Typography>

                                    {/* Description with leaf icon */}
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                                        <Box
                                            component="img"
                                            src={stat.image}
                                            alt={t(`stats.${stat.id}.label`)}
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
                                            {t(`stats.${stat.id}.description`)}
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
                                    <span style={{ fontWeight: 700 }}>{t('stats.certifiedQuality.value')}</span> {t('stats.certifiedQuality.label').replace('Moroccan Quality Standards', `\nMoroccan Quality Standards`).split('\n').map((line, i) => i === 0 ? <>{line}<br /></> : line)}
                                    {/* Simplification: Just allow HTML or split manually. The design had a break. 
                                        Original: Certified <br/> Moroccan Quality Standards.
                                        New: t('stats.certifiedQuality.value') + t('stats.certifiedQuality.label')
                                        Let's assume the label translations might need structure or just render straightforwardly.
                                        The original code had: <span style={{ fontWeight: 700 }}>Certified</span> Moroccan<br />Quality Standards
                                        I can put "Moroccan\nQuality Standards" in the translation label or handle it here.
                                        I'll stick to a simpler rendering for now or use the translated string directly.
                                     */}
                                    <span style={{ fontWeight: 700 }}>{t('stats.certifiedQuality.value')}</span>
                                    <br />
                                    {t('stats.certifiedQuality.label')}
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
                                                <AnimatedNumber value={t(`stats.${stat.id}.value`)} inView={inView} />
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
                                                {t(`stats.${stat.id}.label`)}
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
                                src="/images/hero/Mask group.png"
                                alt={t('stats.certifiedQuality.label')}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    width: '100%',
                                    height: '100%',
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
                                    p: { xs: 4, md: 1 },
                                    pl: { xs: 4, md: 2 },
                                    pb: { xs: 4, md: 30 }
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
                                        color: '#2A2A2A',
                                        maxWidth: '350px',
                                        fontFamily: 'Roboto',
                                    }}
                                >
                                    {t('stats.certifiedQuality.value')} <span style={{ fontWeight: 300 }}>{t('stats.certifiedQuality.label')}</span>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}