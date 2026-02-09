'use client';

import { useState, useRef } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
    IconButton,
    Tabs,
    Tab,
    Divider,
    Chip,
    Card,
    CardContent,
    alpha,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'gr', label: 'Deutsch', flag: '🇩🇪' },
];

export default function VariantForm({ product, variant, onSuccess, onCancel }) {
    // Initialize multilingual fields with proper structure
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

    const [formData, setFormData] = useState({
        variant_id: variant?.variant_id || '',
        label: initMultilingualField(variant?.label),
        size: initMultilingualField(variant?.size),
        description: initMultilingualField(variant?.description),
        display_order: variant?.display_order || 1,
    });

    const [activeTab, setActiveTab] = useState(0);
    const [mainImageFile, setMainImageFile] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(variant?.main_image_url || null);
    const [sliderPreviews, setSliderPreviews] = useState(variant?.slider_images || []);
    const [newSliderFiles, setNewSliderFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const mainInputRef = useRef(null);
    const sliderInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleMultilingualChange = (field, lang, value) => {
        setFormData({
            ...formData,
            [field]: {
                ...formData[field],
                [lang]: value,
            },
        });
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setMainImageFile(file);
            setMainImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSliderImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newFiles = files.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            setNewSliderFiles([...newSliderFiles, ...newFiles]);
        }
    };

    const removeSliderImage = (index, isNew = false) => {
        if (isNew) {
            const updated = [...newSliderFiles];
            updated.splice(index, 1);
            setNewSliderFiles(updated);
        } else {
            const updated = [...sliderPreviews];
            updated.splice(index, 1);
            setSliderPreviews(updated);
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', 'products');

        const res = await fetch('/api/upload?bucket=products', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Upload failed');
        return data.data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let mainImageUrl = variant?.main_image_url;

            if (mainImageFile) {
                mainImageUrl = await uploadFile(mainImageFile);
            }

            if (!mainImageUrl) {
                throw new Error('Main image is required');
            }

            if (!formData.label.en || !formData.size.en || !formData.description.en) {
                throw new Error('English translations are required for Label, Size, and Description');
            }

            const newSliderUrls = [];
            for (const item of newSliderFiles) {
                const url = await uploadFile(item.file);
                newSliderUrls.push(url);
            }

            const finalSliderImages = [...sliderPreviews, ...newSliderUrls];

            const payload = {
                ...formData,
                product_id: product.id,
                main_image_url: mainImageUrl,
                slider_images: finalSliderImages,
            };

            const url = variant
                ? `/api/variants/${variant.id}`
                : '/api/variants';

            const method = variant ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            onSuccess();
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to save variant');
        } finally {
            setLoading(false);
        }
    };

    const currentLang = LANGUAGES[activeTab].code;

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Icon icon={variant ? "solar:pen-bold-duotone" : "solar:add-circle-bold-duotone"} width={32} style={{ color: '#667eea' }} />
                    {variant ? 'Edit Variant' : 'Add New Variant'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {variant ? 'Update variant information and images' : 'Create a new product variant with multilingual support'}
                </Typography>
            </Box>

            {error && (
                <Alert
                    severity="error"
                    icon={<Icon icon="solar:danger-circle-bold" width={22} />}
                    sx={{ mb: 3, borderRadius: 2 }}
                    onClose={() => setError('')}
                >
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                {/* Basic Information Section */}
                <Paper elevation={0} sx={{ p: 4, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                        <Icon icon="solar:document-text-bold-duotone" width={24} style={{ color: '#667eea' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Basic Information
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Variant ID"
                                name="variant_id"
                                value={formData.variant_id}
                                onChange={handleChange}
                                required
                                placeholder="e.g., round, plum"
                                helperText="Unique identifier (lowercase, no spaces)"
                                InputProps={{
                                    startAdornment: <Icon icon="solar:tag-bold-duotone" width={20} style={{ marginRight: 8, color: '#9ca3af' }} />
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Display Order"
                                name="display_order"
                                type="number"
                                value={formData.display_order}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: <Icon icon="solar:sort-bold-duotone" width={20} style={{ marginRight: 8, color: '#9ca3af' }} />
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Multilingual Content Section */}
                <Paper elevation={0} sx={{ p: 4, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                        <Icon icon="solar:translation-bold-duotone" width={24} style={{ color: '#667eea' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Multilingual Content
                        </Typography>
                        <Chip
                            label="4 Languages"
                            size="small"
                            sx={{
                                bgcolor: alpha('#667eea', 0.1),
                                color: '#667eea',
                                fontWeight: 600,
                                ml: 'auto'
                            }}
                        />
                    </Box>

                    {/* Language Tabs */}
                    <Tabs
                        value={activeTab}
                        onChange={(e, v) => setActiveTab(v)}
                        sx={{
                            mb: 4,
                            borderBottom: 1,
                            borderColor: 'divider',
                            '& .MuiTab-root': {
                                minWidth: 100,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s',
                                '&.Mui-selected': {
                                    color: '#667eea',
                                },
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#667eea',
                                height: 3,
                                borderRadius: '3px 3px 0 0',
                            }
                        }}
                    >
                        {LANGUAGES.map((lang, idx) => (
                            <Tab
                                key={lang.code}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <span>{lang.label}</span>
                                        {lang.code === 'en' && (
                                            <Chip label="Required" size="small" color="error" sx={{ height: 18, fontSize: '0.7rem' }} />
                                        )}
                                    </Box>
                                }
                            />
                        ))}
                    </Tabs>

                    {/* Multilingual Fields */}
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label={`Label`}
                                value={formData.label[currentLang]}
                                onChange={(e) => handleMultilingualChange('label', currentLang, e.target.value)}
                                required={currentLang === 'en'}
                                placeholder="e.g., Round Tomato"
                                helperText="Display name for this variant"
                                InputProps={{
                                    startAdornment: <Icon icon="solar:sticker-bold-duotone" width={20} style={{ marginRight: 8, color: '#9ca3af' }} />
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label={`Size`}
                                value={formData.size[currentLang]}
                                onChange={(e) => handleMultilingualChange('size', currentLang, e.target.value)}
                                required={currentLang === 'en'}
                                placeholder="e.g., LARGE"
                                helperText="Size classification"
                                InputProps={{
                                    startAdornment: <Icon icon="solar:ruler-bold-duotone" width={20} style={{ marginRight: 8, color: '#9ca3af' }} />
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label={`Description / Insight`}
                                value={formData.description[currentLang]}
                                onChange={(e) => handleMultilingualChange('description', currentLang, e.target.value)}
                                required={currentLang === 'en'}
                                multiline
                                rows={4}
                                placeholder="Enter variant description and key features..."
                                helperText="Detailed description shown to customers"
                                InputProps={{
                                    startAdornment: <Icon icon="solar:document-text-bold-duotone" width={20} style={{ marginRight: 8, marginTop: 1, color: '#9ca3af' }} />
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Images Section */}
                <Paper elevation={0} sx={{ p: 4, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                        <Icon icon="solar:gallery-bold-duotone" width={24} style={{ color: '#667eea' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Product Images
                        </Typography>
                    </Box>

                    {/* Main Image */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Icon icon="solar:star-bold" width={16} style={{ color: '#f59e0b' }} />
                            Main Image
                            <Chip label="Required" size="small" color="error" sx={{ height: 18, fontSize: '0.7rem', ml: 1 }} />
                        </Typography>

                        {mainImagePreview ? (
                            <Card
                                elevation={0}
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: 300,
                                    height: 200,
                                    border: '2px solid',
                                    borderColor: '#667eea40',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        borderColor: '#667eea',
                                        boxShadow: `0 4px 20px ${alpha('#667eea', 0.2)}`,
                                    }
                                }}
                            >
                                <Image
                                    src={mainImagePreview}
                                    alt="Main Preview"
                                    fill
                                    style={{ objectFit: 'contain', padding: 16 }}
                                />
                                <IconButton
                                    onClick={() => {
                                        setMainImagePreview(null);
                                        setMainImageFile(null);
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        bgcolor: 'rgba(255,255,255,0.95)',
                                        boxShadow: 2,
                                        '&:hover': {
                                            bgcolor: '#fee2e2',
                                            color: '#ef4444',
                                        }
                                    }}
                                    size="small"
                                >
                                    <Icon icon="solar:trash-bin-trash-bold" width={18} />
                                </IconButton>
                            </Card>
                        ) : (
                            <Box
                                sx={{
                                    width: '100%',
                                    maxWidth: 300,
                                    height: 200,
                                    border: '2px dashed',
                                    borderColor: 'divider',
                                    borderRadius: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: alpha('#667eea', 0.02),
                                    transition: 'all 0.3s',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderColor: '#667eea',
                                        bgcolor: alpha('#667eea', 0.05),
                                    }
                                }}
                                onClick={() => mainInputRef.current?.click()}
                            >
                                <Icon icon="solar:upload-bold-duotone" width={48} style={{ color: '#9ca3af', marginBottom: 12 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Click to upload main image
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    PNG, JPG or WEBP
                                </Typography>
                            </Box>
                        )}

                        <input
                            ref={mainInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageChange}
                            style={{ display: 'none' }}
                        />

                        {mainImagePreview && (
                            <Button
                                variant="outlined"
                                startIcon={<Icon icon="solar:upload-linear" />}
                                onClick={() => mainInputRef.current?.click()}
                                sx={{ mt: 2, textTransform: 'none', borderRadius: 2 }}
                            >
                                Change Image
                            </Button>
                        )}
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* Slider Images */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Icon icon="solar:gallery-bold-duotone" width={16} style={{ color: '#667eea' }} />
                            Slider Images
                            <Chip label="Optional" size="small" sx={{ height: 18, fontSize: '0.7rem', ml: 1, bgcolor: alpha('#667eea', 0.1), color: '#667eea' }} />
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            {sliderPreviews.map((url, idx) => (
                                <Grid item key={`existing-${idx}`}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            position: 'relative',
                                            width: 120,
                                            height: 120,
                                            border: '2px solid',
                                            borderColor: 'divider',
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                borderColor: '#667eea',
                                                boxShadow: `0 4px 12px ${alpha('#667eea', 0.15)}`,
                                            }
                                        }}
                                    >
                                        <Image src={url} alt={`Slider ${idx}`} fill style={{ objectFit: 'cover' }} />
                                        <IconButton
                                            size="small"
                                            onClick={() => removeSliderImage(idx)}
                                            sx={{
                                                position: 'absolute',
                                                top: 4,
                                                right: 4,
                                                bgcolor: 'rgba(255,255,255,0.95)',
                                                boxShadow: 1,
                                                '&:hover': {
                                                    bgcolor: '#fee2e2',
                                                    color: '#ef4444',
                                                }
                                            }}
                                        >
                                            <Icon icon="solar:close-circle-bold" width={16} />
                                        </IconButton>
                                    </Card>
                                </Grid>
                            ))}
                            {newSliderFiles.map((item, idx) => (
                                <Grid item key={`new-${idx}`}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            position: 'relative',
                                            width: 120,
                                            height: 120,
                                            border: '2px solid',
                                            borderColor: '#667eea40',
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            transition: 'all 0.3s',
                                        }}
                                    >
                                        <Image src={item.preview} alt={`New ${idx}`} fill style={{ objectFit: 'cover' }} />
                                        <Chip
                                            label="New"
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 4,
                                                left: 4,
                                                height: 20,
                                                fontSize: '0.7rem',
                                                bgcolor: '#667eea',
                                                color: 'white',
                                                fontWeight: 600,
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() => removeSliderImage(idx, true)}
                                            sx={{
                                                position: 'absolute',
                                                top: 4,
                                                right: 4,
                                                bgcolor: 'rgba(255,255,255,0.95)',
                                                boxShadow: 1,
                                                '&:hover': {
                                                    bgcolor: '#fee2e2',
                                                    color: '#ef4444',
                                                }
                                            }}
                                        >
                                            <Icon icon="solar:close-circle-bold" width={16} />
                                        </IconButton>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <input
                            ref={sliderInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleSliderImagesChange}
                            style={{ display: 'none' }}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<Icon icon="solar:gallery-add-linear" />}
                            onClick={() => sliderInputRef.current?.click()}
                            sx={{ textTransform: 'none', borderRadius: 2 }}
                        >
                            Add Slider Images
                        </Button>
                    </Box>
                </Paper>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        disabled={loading}
                        startIcon={<Icon icon="solar:close-circle-linear" />}
                        sx={{
                            textTransform: 'none',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            borderColor: 'divider',
                            color: 'text.secondary',
                            fontWeight: 600,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Icon icon="solar:check-circle-linear" />}
                        sx={{
                            textTransform: 'none',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontWeight: 600,
                            boxShadow: `0 4px 12px ${alpha('#667eea', 0.3)}`,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                boxShadow: `0 6px 20px ${alpha('#667eea', 0.4)}`,
                            },
                            '&:disabled': {
                                background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                            }
                        }}
                    >
                        {loading ? 'Saving...' : variant ? 'Update Variant' : 'Create Variant'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
