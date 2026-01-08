import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { supabaseAdmin } from '@/lib/supabase/server';

// GET /api/certificates - Fetch all certificates (public)
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('certificates')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch certificates' },
            { status: 500 }
        );
    }
}

// POST /api/certificates - Create new certificate (admin only)
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
        const { title, description, image_url, display_order } = body;

        if (!title || !description || !image_url) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('certificates')
            .insert([
                {
                    title,
                    description,
                    image_url,
                    display_order: display_order || 1,
                },
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
        console.error('Error creating certificate:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create certificate' },
            { status: 500 }
        );
    }
}
