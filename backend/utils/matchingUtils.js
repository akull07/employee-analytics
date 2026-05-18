/**
 * Calculate skill match percentage
 * @param {array} requiredSkills - Required skills
 * @param {array} candidateSkills - Candidate skills
 * @returns {object} - Match info with percentage
 */
export const calculateSkillMatch = (requiredSkills = [], candidateSkills = []) => {
  if (requiredSkills.length === 0) {
    return {
      matchPercentage: 0,
      matchedSkills: [],
      missingSkills: [],
    };
  }

  const requiredLower = requiredSkills.map(s => s.toLowerCase());
  const candidateLower = candidateSkills.map(s => s.toLowerCase());

  const matchedSkills = requiredLower.filter(skill =>
    candidateLower.includes(skill)
  );

  const missingSkills = requiredLower.filter(skill =>
    !candidateLower.includes(skill)
  );

  const matchPercentage = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );

  return {
    matchPercentage,
    matchedSkills,
    missingSkills,
  };
};

/**
 * Calculate experience match
 * @param {number} minRequired - Minimum required experience
 * @param {number} candidateExperience - Candidate experience
 * @returns {number} - Match score (0-100)
 */
export const calculateExperienceMatch = (minRequired, candidateExperience) => {
  if (candidateExperience < minRequired) {
    const deficitPercentage =
      ((minRequired - candidateExperience) / minRequired) * 100;
    return Math.max(0, 100 - deficitPercentage);
  }
  return 100;
};

/**
 * Calculate overall match score
 * @param {number} skillScore - Skill match percentage
 * @param {number} experienceScore - Experience match score
 * @returns {number} - Overall match score (0-100)
 */
export const calculateOverallScore = (skillScore = 0, experienceScore = 0) => {
  // Weight: 60% skills, 40% experience
  return Math.round(skillScore * 0.6 + experienceScore * 0.4);
};

/**
 * Get match category based on score
 * @param {number} score - Match score
 * @returns {string} - Match category
 */
export const getMatchCategory = (score) => {
  if (score >= 75) return 'High Match';
  if (score >= 50) return 'Medium Match';
  return 'Low Match';
};

/**
 * Generate matching summary
 * @param {object} matchData - Match data
 * @returns {string} - Match summary
 */
export const generateMatchSummary = (matchData) => {
  const {
    candidateName,
    jobTitle,
    matchPercentage,
    matchCategory,
    matchedSkillsCount,
    missingSkillsCount,
    experienceMatch,
  } = matchData;

  return `${candidateName} has a ${matchCategory} for ${jobTitle}. 
Skill match: ${matchPercentage}% (${matchedSkillsCount} matched, ${missingSkillsCount} missing). 
Experience match: ${experienceMatch}%.`;
};
