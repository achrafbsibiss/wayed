'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Chip, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Icon } from '@iconify/react';

export default function HarvestHero() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeProduct, setActiveProduct] = useState(null);
    const [activeVariant, setActiveVariant] = useState(null);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev, 0 for variant change

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setProducts(data.data);
                    setActiveProduct(data.data[0].slug);
                    setActiveVariant(data.data[0].variants[0]?.variant_id);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!activeProduct || products.length === 0) return null;

    const currentProduct = products.find(p => p.slug === activeProduct);
    if (!currentProduct) return null;

    const currentVariantData = currentProduct.variants.find(v => v.variant_id === activeVariant) || currentProduct.variants[0];

    const handleProductChange = (productSlug, animDirection) => {
        const newProduct = products.find(p => p.slug === productSlug);
        if (newProduct) {
            setDirection(animDirection);
            setActiveProduct(productSlug);
            setActiveVariant(newProduct.variants[0]?.variant_id);
        }
    };

    const handleVariantChange = (variantId) => {
        setDirection(0);
        setActiveVariant(variantId);
    };

    // Helper to get mapped variant data structure for rendering
    // This maps the API structure to the props used in the JSX below
    const activeVariantProps = {
        mainImage: currentVariantData?.main_image_url,
        sliderImages: currentVariantData?.slider_images || [],
        size: currentVariantData?.size,
        description: currentVariantData?.description,
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                pt: { xs: 12, md: 16 },
                pb: { xs: 8, md: 12 },
                position: 'relative',
                zIndex: 1,
            }}
        >
            <Container>
                {/* Title with Product Navigation */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: { xs: 2, md: 4 },
                        mb: 4,
                    }}
                >
                    {/* Previous Product Arrow */}
                    <Button
                        onClick={() => {
                            const productSlugs = products.map(p => p.slug);
                            const currentIndex = productSlugs.indexOf(activeProduct);
                            const prevIndex = currentIndex === 0 ? productSlugs.length - 1 : currentIndex - 1;
                            handleProductChange(productSlugs[prevIndex], -1);
                        }}
                        sx={{
                            minWidth: 'auto',
                            width: { xs: 40, md: 50 },
                            height: { xs: 40, md: 50 },
                            borderRadius: '50%',
                            color: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: '#e5e7eb',
                                transform: 'scale(1.1)',
                            },
                            '& svg': { flexShrink: 0 },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Icon icon="solar:alt-arrow-left-bold-duotone" width={24} height={24} />
                    </Button>

                    {/* Product Title */}
                    <Typography
                        variant="h1"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            color: '#1a1a1a',
                            minWidth: { xs: '200px', md: '300px' },
                        }}
                    >
                        {currentProduct.name}
                    </Typography>

                    {/* Next Product Arrow */}
                    <Button
                        onClick={() => {
                            const productSlugs = products.map(p => p.slug);
                            const currentIndex = productSlugs.indexOf(activeProduct);
                            const nextIndex = currentIndex === productSlugs.length - 1 ? 0 : currentIndex + 1;
                            handleProductChange(productSlugs[nextIndex], 1);
                        }}
                        sx={{
                            minWidth: 'auto',
                            width: { xs: 40, md: 50 },
                            height: { xs: 40, md: 50 },
                            borderRadius: '50%',
                            color: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: '#e5e7eb',
                                transform: 'scale(1.1)',
                            },
                            '& svg': { flexShrink: 0 },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Icon icon="solar:alt-arrow-right-bold-duotone" width={24} height={24} />
                    </Button>
                </Box>

                {/* Variant Tabs */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 8,
                    }}
                >
                    {currentProduct.variants.map((variant) => (
                        <Button
                            key={variant.id}
                            onClick={() => handleVariantChange(variant.variant_id)}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: '50px',
                                fontSize: '1rem',
                                fontWeight: 500,
                                textTransform: 'none',
                                bgcolor: activeVariant === variant.variant_id ? '#1a1a1a' : 'transparent',
                                color: activeVariant === variant.variant_id ? 'white' : '#1a1a1a',
                                border: activeVariant === variant.variant_id ? 'none' : '2px solid #e5e7eb',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: activeVariant === variant.variant_id ? '#2a2a2a' : '#f9fafb',
                                },
                            }}
                        >
                            {variant.label}
                        </Button>
                    ))}
                </Box>

                {/* Mobile Layout - Image Slider at Top with Coverflow Effect */}
                <Box
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        mb: 4,
                        '& .swiper': {
                            width: '100%',
                            paddingTop: '30px',
                            paddingBottom: '50px',
                        },
                        '& .swiper-slide': {
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            width: '280px',
                            height: '200px',
                        },
                        '& .swiper-slide img': {
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '20px',
                        },
                        '& .swiper-pagination': {
                            bottom: '10px !important',
                        },
                    }}
                >
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                    >
                        {activeVariantProps.sliderImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    component="img"
                                    src={image}
                                    alt={`${currentProduct.name} ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>

            </Container>

            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '750px', md: '900px' },
                    mb: { xs: 6, md: 0 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: { xs: '30%', md: '45%' },
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, #C90C12 0%, #A3060B 100%)',
                        zIndex: -1,
                    },
                }}
            >
                {/* Desktop Layout */}
                <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`${activeProduct}-${activeVariant}`}
                            custom={direction}
                            initial={{
                                opacity: 0,
                                x: direction === 1 ? 300 : direction === -1 ? -300 : 0,
                                scale: direction === 0 ? 0.95 : 1
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                scale: 1
                            }}
                            exit={{
                                opacity: 0,
                                x: direction === 1 ? -300 : direction === -1 ? 300 : 0,
                                scale: direction === 0 ? 0.95 : 1
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0.0, 0.2, 1]
                            }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '400px 1fr 400px',
                                gap: '32px',
                                padding: '64px',
                                alignItems: 'center',
                                marginBottom: '48px',
                                zIndex: 1
                            }}
                        >
                            {/* Left - Insight Card */}
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: '0px 4px 28.299999237060547px 2px rgba(0, 0, 0, 0.25)',
                                    height: 'fit-content',
                                    position: 'relative',
                                    bgcolor: 'white',
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 3,
                                            color: '#1a1a1a',
                                            fontStyle: 'italic',
                                            fontSize: '2rem',
                                        }}
                                    >
                                        INSIGHT
                                    </Typography>

                                    {/* Description */}
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#1a1a1a',
                                            lineHeight: 1.8,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {activeVariantProps.description}
                                    </Typography>
                                </CardContent>
                            </Card>

                            {/* Center - Main Product Image */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={activeVariantProps.mainImage}
                                    alt={currentProduct.name}
                                    sx={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        maxHeight: '500px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                                        animation: 'fadeIn 0.5s ease-in',
                                    }}
                                />
                            </Box>

                            {/* Right - Image Slider */}
                            <Box
                                sx={{
                                    height: { xs: 300, md: 500 },
                                    overflow: 'hidden',
                                    position: 'relative',
                                    '& .swiper-pagination': {
                                        bottom: '170px !important',
                                        left: '45% !important',
                                        transform: 'translateX(-110%) !important',
                                        width: 'auto !important',
                                    },
                                }}
                            >
                                <Swiper
                                    modules={[Pagination, Autoplay]}
                                    pagination={{ clickable: true }}
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    loop
                                    style={{ height: '100%' }}
                                >
                                    {activeVariantProps.sliderImages.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <Box
                                                component="img"
                                                src={image}
                                                alt={`${currentProduct.name} ${index + 1}`}
                                                sx={{
                                                    height: '300px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Mobile Layout - Main Product Image, Button, Size, Health Card */}
                <Container sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Box sx={{ position: 'relative' }}>
                        {/* Main Product Image */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: 4,
                                px: 2,
                            }}
                        >
                            <Box
                                component="img"
                                src={activeVariantProps.mainImage}
                                alt={currentProduct.name}
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    maxHeight: '400px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                                }}
                            />
                        </Box>

                        {/* Request a Quote Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: '50px',
                                    bgcolor: '#1a1a1a',
                                    color: 'white',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    '&:hover': {
                                        bgcolor: '#2a2a2a',
                                        transform: 'scale(1.05)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Request a Quote
                            </Button>
                        </Box>

                        {/* Size Label */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: 4,
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 700,
                                    color: 'white',
                                    fontSize: '3rem',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                }}
                            >
                                {activeVariantProps.size}
                            </Typography>
                        </Box>

                        {/* Pagination Dots */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1,
                                mb: 6,
                            }}
                        >
                            {products.map((p) => (
                                <Box
                                    key={p.slug}
                                    onClick={() => setActiveProduct(p.slug)}
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        bgcolor: activeProduct === p.slug ? 'white' : 'rgba(255,255,255,0.4)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'white',
                                            transform: 'scale(1.2)',
                                        },
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Insight Card */}
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: '0px 4px 28.299999237060547px 2px rgba(0, 0, 0, 0.25)',
                                mb: 4,
                                bgcolor: 'white',
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        color: '#1a1a1a',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    INSIGHT
                                </Typography>

                                {/* Description */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#1a1a1a',
                                        lineHeight: 1.8,
                                        fontWeight: 600,
                                    }}
                                >
                                    {activeVariantProps.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>

                {/* Desktop Request a Quote Button and Bottom Info */}
                <Container sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6, position: 'relative' }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                px: 6,
                                py: 2,
                                borderRadius: '50px',
                                bgcolor: '#1a1a1a',
                                color: 'white',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                '&:hover': {
                                    bgcolor: '#2a2a2a',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Request a Quote
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            px: { xs: 2, md: 8 },
                            position: 'relative',
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                color: 'white',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            }}
                        >
                            {activeVariantProps.size}
                        </Typography>
                    </Box>

                    {/* Pagination Dots */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                            mt: 2,
                            position: 'relative',
                        }}
                    >
                        {products.map((p) => (
                            <Box
                                key={p.slug}
                                onClick={() => setActiveProduct(p.slug)}
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: activeProduct === p.slug ? 'white' : 'rgba(255,255,255,0.4)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: 'white',
                                        transform: 'scale(1.2)',
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Container>
            </Box>

            <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .swiper-pagination-bullet {
          background: #2A2A2A !important;
          opacity: 36%;
        }

        .swiper-pagination-bullet-active {
          background: #2A2A2A !important;
          opacity: 100%;
        }
      `}</style>
        </Box>
    );
}