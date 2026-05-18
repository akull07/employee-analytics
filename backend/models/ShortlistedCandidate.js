import mongoose from 'mongoose';

const shortlistedCandidateSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    jobRequirement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobRequirement',
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    matchCategory: {
      type: String,
      enum: ['High Match', 'Medium Match', 'Low Match'],
      required: true,
    },
    matchedSkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    aiRecommendation: {
      type: String,
      default: '',
    },
    interviewQuestions: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['shortlisted', 'rejected', 'pending', 'interview_scheduled', 'offered'],
      default: 'shortlisted',
    },
    notes: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Create indexes for faster queries
shortlistedCandidateSchema.index({ candidate: 1, jobRequirement: 1 });
shortlistedCandidateSchema.index({ createdBy: 1 });
shortlistedCandidateSchema.index({ status: 1 });

export default mongoose.model('ShortlistedCandidate', shortlistedCandidateSchema);
