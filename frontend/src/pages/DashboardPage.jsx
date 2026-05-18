import React, { useEffect, useState } from 'react';
import { FiUsers, FiBriefcase, FiCheckSquare, FiBarChart2 } from 'react-icons/fi';
import { aiService } from '../services/api';
import { LoadingSpinner, EmptyState } from '../components/Common';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await aiService.getAnalytics();
      setAnalytics(response.analytics);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = [
    {
      icon: FiUsers,
      label: 'Total Candidates',
      value: analytics?.totalCandidates || 0,
      color: 'bg-blue-500',
    },
    {
      icon: FiCheckSquare,
      label: 'Shortlisted',
      value: analytics?.shortlistedCount || 0,
      color: 'bg-green-500',
    },
    {
      icon: FiBriefcase,
      label: 'Rejected',
      value: analytics?.rejectedCount || 0,
      color: 'bg-red-500',
    },
    {
      icon: FiBarChart2,
      label: 'Avg Match Score',
      value: `${analytics?.avgMatchScore || 0}%`,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's your recruitment overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
                <p className="text-3xl font-bold mt-2">{value}</p>
              </div>
              <div className={`${color} p-3 rounded-lg text-white`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/candidates/new" className="btn-primary w-full text-center">
              + Add Candidate
            </a>
            <a href="/jobs/new" className="btn-secondary w-full text-center">
              + Create Job
            </a>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <EmptyState
            title="No recent activity"
            description="Start by adding candidates or creating job requirements."
          />
        </div>
      </div>
    </div>
  );
};
