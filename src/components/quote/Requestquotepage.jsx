'use client';

import { Box, Container, Typography, TextField, Button, Card } from '@mui/material';
import { Icon } from '@iconify/react';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';

export default function RequestQuotePage() {
    const { t } = useTranslations();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        business: '',
        email: '',
        website: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <Box>
            {/* Hero Section with Curved Background Image */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: { xs: '400px', md: '500px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    pt: { xs: '96px', md: '90px' },
                    pb: { xs: 8, md: 12 },
                }}
            >
                {/* Background Container with Eye/Ellipse Shape */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        overflow: 'hidden',
                    }}
                >
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
                            alt="Request a Quote"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        {/* Overlay */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 15%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
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
                                fontWeight: 900,
                                mb: 1,
                                fontSize: { xs: '2.5rem', sm: '3rem', md: '5rem' },
                                lineHeight: 1,
                                color: 'white',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                            }}
                        >
                            {t('quote.heroTitle')}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                color: 'white',
                                fontWeight: 400,
                                fontSize: { xs: '1rem', md: '1.2rem' },
                                lineHeight: 1.6,
                                maxWidth: '573px',
                                mx: 'auto',
                                px: 2,
                                textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
                            }}
                        >
                            {t('quote.heroDescription')}
                        </Typography>

                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -60,
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <Image
                                src="/images/hero/decorative-left.png"
                                alt="Decorative Element"
                                width={70}
                                height={60}
                            />
                        </Box>
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

            {/* Form Section */}
            <Box sx={{ py: { xs: 6, md: 10 } }}>
                <Container maxWidth="md">
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 1,
                                color: 'text.primary',
                            }}
                        >
                            {t('quote.form.aboutYourself')}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.95rem',
                            }}
                        >
                            {t('quote.form.aboutYourselfDescription')}
                        </Typography>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            bgcolor: 'white',
                            p: { xs: 3, md: 5 },
                            borderRadius: 3,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                    >
                        {/* Name Fields */}
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 1,
                                        color: 'text.primary',
                                    }}
                                >
                                    {t('quote.form.nameLabel')}
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="firstName"
                                    placeholder={t('quote.form.firstPlaceholder')}
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: '#f9f9f9',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 1,
                                        color: 'transparent',
                                        userSelect: 'none',
                                    }}
                                >
                                    .
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="lastName"
                                    placeholder={t('quote.form.lastPlaceholder')}
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: '#f9f9f9',
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {/* Business/Organisation */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: 'text.primary',
                                }}
                            >
                                {t('quote.form.businessLabel')}
                            </Typography>
                            <TextField
                                fullWidth
                                name="business"
                                value={formData.business}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: '#f9f9f9',
                                    },
                                }}
                            />
                        </Box>

                        {/* Email */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: 'text.primary',
                                }}
                            >
                                {t('quote.form.emailLabel')}
                            </Typography>
                            <TextField
                                fullWidth
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: '#f9f9f9',
                                    },
                                }}
                            />
                        </Box>

                        {/* Website */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: 'text.primary',
                                }}
                            >
                                {t('quote.form.websiteLabel')}
                            </Typography>
                            <TextField
                                fullWidth
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: '#f9f9f9',
                                    },
                                }}
                            />
                        </Box>

                        {/* Text/Message */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: 'text.primary',
                                }}
                            >
                                {t('quote.form.textLabel')}
                            </Typography>
                            <TextField
                                fullWidth
                                name="message"
                                multiline
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: '#f9f9f9',
                                    },
                                }}
                            />
                        </Box>

                        {/* Submit Button */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: '#2A2A2A',
                                    color: 'white',
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: '50px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    '&:hover': {
                                        bgcolor: '#1a1a1a',
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {t('quote.form.submitButton')}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Contact Information Section */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
                <Container>
                    <Grid container spacing={6} alignItems="stretch">
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
                                    {t('contact.visitUs.title')}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#41873C',
                                        mb: 1,
                                    }}
                                >
                                    {t('contact.visitUs.address')}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {t('contact.visitUs.description')}
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
                                    {t('contact.callUs.title')}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#41873C',
                                        mb: 1,
                                    }}
                                >
                                    {t('contact.callUs.phone')}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {t('contact.callUs.description')}
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
                                    {t('contact.emailUs.title')}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#41873C',
                                        mb: 1,
                                    }}
                                >
                                    {t('contact.emailUs.email')}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {t('contact.emailUs.description')}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}