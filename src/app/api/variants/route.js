import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { supabaseAdmin } from '@/lib/supabase/server';

// POST /api/variants - Create new variant (admin only)
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const {
            product_id,
            variant_id, // e.g. 'round', 'plum'
            label,
            size,
            description,
            main_image_url,
            slider_images,
            display_order
        } = body;

        if (!product_id || !variant_id || !label || !size || !description || !main_image_url) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('product_variants')
            .insert([
                {
                    product_id,
                    variant_id,
                    label,
                    size,
                    description,
                    main_image_url,
                    slider_images: slider_images || [],
                    display_order: display_order || 1,
                },
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
        console.error('Error creating variant:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create variant' },
            { status: 500 }
        );
    }
}
