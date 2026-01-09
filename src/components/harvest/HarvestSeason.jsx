import { Box, Button, Divider, Grid, Typography } from "@mui/material";

export default function HarvestSeason() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: { xs: 6, md: 4 }, pt: { xs: 70 } }}>
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    mb: 2,
                    fontSize: { xs: '2rem', md: '64px' },
                    display: { xs: 'none', md: 'block' }
                }}
            >
                Harvest Season
            </Typography>
            <Box
                component='img'
                src='/images/harvest/chartHarvest.png'
                sx={{
                    display: { xs: 'none', md: 'block' },
                    margin: "0 auto",
                    width: '1200px',
                    maxWidth: '100%',
                }}
            />
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    mb: { xs: 3, md: 2 },
                    fontSize: { xs: '1.75rem', md: '48px' },
                    fontWeight: 700,
                    color: '#1a1a1a',
                }}
            >
                Development & Quality
            </Typography>

            {/* Mobile Layout */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', alignItems: 'center', px: 3, gap: 3 }}>
                {/* Logo */}
                <Box
                    component="img"
                    src="/images/hero/logo-wayd-2.webp"
                    alt="WAYD Logo"
                    sx={{
                        maxWidth: '180px',
                        width: '100%',
                        height: 'auto',
                        mb: 2,
                    }}
                />

                {/* Results in 2025 */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '1.25rem',
                        color: '#1a1a1a',
                        textAlign: 'center',
                    }}
                >
                    Results in 2025
                </Typography>

                {/* Stats List */}
                <Box
                    component="ul"
                    sx={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        mb: 3,
                        width: '100%',
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
                                width: 40,
                                height: 19,
                                objectFit: 'contain',
                                mt: 0.5,
                                flexShrink: 0,
                            }}
                        />
                        <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#2a2a2a', lineHeight: 1.5 }}>
                            600+ Varieties Tested Annually With Seed Partners
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
                                width: 40,
                                height: 19,
                                objectFit: 'contain',
                                mt: 0.5,
                                flexShrink: 0,
                            }}
                        />
                        <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#2a2a2a', lineHeight: 1.5 }}>
                            28 Varieties In Pre-Commercial Trials
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
                                width: 40,
                                height: 19,
                                objectFit: 'contain',
                                mt: 0.5,
                                flexShrink: 0,
                            }}
                        />
                        <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#2a2a2a', lineHeight: 1.5 }}>
                            24 Varieties In Production For Customers
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
                                width: 40,
                                height: 19,
                                objectFit: 'contain',
                                mt: 0.5,
                                flexShrink: 0,
                            }}
                        />
                        <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#2a2a2a', lineHeight: 1.5 }}>
                            3 Varieties Exclusive To Duroc
                        </Typography>
                    </Box>
                </Box>

                {/* Description Text */}
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.875rem',
                        color: '#4a5568',
                        textAlign: 'left',
                        lineHeight: 1.7,
                        mb: 3,
                    }}
                >
                    At our farms, innovation meets tradition. We continuously invest in research and development to enhance crop performance, disease resistance, and overall quality. Every tomato is carefully monitored from seed to harvest, ensuring it meets the highest standards of freshness, nutrition, and flavor. By combining advanced technology, sustainable practices, and expert knowledge, we deliver produce that reflects excellence and the pride of Moroccan agriculture.
                </Typography>

                {/* Download Button */}
                <Button
                    variant="contained"
                    sx={{
                        width: '100%',
                        maxWidth: '300px',
                        py: 1.5,
                        background: '#FA4309',
                        borderRadius: '68px',
                        border: '2px solid transparent',
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        '&:hover': {
                            background: '#bb2f04ff',
                            border: '2px solid transparent'
                        }
                    }}
                >
                    DOWNLOAD CATALOG
                </Button>
            </Box>

            {/* Desktop Layout */}
            <Grid container spacing={4} sx={{ mt: 4, alignItems: 'flex-start', display: { xs: 'none', md: 'flex' } }}>
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

            {/* Desktop Download Button */}
            <Button
                variant="contained"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    margin: '0 auto',
                    marginBottom: '70px',
                    marginTop: '40px',
                    background: '#FA4309',
                    borderRadius: '68px',
                    border: '2px solid transparent',
                    color: '#fff',
                    textTransform: 'none',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': {
                        background: '#bb2f04ff',
                        border: '2px solid transparent'
                    }
                }}
            >
                Download Catalog
            </Button>
        </Box>
    );
}