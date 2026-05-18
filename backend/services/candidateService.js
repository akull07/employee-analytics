import Candidate from '../models/Candidate.js';
import ShortlistedCandidate from '../models/ShortlistedCandidate.js';
import {
  calculateSkillMatch,
  calculateExperienceMatch,
  calculateOverallScore,
  getMatchCategory,
} from '../utils/matchingUtils.js';

/**
 * Match candidates against job requirements
 * @param {object} jobRequirement - Job requirement object
 * @param {array} candidates - Array of candidates (optional, will fetch if not provided)
 * @returns {Promise<array>} - Array of matched candidates with scores
 */
export const matchCandidatesWithJob = async (jobRequirement, candidates = null) => {
  try {
    // If candidates not provided, fetch all active candidates
    if (!candidates) {
      candidates = await Candidate.find({ isShortlisted: false });
    }

    const matches = [];

    for (const candidate of candidates) {
      // Calculate skill match
      const skillMatch = calculateSkillMatch(
        jobRequirement.requiredSkills,
        candidate.skills
      );

      // Calculate experience match
      const experienceScore = calculateExperienceMatch(
        jobRequirement.minExperience,
        candidate.experience
      );

      // Calculate overall match score
      const overallScore = calculateOverallScore(
        skillMatch.matchPercentage,
        experienceScore
      );

      // Determine match category
      const matchCategory = getMatchCategory(overallScore);

      matches.push({
        candidate,
        matchScore: overallScore,
        matchCategory,
        skillMatch: skillMatch.matchPercentage,
        experienceMatch: experienceScore,
        matchedSkills: skillMatch.matchedSkills,
        missingSkills: skillMatch.missingSkills,
      });
    }

    // Sort by match score (highest first)
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error('Error in matchCandidatesWithJob:', error);
    throw error;
  }
};

/**
 * Get candidate match for specific job
 * @param {string} candidateId - Candidate ID
 * @param {string} jobId - Job ID
 * @returns {Promise<object>} - Match data
 */
export const getCandidateJobMatch = async (candidateId, jobId) => {
  try {
    const candidate = await Candidate.findById(candidateId);
    const jobRequirement = await JobRequirement.findById(jobId);

    if (!candidate || !jobRequirement) {
      throw new Error('Candidate or Job not found');
    }

    // Calculate skill match
    const skillMatch = calculateSkillMatch(
      jobRequirement.requiredSkills,
      candidate.skills
    );

    // Calculate experience match
    const experienceScore = calculateExperienceMatch(
      jobRequirement.minExperience,
      candidate.experience
    );

    // Calculate overall match score
    const overallScore = calculateOverallScore(
      skillMatch.matchPercentage,
      experienceScore
    );

    // Determine match category
    const matchCategory = getMatchCategory(overallScore);

    return {
      candidate,
      job: jobRequirement,
      matchScore: overallScore,
      matchCategory,
      skillMatch: skillMatch.matchPercentage,
      experienceMatch: experienceScore,
      matchedSkills: skillMatch.matchedSkills,
      missingSkills: skillMatch.missingSkills,
    };
  } catch (error) {
    console.error('Error in getCandidateJobMatch:', error);
    throw error;
  }
};

/**
 * Get top candidates for a job
 * @param {string} jobId - Job ID
 * @param {number} limit - Number of top candidates to return
 * @returns {Promise<array>} - Top matched candidates
 */
export const getTopCandidatesForJob = async (jobId, limit = 10) => {
  try {
    const shortlistedCandidates = await ShortlistedCandidate.find({
      jobRequirement: jobId,
    })
      .populate('candidate')
      .sort({ matchScore: -1 })
      .limit(limit);

    return shortlistedCandidates;
  } catch (error) {
    console.error('Error in getTopCandidatesForJob:', error);
    throw error;
  }
};

/**
 * Get candidate analytics
 * @param {string} userId - User ID
 * @returns {Promise<object>} - Analytics data
 */
export const getCandidateAnalytics = async (userId) => {
  try {
    const totalCandidates = await Candidate.countDocuments({ createdBy: userId });
    const shortlistedCount = await ShortlistedCandidate.countDocuments({
      createdBy: userId,
      status: 'shortlisted',
    });
    const rejectedCount = await ShortlistedCandidate.countDocuments({
      createdBy: userId,
      status: 'rejected',
    });

    // Get average match score
    const avgMatchResult = await ShortlistedCandidate.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: null, avgScore: { $avg: '$matchScore' } } },
    ]);

    const avgMatchScore = avgMatchResult[0]?.avgScore || 0;

    return {
      totalCandidates,
      shortlistedCount,
      rejectedCount,
      avgMatchScore: Math.round(avgMatchScore),
    };
  } catch (error) {
    console.error('Error in getCandidateAnalytics:', error);
    throw error;
  }
};

export default {
  matchCandidatesWithJob,
  getCandidateJobMatch,
  getTopCandidatesForJob,
  getCandidateAnalytics,
};
