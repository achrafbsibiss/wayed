import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { supabaseAdmin } from '@/lib/supabase/server';

// PUT /api/certificates/[id] - Update certificate (admin only)
export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { title, description, image_url, display_order } = body;

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (image_url !== undefined) updateData.image_url = image_url;
        if (display_order !== undefined) updateData.display_order = display_order;

        const { data, error } = await supabaseAdmin
            .from('certificates')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error updating certificate:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update certificate' },
            { status: 500 }
        );
    }
}

// DELETE /api/certificates/[id] - Delete certificate (admin only)
export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;

        // First, get the certificate to find the image URL
        const { data: certificate, error: fetchError } = await supabaseAdmin
            .from('certificates')
            .select('image_url')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        // Delete the image from storage if it exists
        if (certificate?.image_url) {
            const imagePath = certificate.image_url.split('/').pop();
            const { error: storageError } = await supabaseAdmin.storage
                .from('certificates')
                .remove([imagePath]);

            if (storageError) {
                console.error('Error deleting image from storage:', storageError);
            }
        }

        // Delete the certificate from database
        const { error: deleteError } = await supabaseAdmin
            .from('certificates')
            .delete()
            .eq('id', id);

        if (deleteError) throw deleteError;

        return NextResponse.json({ success: true, message: 'Certificate deleted successfully' });
    } catch (error) {
        console.error('Error deleting certificate:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete certificate' },
            { status: 500 }
        );
    }
}
