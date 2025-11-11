'use client';

import { Box, Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const PRODUCTS = {
    tomato: {
        name: 'Tomato',
        variants: [
            { id: 'round', label: 'Round', active: true },
            { id: 'plum', label: 'Plum tomato', active: false },
        ],
        mainImage: '/images/harvest/tomato big.webp',
        sliderImages: [
            '/images/harvest/Rectangle 26.webp',
            '/images/harvest/Rectangle 26.webp',
            '/images/harvest/Rectangle 26.webp',
        ],
        health: {
            servingSize: '1 large',
            servingWeight: '100g',
            calories: 18,
            totalFat: 0,
            saturatedFat: 0,
            transFat: 0,
            protein: 0.9,
            water: 94,
            carbohydrates: 0,
            dietaryFiber: 2,
            sugar: 1,
            vitamins: [
                { name: 'Vitamine A', value: '350μg' },
                { name: 'Vitamine C', value: '14mg' },
                { name: 'Calcium', value: '10mg' },
                { name: 'Iron', value: '0.3mg' },
            ],
            description: 'Packed with essential vitamins and minerals, our tomatoes provide Vitamin A and B, Calcium, and Iron to support a healthy, balanced diet.',
        },
        size: 'LARGE',
        hasSeasonChart: true,
    },
    cucumber: {
        name: 'Cucumber',
        variants: [
            { id: 'regular', label: 'Regular', active: true },
            { id: 'mini', label: 'Mini cucumber', active: false },
        ],
        mainImage: '/images/harvest/big-cucumber.png',
        sliderImages: [
            '/images/harvest/cucumber-card1.png',
            '/images/harvest/cucumber-card1.png',
            '/images/harvest/cucumber-card1.png',
        ],
        health: {
            servingSize: '1 medium',
            servingWeight: '100g',
            calories: 15,
            totalFat: 0,
            saturatedFat: 0,
            transFat: 0,
            protein: 0.7,
            water: 96,
            carbohydrates: 0,
            dietaryFiber: 1,
            sugar: 2,
            vitamins: [
                { name: 'Vitamine K', value: '16.4μg' },
                { name: 'Vitamine C', value: '2.8mg' },
                { name: 'Potassium', value: '147mg' },
                { name: 'Magnesium', value: '13mg' },
            ],
            description: 'Low in calories and high in water content, cucumbers are refreshing and provide essential nutrients for hydration and wellness.',
        },
        size: 'MEDIUM',
        hasSeasonChart: true,
    },
};

export default function HarvestHero() {
    const [activeProduct, setActiveProduct] = useState('tomato');
    const [activeVariant, setActiveVariant] = useState('round');

    const currentProduct = PRODUCTS[activeProduct];

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
                {/* Title */}
                <Typography
                    variant="h1"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        mb: 4,
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        color: '#1a1a1a',
                    }}
                >
                    {currentProduct.name}
                </Typography>

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
                            onClick={() => setActiveVariant(variant.id)}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: '50px',
                                fontSize: '1rem',
                                fontWeight: 500,
                                textTransform: 'none',
                                bgcolor: activeVariant === variant.id ? '#1a1a1a' : 'transparent',
                                color: activeVariant === variant.id ? 'white' : '#1a1a1a',
                                border: activeVariant === variant.id ? 'none' : '2px solid #e5e7eb',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: activeVariant === variant.id ? '#2a2a2a' : '#f9fafb',
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
                        {currentProduct.sliderImages.map((image, index) => (
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
                    height: { xs: '750px', md: '1150px' },
                    mb: { xs: 6, md: 0 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: { xs: '30%', md: '50%' },
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, #C90C12 0%, #A3060B 100%)',
                        zIndex: -1,
                    },
                }}
            >
                {/* Desktop Layout */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'grid' },
                        position: 'relative',
                        gridTemplateColumns: { xs: '1fr', lg: '400px 1fr 400px' },
                        gap: 4,
                        padding: 8,
                        alignItems: 'center',
                        mb: 6,
                        zIndex: 1,
                    }}
                >
                    {/* Left - Health Card */}
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: '0px 4px 28.299999237060547px 2px rgba(0, 0, 0, 0.25)',
                            height: 'fit-content',
                            position: 'relative',
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    color: '#1a1a1a',
                                }}
                            >
                                Health
                            </Typography>

                            {/* Serving Info */}
                            <Box sx={{ mb: 3 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        pb: 2,
                                        borderBottom: '3px solid #1a1a1a',
                                    }}
                                >
                                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                        Serving size {currentProduct.health.servingSize}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {currentProduct.health.servingWeight}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Nutrition Facts */}
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}
                                >
                                    Amount per Serving
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            Calories
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {currentProduct.health.calories}Cal
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid #e5e7eb',
                                            pt: 1,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            Total Fat
                                        </Typography>
                                        <Typography variant="body2">{currentProduct.health.totalFat}g</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            pl: 2,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                            Saturated Fat
                                        </Typography>
                                        <Typography variant="body2">{currentProduct.health.saturatedFat}g</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            pl: 2,
                                            borderTop: '1px solid #e5e7eb',
                                            pt: 1,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                            Trans Fat
                                        </Typography>
                                        <Typography variant="body2">{currentProduct.health.transFat}g</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid #e5e7eb',
                                            pt: 1,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            Protein
                                        </Typography>
                                        <Typography variant="body2">{currentProduct.health.protein}g</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid #e5e7eb',
                                            pt: 1,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            Water
                                        </Typography>
                                        <Typography variant="body2">{currentProduct.health.water}g</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid #e5e7eb',
                                            pt: 1,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            Total Carbohydrate
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            pl: 2,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                            Dietary Fiber
                                        </Typography>
                                        <Typography variant="body2">{currentProduct.health.dietaryFiber}g</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            pl: 2,
                                            borderTop: '1px solid #e5e7eb',
                                            pt: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                            Sugar
                                        </Typography>
                                        <Typography variant="body2">{currentProduct.health.sugar}g</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Vitamins */}
                            <Box
                                sx={{
                                    borderTop: '3px solid #1a1a1a',
                                    pt: 2,
                                    mb: 2,
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 2,
                                }}
                            >
                                {currentProduct.health.vitamins.map((vitamin, index) => (
                                    <Box key={index}>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                            {vitamin.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                            {vitamin.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* Description */}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#6b7280',
                                    lineHeight: 1.6,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {currentProduct.health.description}
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
                            src={currentProduct.mainImage}
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
                            height: { xs: 300, md: 450 },
                            overflow: 'hidden',
                            position: 'relative',
                            '& .swiper-pagination': {
                                bottom: '120px !important',
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
                            {currentProduct.sliderImages.map((image, index) => (
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
                                src={currentProduct.mainImage}
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
                                {currentProduct.size}
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
                            {Object.keys(PRODUCTS).map((productKey) => (
                                <Box
                                    key={productKey}
                                    onClick={() => setActiveProduct(productKey)}
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        bgcolor: activeProduct === productKey ? 'white' : 'rgba(255,255,255,0.4)',
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

                        {/* Health Card */}
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: '0px 4px 28.299999237060547px 2px rgba(0, 0, 0, 0.25)',
                                mb: 4,
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        color: '#1a1a1a',
                                    }}
                                >
                                    Health
                                </Typography>

                                {/* Serving Info */}
                                <Box sx={{ mb: 3 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            pb: 2,
                                            borderBottom: '3px solid #1a1a1a',
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                            Serving size {currentProduct.health.servingSize}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {currentProduct.health.servingWeight}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Nutrition Facts */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}
                                    >
                                        Amount per Serving
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                Calories
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {currentProduct.health.calories}Cal
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                borderTop: '1px solid #e5e7eb',
                                                pt: 1,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                Total Fat
                                            </Typography>
                                            <Typography variant="body2">{currentProduct.health.totalFat}g</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                pl: 2,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                                Saturated Fat
                                            </Typography>
                                            <Typography variant="body2">{currentProduct.health.saturatedFat}g</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                pl: 2,
                                                borderTop: '1px solid #e5e7eb',
                                                pt: 1,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                                Trans Fat
                                            </Typography>
                                            <Typography variant="body2">{currentProduct.health.transFat}g</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                borderTop: '1px solid #e5e7eb',
                                                pt: 1,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                Protein
                                            </Typography>
                                            <Typography variant="body2">{currentProduct.health.protein}g</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                borderTop: '1px solid #e5e7eb',
                                                pt: 1,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                Water
                                            </Typography>
                                            <Typography variant="body2">{currentProduct.health.water}g</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                borderTop: '1px solid #e5e7eb',
                                                pt: 1,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                Total Carbohydrate
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                pl: 2,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                                Dietary Fiber
                                            </Typography>
                                            <Typography variant="body2">{currentProduct.health.dietaryFiber}g</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                pl: 2,
                                                borderTop: '1px solid #e5e7eb',
                                                pt: 1,
                                                mb: 2,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                                Sugar
                                            </Typography>
                                            <Typography variant="body2">{currentProduct.health.sugar}g</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Vitamins */}
                                <Box
                                    sx={{
                                        borderTop: '3px solid #1a1a1a',
                                        pt: 2,
                                        mb: 2,
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: 2,
                                    }}
                                >
                                    {currentProduct.health.vitamins.map((vitamin, index) => (
                                        <Box key={index}>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                                {vitamin.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                                {vitamin.value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Description */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#6b7280',
                                        lineHeight: 1.6,
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {currentProduct.health.description}
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

                    {/* Bottom Info */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            px: { xs: 2, md: 1 },
                            position: 'relative',
                        }}
                    >

                        {currentProduct.hasSeasonChart && (
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'white',
                                    fontWeight: 500,
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                }}
                            >
                                Seasons Chart
                            </Typography>
                        )}
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
                            {currentProduct.size}
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
                        {Object.keys(PRODUCTS).map((productKey) => (
                            <Box
                                key={productKey}
                                onClick={() => setActiveProduct(productKey)}
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: activeProduct === productKey ? 'white' : 'rgba(255,255,255,0.4)',
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