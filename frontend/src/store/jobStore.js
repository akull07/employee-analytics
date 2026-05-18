import { create } from 'zustand';
import { jobService } from '../services/api';

export const useJobStore = create((set) => ({
  jobs: [],
  loading: false,
  error: null,
  selectedJob: null,
  pagination: { page: 1, limit: 10, total: 0 },

  fetchJobs: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await jobService.getAll(params);
      set({
        jobs: response.jobs,
        pagination: {
          page: response.page,
          limit: params.limit || 10,
          total: response.total,
        },
        loading: false,
      });
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to fetch jobs', loading: false });
      throw error;
    }
  },

  fetchJobById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await jobService.getById(id);
      set({ selectedJob: response.job, loading: false });
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to fetch job', loading: false });
      throw error;
    }
  },

  createJob: async (jobData) => {
    set({ loading: true, error: null });
    try {
      const response = await jobService.create(jobData);
      set((state) => ({
        jobs: [response.job, ...state.jobs],
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to create job', loading: false });
      throw error;
    }
  },

  updateJob: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await jobService.update(id, data);
      set((state) => ({
        jobs: state.jobs.map((j) => (j._id === id ? response.job : j)),
        selectedJob: response.job,
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to update job', loading: false });
      throw error;
    }
  },

  deleteJob: async (id) => {
    set({ loading: true, error: null });
    try {
      await jobService.delete(id);
      set((state) => ({
        jobs: state.jobs.filter((j) => j._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message || 'Failed to delete job', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
