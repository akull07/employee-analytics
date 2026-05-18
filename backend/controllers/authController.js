import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { validateUserInput } from '../validators/validators.js';
import { sendTokenResponse } from '../utils/tokenUtils.js';

/**
 * @desc   Register user
 * @route  POST /api/auth/register
 * @access Public
 */
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, company, department } = req.body;

  // Validate input
  const validation = validateUserInput({ name, email, password });
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors,
    });
  }

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: 'User already exists',
    });
  }

  // Create user
  user = await User.create({
    name,
    email,
    password,
    company: company || '',
    department: department || '',
    role: 'recruiter',
  });

  sendTokenResponse(user, 201, res);
});

/**
 * @desc   Login user
 * @route  POST /api/auth/login
 * @access Public
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    });
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  sendTokenResponse(user, 200, res);
});

/**
 * @desc   Get current logged in user
 * @route  GET /api/auth/profile
 * @access Private
 */
export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * @desc   Update user profile
 * @route  PUT /api/auth/profile
 * @access Private
 */
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, company, department } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, company, department },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * @desc   Logout user (client-side)
 * @route  POST /api/auth/logout
 * @access Private
 */
export const logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
