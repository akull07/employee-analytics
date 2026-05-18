import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCandidateStore } from '../store/candidateStore';
import { LoadingSpinner } from '../components/Common';

export const AddCandidatePage = () => {
  const navigate = useNavigate();
  const { createCandidate, loading } = useCandidateStore();
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [],
    experience: 0,
    education: [],
    bio: '',
    github: '',
    linkedin: '',
    performanceScore: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCandidate(formData);
      toast.success('Candidate added successfully!');
      navigate('/candidates');
    } catch (error) {
      toast.error(error.message || 'Failed to add candidate');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Candidate</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Enter candidate details and skills
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name *</label>
              <input
                type="text"
                name="name"
                className="input"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                className="input"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                className="input"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                className="input"
                min="0"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold mb-2">Skills</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="input"
                placeholder="Enter skill name"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn-secondary px-6"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Performance & Bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Performance Score
              </label>
              <input
                type="number"
                name="performanceScore"
                className="input"
                min="0"
                max="100"
                value={formData.performanceScore}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Bio</label>
            <textarea
              name="bio"
              className="input resize-vertical min-h-24"
              placeholder="Brief about the candidate..."
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">GitHub</label>
              <input
                type="url"
                name="github"
                className="input"
                placeholder="https://github.com/..."
                value={formData.github}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                className="input"
                placeholder="https://linkedin.com/in/..."
                value={formData.linkedin}
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
              {loading ? <LoadingSpinner size="sm" /> : 'Add Candidate'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/candidates')}
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
