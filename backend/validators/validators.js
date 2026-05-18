/**
 * Validation schemas and validators
 */

export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateUserInput = (userData) => {
  const errors = [];

  if (!userData.name || userData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }

  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 6 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateCandidateInput = (candidateData) => {
  const errors = [];

  if (!candidateData.name || candidateData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!validateEmail(candidateData.email)) {
    errors.push('Invalid email format');
  }

  if (candidateData.experience && candidateData.experience < 0) {
    errors.push('Experience cannot be negative');
  }

  if (
    candidateData.performanceScore &&
    (candidateData.performanceScore < 0 || candidateData.performanceScore > 100)
  ) {
    errors.push('Performance score must be between 0 and 100');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateJobInput = (jobData) => {
  const errors = [];

  if (!jobData.jobTitle || jobData.jobTitle.trim().length < 2) {
    errors.push('Job title must be at least 2 characters');
  }

  if (!jobData.requiredSkills || jobData.requiredSkills.length === 0) {
    errors.push('At least one required skill must be specified');
  }

  if (jobData.minExperience < 0) {
    errors.push('Minimum experience cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
