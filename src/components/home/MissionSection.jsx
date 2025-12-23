'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

export default function MissionSection() {
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState('goal');

  const TABS = [
    { id: 'goal', label: t('mission.tabs.goal') },
    { id: 'who', label: t('mission.tabs.who') },
    { id: 'vision', label: t('mission.tabs.vision') },
    //{ id: 'mission', label: t('mission.tabs.mission') },
  ];

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
              {t(`mission.content.${activeTab}.title`)}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: '#6B7280',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              {t(`mission.content.${activeTab}.description`)}
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
              {t('common.learnMore') || 'Learn More'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}