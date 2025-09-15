import dbConnect from '@/app/dbconnect/dbconnect';
import Project from '@/app/schema/projectSchema';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await dbConnect();

        // Get query params
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1'); // default page = 1
        const limit = parseInt(searchParams.get('limit') || '6'); // default limit = 6
        const skip = (page - 1) * limit;

        // Fetch projects with pagination
        const featuredProjects = await Project.find({ 
            featured: true, 
            status: 'published' 
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

        // Optional: get total count for pagination info
        const totalProjects = await Project.countDocuments({ 
            featured: true, 
            status: 'published' 
        });

        return NextResponse.json({
            success: true,
            data: featuredProjects,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalProjects / limit),
                totalProjects
            },
            message: 'Featured projects retrieved successfully'
        });

    } catch (error) {
        console.error('GET /api/projects/featured error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch featured projects'
        }, { status: 500 });
    }
}
