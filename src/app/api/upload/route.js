import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { supabaseAdmin } from '@/lib/supabase/server';

// POST /api/upload - Upload image or PDF to Supabase storage (admin only)
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type - accept images and PDFs
        const isImage = file.type.startsWith('image/');
        const isPdf = file.type === 'application/pdf';

        if (!isImage && !isPdf) {
            return NextResponse.json(
                { success: false, error: 'File must be an image or PDF' },
                { status: 400 }
            );
        }

        // Validate file size - 5MB for images, 10MB for PDFs
        const maxSize = isPdf ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
        const sizeLimit = isPdf ? '10MB' : '5MB';

        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, error: `File size must be less than ${sizeLimit}` },
                { status: 400 }
            );
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Get bucket from search params or default to 'certificates'
        const { searchParams } = new URL(request.url);
        const bucket = searchParams.get('bucket') || 'certificates';

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Supabase storage
        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            console.error('Storage error:', error);
            throw error;
        }

        // Get public URL
        const { data: publicUrlData } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(fileName);

        return NextResponse.json({
            success: true,
            data: {
                fileName,
                publicUrl: publicUrlData.publicUrl,
            },
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
