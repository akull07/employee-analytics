import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import { useJobStore } from '../store/jobStore';
import { LoadingSpinner, EmptyState } from '../components/Common';

export const JobsPage = () => {
  const navigate = useNavigate();
  const { jobs, loading, fetchJobs, deleteJob, pagination } = useJobStore();
  const [filters, setFilters] = useState({ isActive: true });

  useEffect(() => {
    fetchJobs({ page: 1, limit: 10 });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        toast.success('Job deleted successfully');
      } catch (error) {
        toast.error('Failed to delete job');
      }
    }
  };

  const handlePageChange = (page) => {
    fetchJobs({ page, limit: 10, ...filters });
  };

  if (loading && jobs.length === 0) {
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
          <h1 className="text-3xl font-bold">Job Requirements</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage job openings and match candidates
          </p>
        </div>
        <button onClick={() => navigate('/jobs/new')} className="btn-primary flex items-center space-x-2">
          <FiPlus size={20} />
          <span>Create Job</span>
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No jobs created"
            description="Create your first job requirement to start shortlisting candidates."
          />
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="card border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{job.jobTitle}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {job.department} {job.location && `• ${job.location}`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/jobs/${job._id}/shortlist`)}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Match Candidates
                  </button>
                  <button
                    onClick={() => navigate(`/jobs/${job._id}/edit`)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg"
                  >
                    <FiEdit2 size={18} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg"
                  >
                    <FiTrash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-3">{job.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Min Experience</p>
                  <p className="font-semibold">{job.minExperience} years</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Job Type</p>
                  <p className="font-semibold">{job.jobType}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Required Skills</p>
                  <p className="font-semibold">{job.requiredSkills.length} skills</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Status</p>
                  <p className={`font-semibold ${job.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
