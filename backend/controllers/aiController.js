import asyncHandler from 'express-async-handler';
import ShortlistedCandidate from '../models/ShortlistedCandidate.js';
import Candidate from '../models/Candidate.js';
import JobRequirement from '../models/JobRequirement.js';
import {
  generateCandidateRecommendation,
  generateInterviewQuestions,
  rankCandidates,
  generateImprovementSuggestions,
} from '../services/aiService.js';
import {
  matchCandidatesWithJob,
  getCandidateJobMatch,
  getTopCandidatesForJob,
  getCandidateAnalytics,
} from '../services/candidateService.js';

/**
 * @desc   Shortlist candidates for a job
 * @route  POST /api/ai/shortlist
 * @access Private
 */
export const shortlistCandidates = asyncHandler(async (req, res, next) => {
  const { jobId, candidateIds } = req.body;

  if (!jobId) {
    return res.status(400).json({
      success: false,
      message: 'Job ID is required',
    });
  }

  // Get job requirement
  const job = await JobRequirement.findOne({
    _id: jobId,
    createdBy: req.user.id,
  });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  // Get candidates (either specified or all)
  let candidates;
  if (candidateIds && candidateIds.length > 0) {
    candidates = await Candidate.find({
      _id: { $in: candidateIds },
      createdBy: req.user.id,
    });
  } else {
    candidates = await Candidate.find({ createdBy: req.user.id });
  }

  if (candidates.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No candidates found',
    });
  }

  // Match candidates with job
  const matches = await matchCandidatesWithJob(job, candidates);

  // Create shortlisted candidates
  const shortlisted = [];

  for (const match of matches) {
    // Check if already shortlisted
    const existing = await ShortlistedCandidate.findOne({
      candidate: match.candidate._id,
      jobRequirement: job._id,
    });

    if (!existing) {
      const shortlist = await ShortlistedCandidate.create({
        candidate: match.candidate._id,
        jobRequirement: job._id,
        matchScore: match.matchScore,
        matchCategory: match.matchCategory,
        matchedSkills: match.matchedSkills,
        missingSkills: match.missingSkills,
        createdBy: req.user.id,
      });

      shortlisted.push(shortlist);
    }
  }

  res.status(201).json({
    success: true,
    count: shortlisted.length,
    shortlisted,
  });
});

/**
 * @desc   Get AI recommendation for candidate
 * @route  POST /api/ai/recommend
 * @access Private
 */
export const getAIRecommendation = asyncHandler(async (req, res, next) => {
  const { candidateId, jobId } = req.body;

  // Get candidate and job
  const candidate = await Candidate.findOne({
    _id: candidateId,
    createdBy: req.user.id,
  });

  const job = await JobRequirement.findOne({
    _id: jobId,
    createdBy: req.user.id,
  });

  if (!candidate || !job) {
    return res.status(404).json({
      success: false,
      message: 'Candidate or Job not found',
    });
  }

  // Get match data
  const matchData = await getCandidateJobMatch(candidateId, jobId);

  // Generate AI recommendation
  const aiRecommendation = await generateCandidateRecommendation(
    candidate,
    job
  );

  // Update shortlist record with recommendation
  await ShortlistedCandidate.findOneAndUpdate(
    { candidate: candidateId, jobRequirement: jobId },
    { aiRecommendation }
  );

  res.status(200).json({
    success: true,
    candidate,
    job,
    matchData,
    aiRecommendation,
  });
});

/**
 * @desc   Generate interview questions for candidate
 * @route  POST /api/ai/interview-questions
 * @access Private
 */
export const generateInterviewQuestionsAPI = asyncHandler(
  async (req, res, next) => {
    const { candidateId, jobId } = req.body;

    // Get candidate and job
    const candidate = await Candidate.findOne({
      _id: candidateId,
      createdBy: req.user.id,
    });

    const job = await JobRequirement.findOne({
      _id: jobId,
      createdBy: req.user.id,
    });

    if (!candidate || !job) {
      return res.status(404).json({
        success: false,
        message: 'Candidate or Job not found',
      });
    }

    // Generate interview questions
    const questions = await generateInterviewQuestions(candidate, job);

    // Update shortlist record with questions
    await ShortlistedCandidate.findOneAndUpdate(
      { candidate: candidateId, jobRequirement: jobId },
      { interviewQuestions: questions }
    );

    res.status(200).json({
      success: true,
      candidateName: candidate.name,
      jobTitle: job.jobTitle,
      questions,
    });
  }
);

/**
 * @desc   Rank candidates for a job
 * @route  POST /api/ai/rank-candidates
 * @access Private
 */
export const rankCandidatesAPI = asyncHandler(async (req, res, next) => {
  const { jobId, limit = 10 } = req.body;

  // Get job
  const job = await JobRequirement.findOne({
    _id: jobId,
    createdBy: req.user.id,
  });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  // Get top candidates for job
  const candidates = await getTopCandidatesForJob(jobId, limit);

  if (candidates.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No shortlisted candidates for this job',
    });
  }

  // Generate ranking analysis
  const rankingAnalysis = await rankCandidates(candidates, job);

  res.status(200).json({
    success: true,
    jobTitle: job.jobTitle,
    candidates,
    rankingAnalysis,
  });
});

/**
 * @desc   Get improvement suggestions for candidate
 * @route  POST /api/ai/improvement-suggestions
 * @access Private
 */
export const getImprovementSuggestions = asyncHandler(async (req, res, next) => {
  const { candidateId, jobId } = req.body;

  // Get candidate and job
  const candidate = await Candidate.findOne({
    _id: candidateId,
    createdBy: req.user.id,
  });

  const job = await JobRequirement.findOne({
    _id: jobId,
    createdBy: req.user.id,
  });

  if (!candidate || !job) {
    return res.status(404).json({
      success: false,
      message: 'Candidate or Job not found',
    });
  }

  // Generate improvement suggestions
  const suggestions = await generateImprovementSuggestions(candidate, job);

  res.status(200).json({
    success: true,
    candidateName: candidate.name,
    jobTitle: job.jobTitle,
    suggestions,
  });
});

/**
 * @desc   Get all shortlisted candidates for job
 * @route  GET /api/shortlist?jobId=xxx
 * @access Private
 */
export const getShortlistedCandidates = asyncHandler(async (req, res, next) => {
  const { jobId, status, page = 1, limit = 10 } = req.query;

  if (!jobId) {
    return res.status(400).json({
      success: false,
      message: 'Job ID is required',
    });
  }

  const filter = {
    jobRequirement: jobId,
    createdBy: req.user.id,
  };

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;
  const total = await ShortlistedCandidate.countDocuments(filter);

  const shortlisted = await ShortlistedCandidate.find(filter)
    .populate('candidate')
    .populate('jobRequirement')
    .sort({ matchScore: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    shortlisted,
  });
});

/**
 * @desc   Update shortlist status
 * @route  PUT /api/shortlist/:id
 * @access Private
 */
export const updateShortlistStatus = asyncHandler(async (req, res, next) => {
  const { status, notes } = req.body;

  const shortlist = await ShortlistedCandidate.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    { status, notes },
    { new: true, runValidators: true }
  )
    .populate('candidate')
    .populate('jobRequirement');

  if (!shortlist) {
    return res.status(404).json({
      success: false,
      message: 'Shortlist not found',
    });
  }

  res.status(200).json({
    success: true,
    shortlist,
  });
});

/**
 * @desc   Get analytics
 * @route  GET /api/analytics
 * @access Private
 */
export const getAnalytics = asyncHandler(async (req, res, next) => {
  const analytics = await getCandidateAnalytics(req.user.id);

  res.status(200).json({
    success: true,
    analytics,
  });
});
