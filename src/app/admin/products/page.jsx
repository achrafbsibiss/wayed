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
import { useRouter } from 'next/navigation';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
    const router = useRouter();

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();

            if (data.success) {
                setProducts(data.data);
            } else {
                setError('Failed to fetch products');
            }
        } catch (err) {
            setError('An error occurred while fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (data.success) {
                setProducts(products.filter((p) => p.id !== id));
                setDeleteDialog({ open: false, id: null });
            } else {
                setError(data.error || 'Failed to delete product');
            }
        } catch (err) {
            setError('An error occurred while deleting product');
        }
    };

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            Products Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage your harvest products and variants
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<Icon icon="solar:add-circle-linear" />}
                        onClick={() => router.push('/admin/products/new')}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                            },
                        }}
                    >
                        Add Product
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
                        <CircularProgress sx={{ color: '#667eea' }} />
                    </Box>
                ) : products.length === 0 ? (
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
                            <Icon icon="solar:box-minimalistic-linear" width={40} style={{ color: '#9ca3af' }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                            No products yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Get started by adding your first product
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Icon icon="solar:add-circle-linear" />}
                            onClick={() => router.push('/admin/products/new')}
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                textTransform: 'none',
                                px: 3,
                                py: 1.25,
                                borderRadius: 2,
                                fontWeight: 600,
                            }}
                        >
                            Add Your First Product
                        </Button>
                    </Card>
                ) : (
                    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Slug</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Variants</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Order</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow 
                                            key={product.id} 
                                            sx={{ 
                                                '&:hover': { bgcolor: '#f8f9fa' },
                                                '&:last-child td': { borderBottom: 0 },
                                            }}
                                        >
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
                                                            background: 'linear-gradient(135deg, #667eea20 0%, #764ba240 100%)',
                                                        }}
                                                    >
                                                        <Icon icon="solar:box-bold" width={18} style={{ color: '#667eea' }} />
                                                    </Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {product.name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={product.slug}
                                                    size="small"
                                                    sx={{ 
                                                        fontFamily: 'monospace', 
                                                        fontSize: '0.75rem',
                                                        bgcolor: '#f3f4f6',
                                                        border: 'none',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={`${product.variants?.length || 0} variants`}
                                                    size="small"
                                                    sx={{ 
                                                        bgcolor: '#667eea15',
                                                        color: '#667eea',
                                                        fontWeight: 600,
                                                        border: 'none',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={product.display_order}
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
                                                        onClick={() => router.push(`/admin/products/${product.id}`)}
                                                        sx={{
                                                            bgcolor: '#667eea15',
                                                            color: '#667eea',
                                                            '&:hover': { 
                                                                bgcolor: '#667eea25',
                                                            },
                                                        }}
                                                    >
                                                        <Icon icon="solar:pen-linear" width={18} />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => setDeleteDialog({ open: true, id: product.id })}
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
                        <span>Delete Product?</span>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this product? All its variants and images will be deleted. This action cannot be undone.
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
                            Delete Product
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
