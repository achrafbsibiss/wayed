'use client';

import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    TextField,
    Alert,
    CircularProgress,
    FormControlLabel,
    Switch,
    Tabs,
    Tab,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'gr', label: 'Deutsch' },
];

export default function NewProduct() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: {
            en: '',
            fr: '',
            es: '',
            gr: '',
        },
        slug: '',
        has_season_chart: true,
        display_order: 1,
    });
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleMultilingualChange = (lang, value) => {
        setFormData({
            ...formData,
            name: {
                ...formData.name,
                [lang]: value,
            },
        });

        // Auto-generate slug from English name
        if (lang === 'en') {
            setFormData({
                ...formData,
                name: {
                    ...formData.name,
                    [lang]: value,
                },
                slug: generateSlug(value),
            });
        }
    };

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validate English name is required
            if (!formData.name.en) {
                throw new Error('English name is required');
            }

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                // Redirect to edit page to add variants
                router.push(`/admin/products/${data.data.id}`);
            } else {
                setError(data.error || 'Failed to create product');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while creating product');
        } finally {
            setLoading(false);
        }
    };

    const currentLang = LANGUAGES[activeTab].code;

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)' }}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Card elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                            Create New Product
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Add a new product to your harvest collection
                        </Typography>
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            icon={<Icon icon="solar:danger-circle-bold" width={22} />}
                            sx={{ mb: 3, borderRadius: 2 }}
                        >
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Language Tabs for Product Name */}
                        <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                                Product Name (Multilingual)
                            </Typography>
                            <Tabs
                                value={activeTab}
                                onChange={(e, v) => setActiveTab(v)}
                                sx={{
                                    '& .MuiTab-root': {
                                        minWidth: 80,
                                        fontWeight: 600,
                                    }
                                }}
                            >
                                {LANGUAGES.map((lang) => (
                                    <Tab
                                        key={lang.code}
                                        label={lang.label}
                                        icon={
                                            lang.code === 'en' ? (
                                                <Typography variant="caption" color="error">*</Typography>
                                            ) : null
                                        }
                                        iconPosition="end"
                                    />
                                ))}
                            </Tabs>
                        </Box>

                        <TextField
                            fullWidth
                            label={`Product Name (${LANGUAGES[activeTab].label})`}
                            value={formData.name[currentLang]}
                            onChange={(e) => handleMultilingualChange(currentLang, e.target.value)}
                            required={currentLang === 'en'}
                            sx={{ mb: 3 }}
                            placeholder="e.g. Tomato"
                        />

                        <TextField
                            fullWidth
                            label="Slug (URL Key)"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            sx={{ mb: 3 }}
                            helperText="Used to identify the product in code (e.g. 'tomato')"
                        />

                        <TextField
                            fullWidth
                            label="Display Order"
                            name="display_order"
                            type="number"
                            value={formData.display_order}
                            onChange={handleChange}
                            required
                            sx={{ mb: 3 }}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.has_season_chart}
                                    onChange={handleChange}
                                    name="has_season_chart"
                                />
                            }
                            label="Has Season Chart?"
                            sx={{ mb: 4, display: 'block' }}
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<Icon icon="solar:alt-arrow-left-linear" />}
                                onClick={() => router.push('/admin/products')}
                                sx={{
                                    textTransform: 'none',
                                    borderColor: 'divider',
                                    color: 'text.secondary',
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Icon icon="solar:check-circle-linear" />}
                                sx={{
                                    height: 48,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                                    },
                                }}
                            >
                                {loading ? 'Creating...' : 'Create & Add Variants'}
                            </Button>
                        </Box>
                    </form>
                </Card>
            </Container>
        </Box>
    );
}
