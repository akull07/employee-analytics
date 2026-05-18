import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * Public routes
 */
router.post('/register', register);
router.post('/login', login);

/**
 * Protected routes
 */
router.use(authenticate);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/logout', logout);

export default router;
