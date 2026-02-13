'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    TextField,
    Alert,
    CircularProgress,
    FormControlLabel,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogContent,
    Chip,
    Tabs,
    Tab,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import VariantForm from '@/components/admin/VariantForm';
import Image from 'next/image';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'gr', label: 'Deutsch' },
];

export default function EditProduct({ params }) {
    const router = useRouter();
    const { id } = params;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Variant Dialog State
    const [variantDialogOpen, setVariantDialogOpen] = useState(false);
    const [editingVariant, setEditingVariant] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            if (data.success) {
                setProduct(data.data);
            } else {
                setError('Failed to fetch product');
            }
        } catch (err) {
            setError('Error loading product');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const initMultilingualField = (value) => {
        if (typeof value === 'object' && value !== null) {
            return {
                en: value.en || '',
                fr: value.fr || '',
                es: value.es || '',
                gr: value.gr || '',
            };
        }
        return {
            en: value || '',
            fr: '',
            es: '',
            gr: '',
        };
    };

    const handleProductChange = (e) => {
        const { name, value, checked, type } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleMultilingualNameChange = (lang, value) => {
        setProduct({
            ...product,
            name: {
                ...initMultilingualField(product.name),
                [lang]: value,
            },
        });
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            // Show success message or just refresh logic
        } catch (err) {
            setError(err.message || 'Failed to update product');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteVariant = async (variantId) => {
        if (!confirm('Are you sure you want to delete this variant?')) return;

        try {
            const res = await fetch(`/api/variants/${variantId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchProduct(); // Refresh list
            } else {
                alert('Failed to delete variant');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleVariantSuccess = () => {
        setVariantDialogOpen(false);
        setEditingVariant(null);
        fetchProduct();
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    if (!product) return <Container><Alert severity="error">Product not found</Alert></Container>;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<Icon icon="mdi:arrow-left" />} onClick={() => router.push('/admin/products')}>
                    Back
                </Button>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Edit Product: {product.name?.en || product.name || ''}
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {/* Product Details Form */}
            <Paper sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Product Details</Typography>
                <form onSubmit={handleProductSubmit}>
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

                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        <TextField
                            label={`Name (${LANGUAGES[activeTab].label})`}
                            value={initMultilingualField(product.name)[LANGUAGES[activeTab].code]}
                            onChange={(e) => handleMultilingualNameChange(LANGUAGES[activeTab].code, e.target.value)}
                            required={LANGUAGES[activeTab].code === 'en'}
                            sx={{ flex: 1, minWidth: 200 }}
                        />
                        <TextField
                            label="Slug"
                            name="slug"
                            value={product.slug}
                            onChange={handleProductChange}
                            required
                            sx={{ flex: 1, minWidth: 200 }}
                        />
                        <TextField
                            label="Order"
                            name="display_order"
                            type="number"
                            value={product.display_order}
                            onChange={handleProductChange}
                            required
                            sx={{ width: 100 }}
                        />
                    </Box>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={product.has_season_chart}
                                onChange={handleProductChange}
                                name="has_season_chart"
                            />
                        }
                        label="Show Season Chart"
                        sx={{ mt: 2, display: 'block' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3 }}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Product Details'}
                    </Button>
                </form>
            </Paper>

            {/* Variants Section */}
            <Paper sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">Variants</Typography>
                    <Button
                        variant="contained"
                        startIcon={<Icon icon="mdi:plus" />}
                        onClick={() => {
                            setEditingVariant(null);
                            setVariantDialogOpen(true);
                        }}
                        color="secondary"
                    >
                        Add Variant
                    </Button>
                </Box>

                {!product.variants || product.variants.length === 0 ? (
                    <Typography color="text.secondary">No variants added yet.</Typography>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'grey.50' }}>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Label</TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Size</TableCell>
                                    <TableCell>Order</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {product.variants.map((v) => (
                                    <TableRow key={v.id}>
                                        <TableCell>
                                            <Box sx={{ position: 'relative', width: 50, height: 50, borderRadius: 1, overflow: 'hidden' }}>
                                                <Image src={v.main_image_url} alt={v.label} fill style={{ objectFit: 'cover' }} />
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>{v.label?.en || v.label || ''}</TableCell>
                                        <TableCell><Chip label={v.variant_id} size="small" /></TableCell>
                                        <TableCell>{v.size?.en || v.size || ''}</TableCell>
                                        <TableCell>{v.display_order}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => {
                                                    setEditingVariant(v);
                                                    setVariantDialogOpen(true);
                                                }}
                                            >
                                                <Icon icon="mdi:pencil" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteVariant(v.id)}
                                            >
                                                <Icon icon="mdi:delete" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            {/* Variant Dialog */}
            <Dialog
                open={variantDialogOpen}
                onClose={() => setVariantDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <VariantForm
                        product={product}
                        variant={editingVariant}
                        onSuccess={handleVariantSuccess}
                        onCancel={() => setVariantDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
}
