'use client';

import { Box, Container, Typography, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRef } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: 'Quality Greenhouse',
    image: '/images/products/image 14.webp',
  },
  {
    id: 2,
    title: 'Fresh Delivery',
    image: '/images/products/image 16.webp',
  },
  {
    id: 3,
    title: 'Premium Harvest',
    image: '/images/products/image 12.webp',
  },
  {
    id: 4,
    title: 'Careful Growth',
    image: '/images/products/image 15.webp',
  },
];

export default function ProductShowcase() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box sx={{ py: { xs: 3, md: 4 }, overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ overflow: 'hidden' }}>
        {/* Header with Navigation Button */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 3,
            mb: 6,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              color: '#2A2A2A',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Request a Quote
          </Typography>
          
          {/* Right Arrow Button */}
          <IconButton
            sx={{
              width: 56,
              height: 56,
              bgcolor: '#2A2A2A',
              color: 'white',
              '&:hover': {
                bgcolor: '#1a1a1a',
              },
            }}
          >
            <Icon icon="solar:arrow-right-outline" width="35" height="35" />
          </IconButton>
        </Box>

        {/* Swiper Carousel */}
        <Box sx={{ position: 'relative', overflow: 'hidden', mx: { xs: -2, sm: 0 } }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
            }}
            style={{ paddingBottom: '60px' }}
          >
            {SHOWCASE_ITEMS.map((item, index) => (
              <SwiperSlide key={item.id}>
                <Box
                  sx={{
                    mt: { xs: 0, md: index % 2 === 0 ? 0 : 12 },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      position: 'relative',
                      height: { xs: 300, md: 500 },
                      borderRadius: 3,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  
                  {/* Title Below Image - Bottom Right */}
                  <Box
                    sx={{
                      mt: 2,
                      textAlign: 'right',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: '#2A2A2A',
                        fontSize: { xs: '1rem', md: '25px' },
                        fontFamily: 'Roboto',
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              display: { xs: 'none', sm: 'flex' }, // Hide on mobile
              gap: 2,
              zIndex: 10,
            }}
          >
            {/* Previous Button */}
            <IconButton
              ref={prevRef}
              sx={{
                width: 48,
                height: 48,
                border: '2px solid #2A2A2A',
                bgcolor: 'white',
                color: '#2A2A2A',
                '&:hover': {
                  bgcolor: '#2A2A2A',
                  color: 'white',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Icon icon="solar:arrow-left-outline" width="20" height="20" />
            </IconButton>

            {/* Next Button */}
            <IconButton
              ref={nextRef}
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#2A2A2A',
                color: 'white',
                border: '2px solid #2A2A2A',
                '&:hover': {
                  bgcolor: '#1a1a1a',
                  borderColor: '#1a1a1a',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Icon icon="solar:arrow-right-outline" width="20" height="20" />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Global Swiper Styles */}
      <style jsx global>{`
        .swiper {
          overflow: visible !important;
        }
        
        .swiper-slide {
          height: auto;
        }
      `}</style>
    </Box>
  );
}