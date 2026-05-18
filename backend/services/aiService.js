import axios from 'axios';

/**
 * AI Service for OpenRouter API integration
 */

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Make request to OpenRouter API
 * @param {string} prompt - The prompt to send
 * @returns {Promise} - AI response
 */
const callOpenRouter = async (prompt) => {
  try {
    const response = await axios.post(
      OPENROUTER_BASE_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
          'X-Title': 'Candidate Shortlist AI',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error.message);
    throw new Error('Failed to get AI recommendation');
  }
};

/**
 * Generate AI recommendation for candidate-job match
 * @param {object} candidate - Candidate object
 * @param {object} job - Job requirement object
 * @returns {Promise<string>} - AI recommendation text
 */
export const generateCandidateRecommendation = async (candidate, job) => {
  const prompt = `
You are an expert HR consultant. Based on the following candidate profile and job requirements, provide a brief but insightful recommendation (2-3 sentences) about whether this candidate is a good fit for the role.

Candidate Profile:
- Name: ${candidate.name}
- Skills: ${candidate.skills.join(', ')}
- Experience: ${candidate.experience} years
- Education: ${
    candidate.education.length > 0
      ? candidate.education.map(e => `${e.degree} in ${e.field}`).join(', ')
      : 'Not provided'
  }
- Bio: ${candidate.bio || 'Not provided'}

Job Requirements:
- Title: ${job.jobTitle}
- Required Skills: ${job.requiredSkills.join(', ')}
- Minimum Experience: ${job.minExperience} years
- Description: ${job.description}

Provide a professional recommendation.`;

  return await callOpenRouter(prompt);
};

/**
 * Generate interview questions for candidate
 * @param {object} candidate - Candidate object
 * @param {object} job - Job requirement object
 * @returns {Promise<array>} - Array of interview questions
 */
export const generateInterviewQuestions = async (candidate, job) => {
  const prompt = `
You are an expert HR interviewer. Generate 5 specific and challenging interview questions for a candidate interviewing for the following position:

Candidate: ${candidate.name}
Skills: ${candidate.skills.join(', ')}
Experience: ${candidate.experience} years

Position: ${job.jobTitle}
Required Skills: ${job.requiredSkills.join(', ')}
Job Description: ${job.description}

Generate questions that:
1. Assess technical competency in the required skills
2. Evaluate relevant experience
3. Probe for problem-solving abilities
4. Assess cultural fit
5. Explore career goals alignment

Format the response as a JSON array of strings, with each question as a separate string. Example format: ["Question 1?", "Question 2?", ...]`;

  const response = await callOpenRouter(prompt);

  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.warn('Could not parse JSON response, using raw response');
  }

  // Fallback: split response into questions
  return response
    .split('\n')
    .filter(q => q.trim().length > 0)
    .slice(0, 5);
};

/**
 * Rank multiple candidates for a position
 * @param {array} candidates - Array of candidate objects with match scores
 * @param {object} job - Job requirement object
 * @returns {Promise<string>} - AI ranking analysis
 */
export const rankCandidates = async (candidates, job) => {
  const candidateList = candidates
    .map(
      (c, i) =>
        `${i + 1}. ${c.candidate.name} - Match Score: ${c.matchScore}%, Skills: ${c.candidate.skills.join(
          ', '
        )}, Experience: ${c.candidate.experience} years`
    )
    .join('\n');

  const prompt = `
You are a senior HR consultant. Analyze and rank these candidates for the position of "${job.jobTitle}".

Candidates:
${candidateList}

Job Requirements:
- Required Skills: ${job.requiredSkills.join(', ')}
- Minimum Experience: ${job.minExperience} years
- Preferred Skills: ${job.preferredSkills.join(', ') || 'None specified'}

Provide:
1. A ranking analysis (top 3 candidates)
2. Specific reasons for the ranking
3. Overall hiring recommendation

Be concise and professional (max 200 words).`;

  return await callOpenRouter(prompt);
};

/**
 * Generate improvement suggestions for candidate
 * @param {object} candidate - Candidate object
 * @param {object} job - Job requirement object
 * @returns {Promise<string>} - Improvement suggestions
 */
export const generateImprovementSuggestions = async (candidate, job) => {
  const missingSkills = job.requiredSkills.filter(
    skill => !candidate.skills.some(s => s.toLowerCase() === skill.toLowerCase())
  );

  const prompt = `
You are a career development consultant. A candidate wants to improve their qualifications for the following role:

Current Profile:
- Skills: ${candidate.skills.join(', ')}
- Experience: ${candidate.experience} years
- Education: ${
    candidate.education.length > 0
      ? candidate.education.map(e => e.degree).join(', ')
      : 'Not provided'
  }

Target Position: ${job.jobTitle}
Missing Skills: ${missingSkills.join(', ') || 'All skills present'}
Required Skills: ${job.requiredSkills.join(', ')}
Required Experience: ${job.minExperience} years

Provide 3-4 specific, actionable improvement suggestions that would help the candidate become qualified for this role. Be encouraging but realistic.`;

  return await callOpenRouter(prompt);
};

export default {
  generateCandidateRecommendation,
  generateInterviewQuestions,
  rankCandidates,
  generateImprovementSuggestions,
};
