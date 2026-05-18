import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useJobStore } from '../store/jobStore';
import { LoadingSpinner } from '../components/Common';

export const CreateJobPage = () => {
  const navigate = useNavigate();
  const { createJob, loading } = useJobStore();
  const [skillInput, setSkillInput] = useState('');
  const [prefSkillInput, setPrefSkillInput] = useState('');
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    requiredSkills: [],
    preferredSkills: [],
    minExperience: 0,
    maxExperience: null,
    minSalary: null,
    maxSalary: null,
    department: '',
    location: '',
    jobType: 'Full-time',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['minExperience', 'maxExperience', 'minSalary', 'maxSalary'].includes(name)
        ? value ? parseInt(value) : null
        : value,
    });
  };

  const handleAddSkill = (type) => {
    const input = type === 'required' ? skillInput : prefSkillInput;
    const skillsField = type === 'required' ? 'requiredSkills' : 'preferredSkills';

    if (input.trim() && !formData[skillsField].includes(input.trim())) {
      setFormData({
        ...formData,
        [skillsField]: [...formData[skillsField], input.trim()],
      });
      if (type === 'required') {
        setSkillInput('');
      } else {
        setPrefSkillInput('');
      }
    }
  };

  const handleRemoveSkill = (skill, type) => {
    const skillsField = type === 'required' ? 'requiredSkills' : 'preferredSkills';
    setFormData({
      ...formData,
      [skillsField]: formData[skillsField].filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.requiredSkills.length === 0) {
      toast.error('Please add at least one required skill');
      return;
    }

    try {
      await createJob(formData);
      toast.success('Job created successfully!');
      navigate('/jobs');
    } catch (error) {
      toast.error(error.message || 'Failed to create job');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Job Requirement</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Define the job and required skills for candidate matching
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Job Title *</label>
              <input
                type="text"
                name="jobTitle"
                className="input"
                required
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Department</label>
              <input
                type="text"
                name="department"
                className="input"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                className="input"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Job Type</label>
              <select
                name="jobType"
                className="input"
                value={formData.jobType}
                onChange={handleInputChange}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Temporary</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              className="input resize-vertical min-h-24"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-semibold mb-2">Required Skills *</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="input"
                placeholder="Enter required skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill('required'))}
              />
              <button
                type="button"
                onClick={() => handleAddSkill('required')}
                className="btn-secondary px-6"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.requiredSkills.map((skill) => (
                <div
                  key={skill}
                  className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill, 'required')}
                    className="hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Skills */}
          <div>
            <label className="block text-sm font-semibold mb-2">Preferred Skills</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="input"
                placeholder="Enter preferred skill"
                value={prefSkillInput}
                onChange={(e) => setPrefSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill('preferred'))}
              />
              <button
                type="button"
                onClick={() => handleAddSkill('preferred')}
                className="btn-secondary px-6"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.preferredSkills.map((skill) => (
                <div
                  key={skill}
                  className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill, 'preferred')}
                    className="hover:text-yellow-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Min Experience (Years) *</label>
              <input
                type="number"
                name="minExperience"
                className="input"
                required
                min="0"
                value={formData.minExperience}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Max Experience (Years)</label>
              <input
                type="number"
                name="maxExperience"
                className="input"
                min="0"
                value={formData.maxExperience || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Salary (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Min Salary</label>
              <input
                type="number"
                name="minSalary"
                className="input"
                min="0"
                value={formData.minSalary || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Max Salary</label>
              <input
                type="number"
                name="maxSalary"
                className="input"
                min="0"
                value={formData.maxSalary || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Create Job'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
