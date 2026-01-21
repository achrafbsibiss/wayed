'use client';

import { Box, Container, Typography, IconButton, Alert, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useTranslations } from '@/hooks/useTranslations';

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

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

export default function CertificatesHero() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { locale } = useTranslations();

    // Helper function to get translated text with fallback
    const getTranslatedText = (translationObj) => {
        if (!translationObj) return '';
        // Return current locale, fallback to English, or empty string
        return translationObj[locale] || translationObj.en || '';
    };

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

    const downloadCertificate = async (certificate) => {
        try {
            // If a PDF file is available, download it directly
            if (certificate.pdf_file) {
                // Create a temporary link to trigger download
                const link = document.createElement('a');
                link.href = certificate.pdf_file;
                link.download = `${certificate.title}.pdf`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Fallback: Convert image to PDF if no PDF file is uploaded
                const imageSrc = certificate.image_url;
                const certificateName = certificate.title;

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
            }
        } catch (error) {
            console.error('Error downloading certificate:', error);
        }
    };

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Header Section */}
                    <Grid size={{ xs: 12 }}>
                        {loading ? (
                            <Box sx={{ textAlign: 'center', marginBottom: { xs: 4, md: 8 } }}>
                                <Skeleton
                                    variant="text"
                                    width={400}
                                    height={100}
                                    sx={{
                                        mx: 'auto',
                                        borderRadius: 2,
                                        transform: 'scale(1)',
                                    }}
                                />
                            </Box>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
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
                            </motion.div>
                        )}
                    </Grid>

                    {/* Error State */}
                    {error && (
                        <Grid size={{ xs: 12 }}>
                            <Alert severity="error" sx={{ mb: 4 }}>
                                {error}
                            </Alert>
                        </Grid>
                    )}

                    {/* Content */}
                    {!loading && !error && (
                        <>
                            {/* Dynamic Certificate Sections */}
                            {certificates.map((certificate, index) => (
                                <motion.div
                                    key={certificate.id}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={staggerContainer}
                                    style={{ width: '100%' }}
                                >
                                    <Grid container spacing={4} sx={{ mt: 4 }}>
                                        {/* Left - Certificate Text */}
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <motion.div variants={fadeInUp}>
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
                                                            {getTranslatedText(certificate.title)}
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
                                                        {getTranslatedText(certificate.description)}
                                                    </Typography>
                                                </Box>
                                            </motion.div>
                                        </Grid>

                                        {/* Right - Certificate Image */}
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <motion.div
                                                variants={scaleIn}
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        width: { xs: '100%', md: '318px' },
                                                        marginLeft: { xs: '0', md: 'auto' },
                                                        display: 'block',
                                                        borderRadius: 2,
                                                        overflow: 'hidden',
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
                                                        onClick={() => downloadCertificate(certificate)}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 16,
                                                            right: 16,
                                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                                            },
                                                            transition: 'background-color 0.3s ease',
                                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                                        }}
                                                    >
                                                        <Icon icon="mdi:download" width={24} height={24} color="#4CAF50" />
                                                    </IconButton>
                                                </Box>
                                            </motion.div>
                                        </Grid>

                                        {/* Testimonial Section - Show after first certificate */}
                                        {index === 0 && TESTIMONIALS.length > 0 && (
                                            <Grid size={{ xs: 12 }}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 40 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                >
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
                                                </motion.div>
                                            </Grid>
                                        )}
                                    </Grid>
                                </motion.div>
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
                        </>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}