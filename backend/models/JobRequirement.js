import mongoose from 'mongoose';

const jobRequirementSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    requiredSkills: {
      type: [String],
      required: [true, 'Please provide required skills'],
    },
    preferredSkills: {
      type: [String],
      default: [],
    },
    minExperience: {
      type: Number,
      required: [true, 'Please provide minimum experience'],
      min: 0,
    },
    maxExperience: {
      type: Number,
      default: null,
    },
    minSalary: {
      type: Number,
      default: null,
    },
    maxSalary: {
      type: Number,
      default: null,
    },
    department: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'],
      default: 'Full-time',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('JobRequirement', jobRequirementSchema);
