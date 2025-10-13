'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const TABS = [
  { id: 'goal', label: 'Our Goal' },
  { id: 'who', label: 'Who are we' },
  { id: 'vision', label: 'Vision' },
  { id: 'mission', label: 'Mission' },
];

const CONTENT = {
  goal: {
    title: "Our goal is to share Morocco's finest tomatoes with the world—fresh, high-quality, and grown with care for both land and farmers.",
    description: "We believe that true growth comes from more than just harvests. By investing in modern farming techniques, empowering local communities, and maintaining strict quality controls, we ensure that every tomato exported from Morocco carries not only freshness and flavor but also the values of trust, sustainability, and excellence.",
  },
  who: {
    title: "We are a leading Moroccan agricultural company dedicated to bringing premium organic vegetables to global markets.",
    description: "With decades of experience in cultivation and export, we've built strong partnerships with local farmers and international buyers. Our team combines traditional farming wisdom with modern agricultural technology to ensure the highest quality standards in every harvest.",
  },
  vision: {
    title: "To become the world's most trusted source of premium Moroccan organic vegetables, setting new standards for quality and sustainability.",
    description: "We envision a future where Moroccan agriculture is recognized globally for its excellence, innovation, and commitment to environmental stewardship. Through continuous improvement and strategic partnerships, we aim to expand our reach while maintaining our core values of quality, sustainability, and community support.",
  },
  mission: {
    title: "To deliver exceptional organic vegetables while empowering Moroccan farmers and protecting our agricultural heritage.",
    description: "Our mission is to bridge the gap between Morocco's rich agricultural tradition and global market demands. We invest in cutting-edge farming technology, provide fair pricing to local farmers, and implement sustainable practices that preserve our land for future generations. Every tomato we export represents our commitment to excellence and community development.",
  },
};

export default function MissionSection() {
  const [activeTab, setActiveTab] = useState('goal');

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        {/* Tab Navigation */}
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 6,
            flexWrap: 'wrap',
          }}
        >
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                px: 2.5,
                py: 1,
                fontSize: '15px',
                fontWeight: 500,
                borderRadius: '50px',
                textTransform: 'none',
                border: activeTab === tab.id ? 'none' : '2px solid #2A2A2A',
                bgcolor: activeTab === tab.id ? '#2A2A2A' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#2A2A2A',
                '&:hover': {
                  bgcolor: activeTab === tab.id ? '#1a1a1a' : '#f5f5f5',
                  borderColor: '#2A2A2A',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>

        {/* Content Area */}
        <Box sx={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
          {/* Left Side - Label with Line */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 3,
              minWidth: 180,
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: 500,
                color: '#2A2A2A',
                whiteSpace: 'nowrap',
              }}
            >
              {TABS.find(tab => tab.id === activeTab)?.label}
            </Typography>
            <Box
              sx={{
                width: '250px',
                bgcolor: '#2A2A2A ',
                outline: '1px solid #2A2A2A',
              }}
            />
          </Box>

          {/* Right Side - Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#2A2A2A',
                lineHeight: 1.3,
                fontSize: { xs: '1.75rem', md: '40px' },
              }}
            >
              {CONTENT[activeTab].title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: '#6B7280',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              {CONTENT[activeTab].description}
            </Typography>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/about"
              sx={{
                px: 3,
                py: 1,
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: '50px',
                borderWidth: 2,
                borderColor: '#2A2A2A',
                color: '#2A2A2A',
                textTransform: 'none',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#2A2A2A',
                  bgcolor: '#f5f5f5',
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.3s ease',
                '& .MuiButton-endIcon': {
                  transition: 'transform 0.3s ease',
                },
                '&:hover .MuiButton-endIcon': {
                  transform: 'translateX(4px)',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}