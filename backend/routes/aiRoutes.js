import express from 'express';
import {
  shortlistCandidates,
  getAIRecommendation,
  generateInterviewQuestionsAPI,
  rankCandidatesAPI,
  getImprovementSuggestions,
  getShortlistedCandidates,
  updateShortlistStatus,
  getAnalytics,
} from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Shortlist routes
router.post('/shortlist', shortlistCandidates);
router.get('/shortlist', getShortlistedCandidates);
router.put('/shortlist/:id', updateShortlistStatus);

// AI recommendation routes
router.post('/recommend', getAIRecommendation);
router.post('/interview-questions', generateInterviewQuestionsAPI);
router.post('/rank-candidates', rankCandidatesAPI);
router.post('/improvement-suggestions', getImprovementSuggestions);

// Analytics route
router.get('/analytics', getAnalytics);

export default router;
