import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide candidate name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    education: {
      type: [
        {
          degree: String,
          field: String,
          institution: String,
          graduationYear: Number,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          description: String,
          technologies: [String],
          link: String,
        },
      ],
      default: [],
    },
    resumeLink: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    performanceScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isShortlisted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Create compound index for faster searches
candidateSchema.index({ createdBy: 1, email: 1 });
candidateSchema.index({ skills: 1 });
candidateSchema.index({ experience: 1 });

export default mongoose.model('Candidate', candidateSchema);
