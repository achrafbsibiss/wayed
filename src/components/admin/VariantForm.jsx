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
    Grid,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function VariantForm({ product, variant, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        variant_id: variant?.variant_id || '',
        label: variant?.label || '',
        size: variant?.size || '',
        description: variant?.description || '',
        display_order: variant?.display_order || 1,
    });

    // Main Image State
    const [mainImageFile, setMainImageFile] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(variant?.main_image_url || null);

    // Slider Images State
    const [sliderPreviews, setSliderPreviews] = useState(variant?.slider_images || []);
    const [newSliderFiles, setNewSliderFiles] = useState([]); // List of { file, preview }

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
        formData.append('bucket', 'products'); // Ensure API supports bucket param or change API endpoint

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

            // Upload main image if changed
            if (mainImageFile) {
                mainImageUrl = await uploadFile(mainImageFile);
            }

            if (!mainImageUrl) {
                throw new Error('Main image is required');
            }

            // Upload new slider images
            const newSliderUrls = [];
            for (const item of newSliderFiles) {
                const url = await uploadFile(item.file);
                newSliderUrls.push(url);
            }

            // Combine existing (remaining) slider images with new ones
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

    return (
        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                {variant ? 'Edit Variant' : 'Add New Variant'}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Variant ID"
                            name="variant_id"
                            value={formData.variant_id}
                            onChange={handleChange}
                            required
                            helperText="Unique ID key (e.g. 'round', 'plum')"
                            sx={{ mb: 3 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Label"
                            name="label"
                            value={formData.label}
                            onChange={handleChange}
                            required
                            helperText="Display name (e.g. 'Round Tomato')"
                            sx={{ mb: 3 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                            helperText="e.g. 'LARGE', 'MEDIUM'"
                            sx={{ mb: 3 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description (Insight)"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                            sx={{ mb: 3 }}
                        />
                    </Grid>
                </Grid>

                {/* Main Image Upload */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Main Image *
                    </Typography>
                    {mainImagePreview && (
                        <Box sx={{ position: 'relative', width: 150, height: 150, mb: 2, border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
                            <Image src={mainImagePreview} alt="Main Preview" fill style={{ objectFit: 'contain' }} />
                        </Box>
                    )}
                    <input
                        ref={mainInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        style={{ display: 'none' }}
                    />
                    <Button variant="outlined" onClick={() => mainInputRef.current?.click()}>
                        {mainImagePreview ? 'Change Main Image' : 'Upload Main Image'}
                    </Button>
                </Box>

                {/* Slider Images Upload */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Slider Images
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        {sliderPreviews.map((url, idx) => (
                            <Grid item key={`existing-${idx}`}>
                                <Box sx={{ position: 'relative', width: 100, height: 100, border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
                                    <Image src={url} alt={`Slider ${idx}`} fill style={{ objectFit: 'cover' }} />
                                    <IconButton
                                        size="small"
                                        onClick={() => removeSliderImage(idx)}
                                        sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'rgba(255,255,255,0.8)' }}
                                    >
                                        <Icon icon="mdi:close" color="red" />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                        {newSliderFiles.map((item, idx) => (
                            <Grid item key={`new-${idx}`}>
                                <Box sx={{ position: 'relative', width: 100, height: 100, border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
                                    <Image src={item.preview} alt={`New Slider ${idx}`} fill style={{ objectFit: 'cover' }} />
                                    <IconButton
                                        size="small"
                                        onClick={() => removeSliderImage(idx, true)}
                                        sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'rgba(255,255,255,0.8)' }}
                                    >
                                        <Icon icon="mdi:close" color="red" />
                                    </IconButton>
                                </Box>
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
                    <Button variant="outlined" onClick={() => sliderInputRef.current?.click()}>
                        Add Slider Images
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{ background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' }}
                    >
                        {loading ? 'Saving...' : variant ? 'Update Variant' : 'Create Variant'}
                    </Button>
                    <Button variant="outlined" onClick={onCancel} disabled={loading} fullWidth>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}
