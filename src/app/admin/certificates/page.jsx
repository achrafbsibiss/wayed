'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
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
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Manage Certificates
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Icon icon="mdi:plus" />}
                    onClick={handleAdd}
                    sx={{
                        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #45a049 0%, #4CAF50 100%)',
                        },
                    }}
                >
                    Add Certificate
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : certificates.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <Icon icon="mdi:certificate-outline" width={64} height={64} style={{ color: '#ccc' }} />
                    <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                        No certificates yet
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<Icon icon="mdi:plus" />}
                        onClick={handleAdd}
                        sx={{ mt: 2 }}
                    >
                        Add Your First Certificate
                    </Button>
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.100' }}>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="center">Order</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {certificates.map((cert) => (
                                <TableRow key={cert.id} hover>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                width: 80,
                                                height: 80,
                                                borderRadius: 1,
                                                overflow: 'hidden',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <Image
                                                src={cert.image_url}
                                                alt={cert.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {cert.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxWidth: 300,
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
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {cert.display_order}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEdit(cert)}
                                            sx={{
                                                color: 'primary.main',
                                                '&:hover': { bgcolor: 'primary.50' },
                                            }}
                                        >
                                            <Icon icon="mdi:pencil" width={20} />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => setDeleteDialog({ open: true, id: cert.id })}
                                            sx={{
                                                color: 'error.main',
                                                ml: 1,
                                                '&:hover': { bgcolor: 'error.50' },
                                            }}
                                        >
                                            <Icon icon="mdi:delete" width={20} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
                <DialogTitle>Delete Certificate?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this certificate? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog({ open: false, id: null })}>Cancel</Button>
                    <Button
                        onClick={() => handleDelete(deleteDialog.id)}
                        color="error"
                        variant="contained"
                        startIcon={<Icon icon="mdi:delete" />}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
