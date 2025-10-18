'use client';

import { Box, Container, Typography } from '@mui/material';

export default function MissionPhilosophySection() {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                {/* Main Content Container */}
                <Box
                    sx={{
                        position: 'relative',
                        minHeight: { xs: '1000px', md: '800px' },
                    }}
                >
                    {/* Center Text */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            maxWidth: '500px',
                            zIndex: 2,
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                mb: 3,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                color: 'text.primary',
                            }}
                        >
                            Our Mission / Philosophy
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '1rem', md: '24px' },
                                fontWeight: 400,
                                horizontalAlign: 'center',
                            }}
                        >
                            Our mission is to balance productivity with responsibility. From seed to harvest, every step we take is guided by care for the land, the farmer, and the future
                        </Typography>
                    </Box>

                    {/* Arrows Vector - All arrows in one image */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '95%', md: '100%' },
                            height: { xs: '95%', md: '100%' },
                            zIndex: 0,
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/Vector 1.png"
                            alt=""
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>

                    {/* Image 1 - Top Left (Hands with seedling) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: { xs: '0', md: '70px' },
                            left: { xs: '10%', md: '-8%' },
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 43.webp"
                            alt="Hands holding seedling"
                            sx={{
                                width: { xs: '140px', md: '243px' },
                                height: { xs: '140px', md: '217px' },
                            }}
                        />
                    </Box>

                    {/* Image 2 - Top Center (Soil close-up) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: { xs: '20px', md: '5px' },
                            left: { xs: '50%', md: '50%' },
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 47.webp"
                            alt="Soil close-up"
                            sx={{
                                width: { xs: '160px', md: '360px' },
                                height: { xs: '120px', md: '250px' },
                            }}
                        />
                    </Box>

                    {/* Image 3 - Top Right (Tomatoes on vine) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: { xs: '150px', md: '250px' },
                            right: { xs: '5%', md: '-10%' },
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 44.webp"
                            alt="Tomatoes on vine"
                            sx={{
                                width: { xs: '140px', md: '231px' },
                                height: { xs: '140px', md: '264px' },
                            }}
                        />
                    </Box>

                    {/* Image 4 - Bottom Right (Greenhouse aerial) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: '150px', md: '-35px' },
                            right: { xs: '15%', md: '25%' },
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 46.webp"
                            alt="Greenhouse aerial view"
                            sx={{
                                width: { xs: '140px', md: '244px' },
                                height: { xs: '100px', md: '238px' },
                            }}
                        />
                    </Box>

                    {/* Image 5 - Bottom Left (Farm field aerial) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: '50px', md: '5px' },
                            left: { xs: '8%', md: '-5%' },
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 45.webp"
                            alt="Farm field aerial view"
                            sx={{
                                width: { xs: '140px', md: '325px' },
                                height: { xs: '120px', md: '291px' },
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}