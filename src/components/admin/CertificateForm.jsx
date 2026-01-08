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
} from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function CertificateForm({ certificate, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        title: certificate?.title || '',
        description: certificate?.description || '',
        display_order: certificate?.display_order || 1,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(certificate?.image_url || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let imageUrl = certificate?.image_url || '';

            // Upload new image if selected
            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', imageFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData,
                });

                const uploadData = await uploadRes.json();

                if (!uploadData.success) {
                    throw new Error(uploadData.error || 'Failed to upload image');
                }

                imageUrl = uploadData.data.publicUrl;
            }

            // Validate required fields
            if (!formData.title || !formData.description || !imageUrl) {
                throw new Error('Please fill in all fields and upload an image');
            }

            // Create or update certificate
            const url = certificate
                ? `/api/certificates/${certificate.id}`
                : '/api/certificates';

            const method = certificate ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    image_url: imageUrl,
                }),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to save certificate');
            }

            onSuccess?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                {certificate ? 'Edit Certificate' : 'Add New Certificate'}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    sx={{ mb: 3 }}
                    placeholder="e.g., Global G.A.P"
                />

                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    sx={{ mb: 3 }}
                    placeholder="Certificate description..."
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
                    inputProps={{ min: 1 }}
                />

                {/* Image Upload */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Certificate Image {!certificate && '*'}
                    </Typography>

                    {imagePreview && (
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: 250,
                                mb: 2,
                                borderRadius: 2,
                                overflow: 'hidden',
                                border: '2px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />

                    <Button
                        variant="outlined"
                        startIcon={<Icon icon="mdi:upload" />}
                        onClick={() => fileInputRef.current?.click()}
                        fullWidth
                    >
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        Maximum file size: 5MB. Supported formats: JPG, PNG, WebP
                    </Typography>
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <Icon icon="mdi:check" />}
                        sx={{
                            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #45a049 0%, #4CAF50 100%)',
                            },
                        }}
                    >
                        {loading ? 'Saving...' : certificate ? 'Update Certificate' : 'Create Certificate'}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        disabled={loading}
                        fullWidth
                        startIcon={<Icon icon="mdi:close" />}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}
