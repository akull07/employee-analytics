import { create } from 'zustand';
import { candidateService } from '../services/api';

export const useCandidateStore = create((set) => ({
  candidates: [],
  loading: false,
  error: null,
  selectedCandidate: null,
  pagination: { page: 1, limit: 10, total: 0 },

  fetchCandidates: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await candidateService.getAll(params);
      set({
        candidates: response.candidates,
        pagination: {
          page: response.page,
          limit: params.limit || 10,
          total: response.total,
        },
        loading: false,
      });
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to fetch candidates', loading: false });
      throw error;
    }
  },

  fetchCandidateById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await candidateService.getById(id);
      set({ selectedCandidate: response.candidate, loading: false });
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to fetch candidate', loading: false });
      throw error;
    }
  },

  createCandidate: async (candidateData) => {
    set({ loading: true, error: null });
    try {
      const response = await candidateService.create(candidateData);
      set((state) => ({
        candidates: [response.candidate, ...state.candidates],
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to create candidate', loading: false });
      throw error;
    }
  },

  updateCandidate: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await candidateService.update(id, data);
      set((state) => ({
        candidates: state.candidates.map((c) =>
          c._id === id ? response.candidate : c
        ),
        selectedCandidate: response.candidate,
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to update candidate', loading: false });
      throw error;
    }
  },

  deleteCandidate: async (id) => {
    set({ loading: true, error: null });
    try {
      await candidateService.delete(id);
      set((state) => ({
        candidates: state.candidates.filter((c) => c._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message || 'Failed to delete candidate', loading: false });
      throw error;
    }
  },

  searchCandidates: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await candidateService.search(params);
      set({
        candidates: response.candidates,
        loading: false,
      });
      return response;
    } catch (error) {
      set({ error: error.message || 'Failed to search candidates', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
