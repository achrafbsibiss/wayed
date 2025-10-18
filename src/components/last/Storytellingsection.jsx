'use client';

import { Box, Container, Typography } from '@mui/material';

const STORY_CARDS = [
    {
        id: 1,
        type: 'image',
        image: '/images/last/Rectangle 32.webp',
        
    },
    {
        id: 2,
        type: 'image',
        image: '/images/last/Rectangle 33.webp',
        
    },
    {
        id: 3,
        type: 'image',
        image: '/images/last/Rectangle 34.webp',
        
    },
    {
        id: 4,
        type: 'image',
        image: '/images/last/Rectangle 35.webp',
        
    },
    {
        id: 5,
        type: 'image',
        image: '/images/last/Rectangle 36.webp',
    },
    {
        id: 6,
        type: 'image',
        image: '/images/last/Rectangle 37.webp',
        
    }
];

function StoryCard({ card, index }) {
    // Alternate positioning: even indices normal, odd indices shifted down
    const isOffset = index % 2 !== 0;
    
    return (
        <Box
            sx={{
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
                transform: isOffset ? 'translateY(70px)' : 'translateY(0)',
                transition: 'transform 0.3s ease',
            }}
        >
            <Box
                component="img"
                src={card.image}
                alt=""
                sx={{
                    width: '326px',
                    height: '588px',
                    objectFit: 'cover',
                }}
                mb={10}
            />
        </Box>
    );
}

export default function StorytellingSection() {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="lg">
                {/* Section Title */}
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 700,
                        mb: 6,
                        fontSize: { xs: '1.75rem', md: '2rem' },
                        color: 'text.primary',
                    }}
                >
                    Storytelling / Visual Section
                </Typography>

                {/* Masonry Grid Layout */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 1,
                    }}
                >
                    {/* Card 1 - Normal position */}
                    <Box>
                        <StoryCard card={STORY_CARDS[0]} index={0} />
                    </Box>

                    {/* Card 2 - Offset down */}
                    <Box>
                        <StoryCard card={STORY_CARDS[1]} index={1} />
                    </Box>

                    {/* Card 3 - Normal position */}
                    <Box>
                        <StoryCard card={STORY_CARDS[2]} index={2} />
                    </Box>

                    {/* Card 4 - Offset down */}
                    <Box>
                        <StoryCard card={STORY_CARDS[3]} index={3} />
                    </Box>

                    {/* Card 5 - Normal position */}
                    <Box>
                        <StoryCard card={STORY_CARDS[4]} index={4} />
                    </Box>

                    {/* Card 6 - Offset down */}
                    <Box>
                        <StoryCard card={STORY_CARDS[5]} index={5} />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}