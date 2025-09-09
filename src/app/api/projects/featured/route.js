import dbConnect from '@/app/dbconnect/dbconnect';
import Project from '@/app/schema/projectSchema';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        
        const featuredProjects = await Project.find({ 
            featured: true, 
            status: 'published' 
        })
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();

        return NextResponse.json({
            success: true,
            data: featuredProjects,
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