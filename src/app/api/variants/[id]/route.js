import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { supabaseAdmin } from '@/lib/supabase/server';

// PUT /api/variants/[id] - Update variant
export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;
        const body = await request.json();
        const {
            variant_id,
            label,
            size,
            description,
            main_image_url,
            slider_images,
            display_order
        } = body;

        const { data, error } = await supabaseAdmin
            .from('product_variants')
            .update({
                variant_id,
                label,
                size,
                description,
                main_image_url,
                slider_images,
                display_order,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error updating variant:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update variant' },
            { status: 500 }
        );
    }
}

// DELETE /api/variants/[id] - Delete variant
export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;

        const { error } = await supabaseAdmin
            .from('product_variants')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting variant:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete variant' },
            { status: 500 }
        );
    }
}
