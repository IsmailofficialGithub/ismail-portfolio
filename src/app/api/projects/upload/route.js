import { uploadToCloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No images provided'
            }, { status: 400 });
        }

        if (files.length > 5) {
            return NextResponse.json({
                success: false,
                message: 'Maximum 5 images allowed'
            }, { status: 400 });
        }

        const uploadPromises = files.map(async (file) => {
            // Validate file
            if (!file.type.startsWith('image/')) {
                throw new Error(`Invalid file type: ${file.type}`);
            }

            if (file.size > 10 * 1024 * 1024) { // 10MB
                throw new Error(`File too large: ${file.name}`);
            }

            // Convert file to buffer
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Upload to Cloudinary
            const result = await uploadToCloudinary(buffer, file.name);
            
            return {
                url: result.secure_url,
                publicId: result.public_id,
                width: result.width,
                height: result.height,
            };
        });

        const uploadedImages = await Promise.all(uploadPromises);

        return NextResponse.json({
            success: true,
            data: { images: uploadedImages },
            message: `${uploadedImages.length} images uploaded successfully`
        }, { status: 201 });

    } catch (error) {
        console.error('POST /api/projects/upload error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to upload images'
        }, { status: 500 });
    }
}
