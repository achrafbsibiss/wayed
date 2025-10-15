import { Box, Button, Divider, Grid, Typography } from "@mui/material";

export default function HarvestSeason() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 2, fontSize: '64px' }}>
                Harvest Season
            </Typography>
            <Box
                component='img'
                src='/images/harvest/chartHarvest.png'
                sx={{
                    display: "block",
                    margin: "0 auto",
                    width: '1200px',
                }}
            />
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 2, fontSize: '48px' }}>
                Development & Quality
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4, alignItems: 'flex-start' }}>
                {/* Left - Logo */}
                <Grid size={{ xs: 12, md: 3.8 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/hero/logo-wayd-2.webp"
                            alt="WAYD Logo"
                            sx={{
                                maxWidth: { xs: '200px', md: '250px' },
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />

                {/* Center - Title and List */}
                <Grid size={{ xs: 12, md: 3.8 }}>
                    <Box sx={{ height: '100%' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                fontSize: { xs: '1.5rem', md: '2rem' },
                                color: '#1a1a1a',
                                textAlign: { xs: 'center', md: 'left' },
                            }}
                        >
                            Our Commitment
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Box
                                component="li"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/hero/decorative-leaf.png"
                                    alt=""
                                    sx={{
                                        width: { xs: 40, md: 43 },
                                        height: { xs: 40, md: 19 },
                                        objectFit: 'contain',
                                        mt: 0.5,
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography variant="body1" sx={{ fontSize: '1rem', color: '#2a2a2a' }}>
                                    Sustainable farming practices
                                </Typography>
                            </Box>
                            <Box
                                component="li"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/hero/decorative-leaf.png"
                                    alt=""
                                    sx={{
                                        width: { xs: 40, md: 43 },
                                        height: { xs: 40, md: 19 },
                                        objectFit: 'contain',
                                        mt: 0.5,
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography variant="body1" sx={{ fontSize: '1rem', color: '#2a2a2a' }}>
                                    Quality-controlled harvesting
                                </Typography>
                            </Box>
                            <Box
                                component="li"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/hero/decorative-leaf.png"
                                    alt=""
                                    sx={{
                                        width: { xs: 40, md: 43 },
                                        height: { xs: 40, md: 19 },
                                        objectFit: 'contain',
                                        mt: 0.5,
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography variant="body1" sx={{ fontSize: '1rem', color: '#2a2a2a' }}>
                                    Advanced technology integration
                                </Typography>
                            </Box>
                            <Box
                                component="li"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/hero/decorative-leaf.png"
                                    alt=""
                                    sx={{
                                        width: { xs: 40, md: 43 },
                                        height: { xs: 40, md: 19 },
                                        objectFit: 'contain',
                                        mt: 0.5,
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography variant="body1" sx={{ fontSize: '1rem', color: '#2a2a2a' }}>
                                    Fresh produce guaranteed
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Divider orientation="vertical" flexItem />

                {/* Right - Paragraph Text */}
                <Grid size={{ xs: 12, md: 3.8 }}>
                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '0.95rem', md: '20px' },
                                color: '#4a5568',
                                textAlign: { xs: 'center', md: 'left' },
                            }}
                        >
                            Our development and quality processes ensure that every tomato we harvest meets
                            the highest standards. Through continuous innovation and rigorous quality control,
                            we deliver products that reflect our commitment to excellence. From seed to harvest,
                            we monitor every stage to guarantee freshness, flavor, and nutritional value that our
                            customers can trust.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Button 
                variant="contained" 
                sx={{ 
                    display: 'block', 
                    margin: '0 auto', 
                    marginBottom: '70px',
                    background: '#67BE4E', 
                    borderRadius: '68px', 
                    border: '2px solid transparent',
                    color: '#fff',
                    '&:hover': { 
                        background: '#5aaa44',
                        border: '2px solid transparent'
                    } 
                }}
            >
                Download Catalog
            </Button>
        </Box>
    );
}