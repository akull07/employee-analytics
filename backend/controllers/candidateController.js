import asyncHandler from 'express-async-handler';
import Candidate from '../models/Candidate.js';
import { validateCandidateInput } from '../validators/validators.js';

/**
 * @desc   Create a new candidate
 * @route  POST /api/candidates
 * @access Private
 */
export const createCandidate = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    skills,
    experience,
    education,
    projects,
    resumeLink,
    bio,
    github,
    linkedin,
    performanceScore,
  } = req.body;

  // Validate input
  const validation = validateCandidateInput({
    name,
    email,
    experience,
    performanceScore,
  });

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors,
    });
  }

  // Check if candidate email already exists for this user
  const existingCandidate = await Candidate.findOne({
    email,
    createdBy: req.user.id,
  });

  if (existingCandidate) {
    return res.status(400).json({
      success: false,
      message: 'Candidate with this email already exists',
    });
  }

  // Create candidate
  const candidate = await Candidate.create({
    name,
    email,
    phone,
    skills: skills || [],
    experience: experience || 0,
    education: education || [],
    projects: projects || [],
    resumeLink,
    bio,
    github,
    linkedin,
    performanceScore: performanceScore || 0,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    candidate,
  });
});

/**
 * @desc   Get all candidates for user
 * @route  GET /api/candidates
 * @access Private
 */
export const getCandidates = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, skills, experience, search } = req.query;

  // Build filter
  const filter = { createdBy: req.user.id };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  if (skills) {
    const skillArray = Array.isArray(skills) ? skills : [skills];
    filter.skills = { $in: skillArray };
  }

  if (experience) {
    filter.experience = { $gte: parseInt(experience) };
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Get total count
  const total = await Candidate.countDocuments(filter);

  // Get candidates
  const candidates = await Candidate.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    candidates,
  });
});

/**
 * @desc   Get single candidate
 * @route  GET /api/candidates/:id
 * @access Private
 */
export const getCandidateById = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findOne({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: 'Candidate not found',
    });
  }

  res.status(200).json({
    success: true,
    candidate,
  });
});

/**
 * @desc   Update candidate
 * @route  PUT /api/candidates/:id
 * @access Private
 */
export const updateCandidate = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    skills,
    experience,
    education,
    projects,
    resumeLink,
    bio,
    github,
    linkedin,
    performanceScore,
  } = req.body;

  // Find candidate
  let candidate = await Candidate.findOne({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: 'Candidate not found',
    });
  }

  // Update fields
  if (name) candidate.name = name;
  if (email) candidate.email = email;
  if (phone) candidate.phone = phone;
  if (skills) candidate.skills = skills;
  if (experience !== undefined) candidate.experience = experience;
  if (education) candidate.education = education;
  if (projects) candidate.projects = projects;
  if (resumeLink) candidate.resumeLink = resumeLink;
  if (bio) candidate.bio = bio;
  if (github) candidate.github = github;
  if (linkedin) candidate.linkedin = linkedin;
  if (performanceScore !== undefined) candidate.performanceScore = performanceScore;

  // Save
  candidate = await candidate.save();

  res.status(200).json({
    success: true,
    candidate,
  });
});

/**
 * @desc   Delete candidate
 * @route  DELETE /api/candidates/:id
 * @access Private
 */
export const deleteCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: 'Candidate not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Candidate deleted successfully',
  });
});

/**
 * @desc   Search candidates
 * @route  GET /api/candidates/search
 * @access Private
 */
export const searchCandidates = asyncHandler(async (req, res, next) => {
  const { query, skills, minExperience, maxExperience } = req.query;

  const filter = { createdBy: req.user.id };

  if (query) {
    filter.$or = [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
      { bio: { $regex: query, $options: 'i' } },
    ];
  }

  if (skills) {
    const skillArray = Array.isArray(skills) ? skills : [skills];
    filter.skills = { $in: skillArray };
  }

  if (minExperience || maxExperience) {
    filter.experience = {};
    if (minExperience) filter.experience.$gte = parseInt(minExperience);
    if (maxExperience) filter.experience.$lte = parseInt(maxExperience);
  }

  const candidates = await Candidate.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: candidates.length,
    candidates,
  });
});
