import dbConnect from '@/app/dbconnect/dbconnect';
import Project from '@/app/schema/projectSchema';
import { NextResponse } from 'next/server';

// / GET /api/projects - Get all projects with pagination
export async function GET(request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
        const search = searchParams.get('search') || '';
        const techStack = searchParams.get('techStack') || '';
        const status = searchParams.get('status') || '';
        const featured = searchParams.get('featured');

        // Build query
        const query = {};
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { techStack: { $in: [new RegExp(search, 'i')] } }
            ];
        }
        
        if (techStack) {
            query.techStack = { $in: [techStack] };
        }
        
        if (status) {
            query.status = status;
        }
        
        if (featured !== null && featured !== undefined) {
            query.featured = featured === 'true';
        }

        // Calculate pagination
        const skip = (page - 1) * limit;
        
        // Get projects and total count
        const [projects, total] = await Promise.all([
            Project.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Project.countDocuments(query)
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            success: true,
            data: {
                projects,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: total,
                    itemsPerPage: limit,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1
                }
            },
            message: 'Projects retrieved successfully'
        });

    } catch (error) {
        console.error('GET /api/projects error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to fetch projects'
        }, { status: 500 });
    }
}

// POST /api/projects - Create new project
export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        
        // Check if project with same name exists
        const existingProject = await Project.findOne({ 
            name: { $regex: `^${body.name}$`, $options: 'i' } 
        });
        
        if (existingProject) {
            return NextResponse.json({
                success: false,
                message: 'Project with this name already exists'
            }, { status: 409 });
        }

        const project = new Project(body);
        await project.save();

        return NextResponse.json({
            success: true,
            data: project,
            message: 'Project created successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('POST /api/projects error:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({
                success: false,
                message: 'Validation failed',
                errors
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to create project'
        }, { status: 500 });
    }
}
