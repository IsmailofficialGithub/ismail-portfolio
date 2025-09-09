import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    images: {
        type: [String],
        required: [true, 'At least one image is required'],
        validate: {
            validator: function(v) {
                return v.length > 0 && v.length <= 5;
            },
            message: 'Must have 1-5 images'
        }
    },
    code: {
        type: String,
        required: [true, 'Code repository URL is required'],
        validate: {
            validator: function(v) {
                return v.startsWith('https://github.com/');
            },
            message: 'Code URL must be a valid GitHub repository'
        }
    },
    livePreview: {
        type: String,
        validate: {
            validator: function(v) {
                return !v || v.startsWith('http');
            },
            message: 'Live preview must be a valid URL'
        }
    },
    techStack: {
        type: [String],
        required: [true, 'At least one technology is required'],
        validate: {
            validator: function(v) {
                return v.length > 0 && v.length <= 10;
            },
            message: 'Must have 1-10 technologies'
        }
    },
    featured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    }
}, {
    timestamps: true
});

ProjectSchema.index({ name: 'text', description: 'text' });
ProjectSchema.index({ techStack: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ featured: 1 });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default Project;