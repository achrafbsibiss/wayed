'use client';

import { Box, Container, Typography, IconButton, CircularProgress, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch certificates from API
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await fetch('/api/certificates');
                const data = await res.json();

                if (data.success) {
                    setCertificates(data.data);
                } else {
                    setError('Failed to load certificates');
                }
            } catch (err) {
                setError('An error occurred while loading certificates');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    const downloadCertificate = async (imageSrc, certificateName) => {
        try {
            // Create a temporary container for the certificate
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.width = '800px';
            tempContainer.style.padding = '40px';
            tempContainer.style.backgroundColor = 'white';
            document.body.appendChild(tempContainer);

            // Create image element
            const img = document.createElement('img');
            img.src = imageSrc;
            img.style.width = '100%';
            img.style.height = 'auto';
            tempContainer.appendChild(img);

            // Wait for image to load
            await new Promise((resolve) => {
                img.onload = resolve;
            });

            // Convert to canvas
            const canvas = await html2canvas(tempContainer, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            });

            // Create PDF
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Download PDF
            pdf.save(`${certificateName}.pdf`);

            // Clean up
            document.body.removeChild(tempContainer);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                )}

                {/* Content */}
                {!loading && !error && (
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

                        {/* Dynamic Certificate Sections */}
                        {certificates.map((certificate, index) => (
                            <Grid container spacing={4} key={certificate.id} sx={{ mt: 4 }}>
                                {/* Left - Certificate Text */}
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
                                                {certificate.title}
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
                                                {String(index + 1).padStart(2, '0')}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: { xs: '0.95rem', md: '20px' },
                                            }}
                                        >
                                            {certificate.description}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Right - Certificate Image */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: { xs: '100%', md: '318px' },
                                            marginLeft: { xs: '0', md: 'auto' },
                                            display: 'block',
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={certificate.image_url}
                                            alt={certificate.title}
                                            sx={{
                                                width: '100%',
                                                height: { xs: 'auto', md: '318px' },
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => downloadCertificate(certificate.image_url, certificate.title)}
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                                    transform: 'scale(1.1)',
                                                },
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                            }}
                                        >
                                            <Icon icon="mdi:download" width={24} height={24} color="#4CAF50" />
                                        </IconButton>
                                    </Box>
                                </Grid>

                                {/* Testimonial Section - Show after first certificate */}
                                {index === 0 && TESTIMONIALS.length > 0 && (
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
                                )}
                            </Grid>
                        ))}

                        {/* Empty State */}
                        {certificates.length === 0 && (
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ textAlign: 'center', py: 8 }}>
                                    <Typography variant="h5" color="text.secondary">
                                        No certificates available at the moment.
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}