import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { supabaseAdmin } from '@/lib/supabase/server';

// GET /api/products - Fetch all products (public)
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('products')
            .select(`
                *,
                variants:product_variants(*)
            `)
            .order('display_order', { ascending: true });

        if (error) throw error;

        // Sort variants by display_order for each product
        const products = data.map(product => ({
            ...product,
            variants: product.variants?.sort((a, b) => a.display_order - b.display_order) || []
        }));

        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST /api/products - Create new product (admin only)
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
        const { name, slug, has_season_chart, display_order } = body;

        if (!name || !slug) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('products')
            .insert([
                {
                    name,
                    slug,
                    has_season_chart: has_season_chart || false,
                    display_order: display_order || 1,
                },
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
