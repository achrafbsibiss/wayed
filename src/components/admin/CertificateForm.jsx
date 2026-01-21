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
    Tabs,
    Tab,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function CertificateForm({ certificate, onSuccess, onCancel }) {
    const [currentLang, setCurrentLang] = useState('en');
    const [formData, setFormData] = useState({
        title: certificate?.title || { en: '', fr: '', ar: '', de: '' },
        description: certificate?.description || { en: '', fr: '', ar: '', de: '' },
        display_order: certificate?.display_order || 1,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(certificate?.image_url || null);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileName, setPdfFileName] = useState(certificate?.pdf_file ? certificate.pdf_file.split('/').pop() : null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const pdfInputRef = useRef(null);

    const handleChange = (e, lang = null) => {
        const { name, value } = e.target;

        // If lang is provided, we're updating a translation field
        if (lang) {
            setFormData({
                ...formData,
                [name]: {
                    ...formData[name],
                    [lang]: value,
                },
            });
        } else {
            // For non-translation fields like display_order
            setFormData({
                ...formData,
                [name]: value,
            });
        }
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

    const handlePdfChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (file.type !== 'application/pdf') {
                setError('Please select a PDF file');
                return;
            }

            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError('PDF size must be less than 10MB');
                return;
            }

            setPdfFile(file);
            setPdfFileName(file.name);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let imageUrl = certificate?.image_url || '';
            let pdfUrl = certificate?.pdf_file || '';

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

            // Upload new PDF if selected
            if (pdfFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', pdfFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData,
                });

                const uploadData = await uploadRes.json();

                if (!uploadData.success) {
                    throw new Error(uploadData.error || 'Failed to upload PDF');
                }

                pdfUrl = uploadData.data.publicUrl;
            }

            // Validate required fields (English is required as fallback)
            if (!formData.title?.en || !formData.description?.en || !imageUrl) {
                throw new Error('Please fill in English title, description and upload an image');
            }

            // Create or update certificate
            const url = certificate
                ? `/api/certificates/${certificate.id}`
                : '/api/certificates';

            const method = certificate ? 'PUT' : 'POST';

            const requestBody = {
                ...formData,
                image_url: imageUrl,
            };

            // Only include pdf_file if it exists
            if (pdfUrl) {
                requestBody.pdf_file = pdfUrl;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
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
                {/* Language Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={currentLang}
                        onChange={(e, newLang) => setCurrentLang(newLang)}
                        aria-label="language tabs"
                    >
                        <Tab label="English" value="en" />
                        <Tab label="Français" value="fr" />
                        <Tab label="العربية" value="ar" />
                        <Tab label="Deutsch" value="de" />
                    </Tabs>
                </Box>

                {/* Title Input for Current Language */}
                <TextField
                    fullWidth
                    label={`Title (${currentLang.toUpperCase()})${currentLang === 'en' ? ' *' : ''}`}
                    name="title"
                    value={formData.title[currentLang] || ''}
                    onChange={(e) => handleChange(e, currentLang)}
                    required={currentLang === 'en'}
                    sx={{ mb: 3 }}
                    placeholder={`Certificate title in ${currentLang.toUpperCase()}`}
                    inputProps={{ dir: currentLang === 'ar' ? 'rtl' : 'ltr' }}
                />

                {/* Description Input for Current Language */}
                <TextField
                    fullWidth
                    label={`Description (${currentLang.toUpperCase()})${currentLang === 'en' ? ' *' : ''}`}
                    name="description"
                    value={formData.description[currentLang] || ''}
                    onChange={(e) => handleChange(e, currentLang)}
                    required={currentLang === 'en'}
                    multiline
                    rows={4}
                    sx={{ mb: 3 }}
                    placeholder={`Certificate description in ${currentLang.toUpperCase()}`}
                    inputProps={{ dir: currentLang === 'ar' ? 'rtl' : 'ltr' }}
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

                {/* PDF Upload */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Certificate PDF (Optional)
                    </Typography>

                    {pdfFileName && (
                        <Box
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 2,
                                border: '2px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Icon icon="mdi:file-pdf-box" width={24} height={24} color="#f44336" />
                            <Typography variant="body2" sx={{ flex: 1 }}>
                                {pdfFileName}
                            </Typography>
                        </Box>
                    )}

                    <input
                        ref={pdfInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfChange}
                        style={{ display: 'none' }}
                    />

                    <Button
                        variant="outlined"
                        startIcon={<Icon icon="mdi:file-pdf-box" />}
                        onClick={() => pdfInputRef.current?.click()}
                        fullWidth
                    >
                        {pdfFileName ? 'Change PDF' : 'Upload PDF'}
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        Maximum file size: 10MB. This PDF will be downloaded when users click the download button.
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
