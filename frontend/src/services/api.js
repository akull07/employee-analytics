import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

/**
 * Authentication Service
 */
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  logout: () => api.post('/auth/logout'),
};

/**
 * Candidate Service
 */
export const candidateService = {
  create: (candidateData) => api.post('/candidates', candidateData),
  getAll: (params) => api.get('/candidates', { params }),
  getById: (id) => api.get(`/candidates/${id}`),
  update: (id, data) => api.put(`/candidates/${id}`, data),
  delete: (id) => api.delete(`/candidates/${id}`),
  search: (params) => api.get('/candidates/search', { params }),
};

/**
 * Job Service
 */
export const jobService = {
  create: (jobData) => api.post('/jobs', jobData),
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
};

/**
 * AI & Shortlist Service
 */
export const aiService = {
  shortlistCandidates: (data) => api.post('/ai/shortlist', data),
  getShortlistedCandidates: (params) => api.get('/ai/shortlist', { params }),
  updateShortlistStatus: (id, data) => api.put(`/ai/shortlist/${id}`, data),
  getRecommendation: (data) => api.post('/ai/recommend', data),
  generateInterviewQuestions: (data) => api.post('/ai/interview-questions', data),
  rankCandidates: (data) => api.post('/ai/rank-candidates', data),
  getImprovementSuggestions: (data) => api.post('/ai/improvement-suggestions', data),
  getAnalytics: () => api.get('/ai/analytics'),
};

export default api;
