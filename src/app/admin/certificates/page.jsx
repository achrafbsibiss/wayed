'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import CertificateForm from '@/components/admin/CertificateForm';

export default function AdminCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingCertificate, setEditingCertificate] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

    const fetchCertificates = async () => {
        try {
            const res = await fetch('/api/certificates');
            const data = await res.json();

            if (data.success) {
                setCertificates(data.data);
            } else {
                setError('Failed to fetch certificates');
            }
        } catch (err) {
            setError('An error occurred while fetching certificates');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/certificates/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (data.success) {
                setCertificates(certificates.filter((cert) => cert.id !== id));
                setDeleteDialog({ open: false, id: null });
            } else {
                setError(data.error || 'Failed to delete certificate');
            }
        } catch (err) {
            setError('An error occurred while deleting certificate');
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingCertificate(null);
        fetchCertificates();
    };

    const handleEdit = (certificate) => {
        setEditingCertificate(certificate);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingCertificate(null);
        setShowForm(true);
    };

    if (showForm) {
        return (
            <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)' }}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <CertificateForm
                        certificate={editingCertificate}
                        onSuccess={handleFormSuccess}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingCertificate(null);
                        }}
                    />
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            Certificates Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage your certification documents
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<Icon icon="solar:add-circle-linear" />}
                        onClick={handleAdd}
                        sx={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                                boxShadow: '0 6px 20px rgba(245, 87, 108, 0.4)',
                            },
                        }}
                    >
                        Add Certificate
                    </Button>
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

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
                        <CircularProgress sx={{ color: '#f5576c' }} />
                    </Box>
                ) : certificates.length === 0 ? (
                    <Card elevation={0} sx={{ p: 8, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: '#f3f4f6',
                                mx: 'auto',
                                mb: 3,
                            }}
                        >
                            <Icon icon="solar:document-medicine-linear" width={40} style={{ color: '#9ca3af' }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                            No certificates yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Get started by adding your first certificate
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Icon icon="solar:add-circle-linear" />}
                            onClick={handleAdd}
                            sx={{
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                textTransform: 'none',
                                px: 3,
                                py: 1.25,
                                borderRadius: 2,
                                fontWeight: 600,
                            }}
                        >
                            Add Your First Certificate
                        </Button>
                    </Card>
                ) : (
                    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Image</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Title</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Description</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Order</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {certificates.map((cert) => (
                                        <TableRow 
                                            key={cert.id} 
                                            sx={{ 
                                                '&:hover': { bgcolor: '#f8f9fa' },
                                                '&:last-child td': { borderBottom: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        width: 64,
                                                        height: 64,
                                                        borderRadius: 2,
                                                        overflow: 'hidden',
                                                        border: '2px solid',
                                                        borderColor: 'divider',
                                                    }}
                                                >
                                                    <Image
                                                        src={cert.image_url}
                                                        alt={cert.title}
                                                        fill
                                                        style={{ objectFit: 'contain', padding: '4px' }}
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Box
                                                        sx={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: 1.5,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: 'linear-gradient(135deg, #f093fb20 0%, #f5576c40 100%)',
                                                        }}
                                                    >
                                                        <Icon icon="solar:document-medicine-bold" width={18} style={{ color: '#f5576c' }} />
                                                    </Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {cert.title}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        maxWidth: 350,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {cert.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={cert.display_order}
                                                    size="small"
                                                    sx={{ 
                                                        minWidth: 32,
                                                        bgcolor: '#f3f4f6',
                                                        fontWeight: 600,
                                                        border: 'none',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleEdit(cert)}
                                                        sx={{
                                                            bgcolor: '#f093fb15',
                                                            color: '#f5576c',
                                                            '&:hover': { 
                                                                bgcolor: '#f093fb25',
                                                            },
                                                        }}
                                                    >
                                                        <Icon icon="solar:pen-linear" width={18} />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => setDeleteDialog({ open: true, id: cert.id })}
                                                        sx={{
                                                            bgcolor: '#fee2e2',
                                                            color: '#ef4444',
                                                            '&:hover': { 
                                                                bgcolor: '#fecaca',
                                                            },
                                                        }}
                                                    >
                                                        <Icon icon="solar:trash-bin-trash-linear" width={18} />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                )}

                {/* Delete Confirmation Dialog */}
                <Dialog 
                    open={deleteDialog.open} 
                    onClose={() => setDeleteDialog({ open: false, id: null })}
                    PaperProps={{
                        sx: { borderRadius: 3, p: 1 }
                    }}
                >
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 2 }}>
                        <Icon icon="solar:trash-bin-trash-bold" width={24} style={{ color: '#ef4444' }} />
                        <span>Delete Certificate?</span>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this certificate? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button 
                            onClick={() => setDeleteDialog({ open: false, id: null })}
                            sx={{ textTransform: 'none' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleDelete(deleteDialog.id)}
                            variant="contained"
                            startIcon={<Icon icon="solar:trash-bin-trash-linear" />}
                            sx={{
                                bgcolor: '#ef4444',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#dc2626',
                                },
                            }}
                        >
                            Delete Certificate
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
