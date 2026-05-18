import asyncHandler from 'express-async-handler';
import JobRequirement from '../models/JobRequirement.js';
import { validateJobInput } from '../validators/validators.js';

/**
 * @desc   Create job requirement
 * @route  POST /api/jobs
 * @access Private
 */
export const createJob = asyncHandler(async (req, res, next) => {
  const {
    jobTitle,
    description,
    requiredSkills,
    preferredSkills,
    minExperience,
    maxExperience,
    minSalary,
    maxSalary,
    department,
    location,
    jobType,
  } = req.body;

  // Validate input
  const validation = validateJobInput({
    jobTitle,
    requiredSkills,
    minExperience,
  });

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors,
    });
  }

  // Create job
  const job = await JobRequirement.create({
    jobTitle,
    description,
    requiredSkills,
    preferredSkills: preferredSkills || [],
    minExperience,
    maxExperience: maxExperience || null,
    minSalary: minSalary || null,
    maxSalary: maxSalary || null,
    department,
    location,
    jobType: jobType || 'Full-time',
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    job,
  });
});

/**
 * @desc   Get all jobs for user
 * @route  GET /api/jobs
 * @access Private
 */
export const getJobs = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, isActive = true } = req.query;

  const filter = { createdBy: req.user.id };

  if (isActive !== 'all') {
    filter.isActive = isActive === 'true';
  }

  const skip = (page - 1) * limit;
  const total = await JobRequirement.countDocuments(filter);

  const jobs = await JobRequirement.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    jobs,
  });
});

/**
 * @desc   Get single job
 * @route  GET /api/jobs/:id
 * @access Private
 */
export const getJobById = asyncHandler(async (req, res, next) => {
  const job = await JobRequirement.findOne({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  res.status(200).json({
    success: true,
    job,
  });
});

/**
 * @desc   Update job
 * @route  PUT /api/jobs/:id
 * @access Private
 */
export const updateJob = asyncHandler(async (req, res, next) => {
  const {
    jobTitle,
    description,
    requiredSkills,
    preferredSkills,
    minExperience,
    maxExperience,
    minSalary,
    maxSalary,
    department,
    location,
    jobType,
    isActive,
  } = req.body;

  let job = await JobRequirement.findOne({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  // Update fields
  if (jobTitle) job.jobTitle = jobTitle;
  if (description) job.description = description;
  if (requiredSkills) job.requiredSkills = requiredSkills;
  if (preferredSkills) job.preferredSkills = preferredSkills;
  if (minExperience !== undefined) job.minExperience = minExperience;
  if (maxExperience !== undefined) job.maxExperience = maxExperience;
  if (minSalary !== undefined) job.minSalary = minSalary;
  if (maxSalary !== undefined) job.maxSalary = maxSalary;
  if (department) job.department = department;
  if (location) job.location = location;
  if (jobType) job.jobType = jobType;
  if (isActive !== undefined) job.isActive = isActive;

  job = await job.save();

  res.status(200).json({
    success: true,
    job,
  });
});

/**
 * @desc   Delete job
 * @route  DELETE /api/jobs/:id
 * @access Private
 */
export const deleteJob = asyncHandler(async (req, res, next) => {
  const job = await JobRequirement.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Job deleted successfully',
  });
});
