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
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function NewProduct() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        has_season_chart: true,
        display_order: 1,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setFormData({
            ...formData,
            name,
            slug: generateSlug(name),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
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
            setError('An error occurred while creating product');
        } finally {
            setLoading(false);
        }
    };

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
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleNameChange}
                            required
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
