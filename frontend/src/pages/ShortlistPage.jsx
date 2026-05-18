import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { aiService, candidateService } from '../services/api';
import { LoadingSpinner, EmptyState } from '../components/Common';
import { MatchScoreBar, SkillTag } from '../components/Cards';

export const ShortlistPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shortlisting, setShortlisting] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  useEffect(() => {
    if (jobId) {
      fetchCandidates();
    }
  }, [jobId]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await candidateService.getAll({ limit: 100 });
      setCandidates(response.candidates);
    } catch (error) {
      toast.error('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleShortlist = async () => {
    if (selectedCandidates.length === 0) {
      toast.error('Please select at least one candidate');
      return;
    }

    try {
      setShortlisting(true);
      await aiService.shortlistCandidates({
        jobId,
        candidateIds: selectedCandidates,
      });
      toast.success('Candidates shortlisted successfully!');
      navigate(`/jobs/${jobId}/results`);
    } catch (error) {
      toast.error('Failed to shortlist candidates');
    } finally {
      setShortlisting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shortlist Candidates</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Select candidates to match against this job
        </p>
      </div>

      {candidates.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No candidates available"
            description="Add candidates first before shortlisting."
          />
        </div>
      ) : (
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="card border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg"
              onClick={() => handleSelectCandidate(candidate._id)}
            >
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedCandidates.includes(candidate._id)}
                  onChange={() => {}}
                  className="w-5 h-5 mt-1"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{candidate.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {candidate.email}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Experience</p>
                      <p className="font-semibold">{candidate.experience} years</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Score</p>
                      <p className="font-semibold">
                        {candidate.performanceScore}/100
                      </p>
                    </div>
                  </div>
                  {candidate.skills?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-300">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill) => (
                          <SkillTag key={skill} skill={skill} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 rounded-lg flex justify-between items-center">
            <p className="font-semibold">
              {selectedCandidates.length} candidate(s) selected
            </p>
            <button
              onClick={handleShortlist}
              disabled={shortlisting || selectedCandidates.length === 0}
              className="btn-primary disabled:opacity-50 flex items-center space-x-2"
            >
              {shortlisting ? <LoadingSpinner size="sm" /> : 'Shortlist Selected'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
