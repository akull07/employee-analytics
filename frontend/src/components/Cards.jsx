import React from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

export const MatchScoreBar = ({ score, category }) => {
  const getColor = () => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBgColor = () => {
    if (score >= 75) return 'bg-green-100 dark:bg-green-900';
    if (score >= 50) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  const getTextColor = () => {
    if (score >= 75) return 'text-green-800 dark:text-green-200';
    if (score >= 50) return 'text-yellow-800 dark:text-yellow-200';
    return 'text-red-800 dark:text-red-200';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">{category || 'Match Score'}</span>
        <span className="text-lg font-bold">{score}%</span>
      </div>
      <div className={`w-full h-2 rounded-full ${getBgColor()}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export const CandidateCard = ({ candidate, onSelect }) => {
  const topSkills = candidate.skills?.slice(0, 3) || [];

  return (
    <div
      onClick={onSelect}
      className="card cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{candidate.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.email}</p>
        </div>
        {candidate.performanceScore && (
          <div className="badge-info">{candidate.performanceScore}/100</div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Experience
          </p>
          <p className="text-sm">{candidate.experience} years</p>
        </div>

        {topSkills.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Top Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {topSkills.map((skill) => (
                <span key={skill} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const SkillTag = ({ skill, isMatched, isMissing }) => {
  let className = 'text-xs px-2 py-1 rounded font-medium ';

  if (isMatched) {
    className += 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  } else if (isMissing) {
    className += 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  } else {
    className += 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }

  return <span className={className}>{skill}</span>;
};

export const FilterPanel = ({ filters, onFilterChange }) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search candidates..."
        className="input"
        value={filters.search || ''}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
      />

      <div>
        <label className="text-sm font-semibold mb-2 block">Experience (Years)</label>
        <input
          type="number"
          placeholder="Minimum years"
          className="input"
          value={filters.minExperience || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              minExperience: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
        />
      </div>

      <button
        onClick={() =>
          onFilterChange({
            search: '',
            minExperience: undefined,
          })
        }
        className="btn-secondary w-full"
      >
        Clear Filters
      </button>
    </div>
  );
};

export const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="btn-secondary disabled:opacity-50"
      >
        Previous
      </button>

      <div className="flex items-center space-x-1">
        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                page === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="btn-secondary disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
