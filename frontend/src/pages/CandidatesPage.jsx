import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import { useCandidateStore } from '../store/candidateStore';
import { LoadingSpinner, EmptyState } from '../components/Common';
import { CandidateCard, Pagination, FilterPanel } from '../components/Cards';

export const CandidatesPage = () => {
  const navigate = useNavigate();
  const { candidates, loading, fetchCandidates, deleteCandidate, pagination } =
    useCandidateStore();
  const [filters, setFilters] = useState({ search: '', minExperience: undefined });
  const [view, setView] = useState('grid'); // grid or list

  useEffect(() => {
    fetchCandidates({ page: 1, limit: 10 });
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchCandidates({ page: 1, limit: 10, ...newFilters });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await deleteCandidate(id);
        toast.success('Candidate deleted successfully');
      } catch (error) {
        toast.error('Failed to delete candidate');
      }
    }
  };

  const handlePageChange = (page) => {
    fetchCandidates({ page, limit: 10, ...filters });
  };

  if (loading && candidates.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Candidates</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and shortlist your candidates
          </p>
        </div>
        <button onClick={() => navigate('/candidates/new')} className="btn-primary flex items-center space-x-2">
          <FiPlus size={20} />
          <span>Add Candidate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Filters</h3>
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {candidates.length === 0 ? (
            <div className="card">
              <EmptyState
                title="No candidates found"
                description="Start by adding your first candidate to the system."
              />
            </div>
          ) : (
            <div>
              <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2' : ''}`}>
                {candidates.map((candidate) => (
                  <div key={candidate._id} className="relative">
                    <CandidateCard
                      candidate={candidate}
                      onSelect={() => navigate(`/candidates/${candidate._id}`)}
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => navigate(`/candidates/${candidate._id}/edit`)}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      >
                        <FiEdit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(candidate._id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {pagination.pages > 1 && (
                <Pagination
                  page={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
