'use client';

import { Box, Container, Typography, Grid } from '@mui/material';

export default function MissionPhilosophySection() {
    return (
        <Box
            sx={{
                py: { xs: 6, md: 12 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                {/* Desktop Layout - Original Design */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'relative',
                        minHeight: '800px',
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
                                fontSize: '2.5rem',
                                color: 'text.primary',
                            }}
                        >
                            Our Mission / Philosophy
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '24px',
                                fontWeight: 400,
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
                            width: '100%',
                            height: '100%',
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
                            top: '70px',
                            left: '-8%',
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 43.webp"
                            alt="Hands holding seedling"
                            sx={{
                                width: '243px',
                                height: '217px',
                            }}
                        />
                    </Box>

                    {/* Image 2 - Top Center (Soil close-up) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 47.webp"
                            alt="Soil close-up"
                            sx={{
                                width: '360px',
                                height: '250px',
                            }}
                        />
                    </Box>

                    {/* Image 3 - Top Right (Tomatoes on vine) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '250px',
                            right: '-10%',
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 44.webp"
                            alt="Tomatoes on vine"
                            sx={{
                                width: '231px',
                                height: '264px',
                            }}
                        />
                    </Box>

                    {/* Image 4 - Bottom Right (Greenhouse aerial) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '-35px',
                            right: '25%',
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 46.webp"
                            alt="Greenhouse aerial view"
                            sx={{
                                width: '244px',
                                height: '238px',
                            }}
                        />
                    </Box>

                    {/* Image 5 - Bottom Left (Farm field aerial) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '5px',
                            left: '-5%',
                            zIndex: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/last/image 45.webp"
                            alt="Farm field aerial view"
                            sx={{
                                width: '325px',
                                height: '291px',
                            }}
                        />
                    </Box>
                </Box>

                {/* Mobile Layout - Simple Grid */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    {/* Title and Description */}
                    <Box sx={{ textAlign: 'center', mb: 5, px: 2 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                fontSize: '1.75rem',
                                color: 'text.primary',
                            }}
                        >
                            Our Mission / Philosophy
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '1rem',
                                fontWeight: 400,
                                lineHeight: 1.6,
                            }}
                        >
                            Our mission is to balance productivity with responsibility. From seed to harvest, every step we take is guided by care for the land, the farmer, and the future
                        </Typography>
                    </Box>

                    {/* Image Grid */}
                    <Grid container spacing={2} sx={{ px: 2 }}>
                        {/* Image 1 - Hands with seedling */}
                        <Grid size={{ xs: 6 }}>
                            <Box
                                component="img"
                                src="/images/last/image 43.webp"
                                alt="Hands holding seedling"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    aspectRatio: '1/1',
                                }}
                            />
                        </Grid>

                        {/* Image 2 - Soil close-up */}
                        <Grid size={{ xs: 6 }}>
                            <Box
                                component="img"
                                src="/images/last/image 47.webp"
                                alt="Soil close-up"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    aspectRatio: '1/1',
                                }}
                            />
                        </Grid>

                        {/* Image 3 - Tomatoes on vine (full width) */}
                        <Grid size={{ xs: 12 }}>
                            <Box
                                component="img"
                                src="/images/last/image 44.webp"
                                alt="Tomatoes on vine"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    aspectRatio: '16/9',
                                }}
                            />
                        </Grid>

                        {/* Image 4 - Greenhouse aerial */}
                        <Grid size={{ xs: 6 }}>
                            <Box
                                component="img"
                                src="/images/last/image 46.webp"
                                alt="Greenhouse aerial view"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    aspectRatio: '1/1',
                                }}
                            />
                        </Grid>

                        {/* Image 5 - Farm field aerial */}
                        <Grid size={{ xs: 6 }}>
                            <Box
                                component="img"
                                src="/images/last/image 45.webp"
                                alt="Farm field aerial view"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    aspectRatio: '1/1',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}