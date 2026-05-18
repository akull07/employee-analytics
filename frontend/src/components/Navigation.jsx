import React from 'react';
import { FiHome, FiUsers, FiBriefcase, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: FiHome, path: '/' },
    { label: 'Candidates', icon: FiUsers, path: '/candidates' },
    { label: 'Jobs', icon: FiBriefcase, path: '/jobs' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">ShortList AI</h1>
        <p className="text-gray-400 text-sm">Recruitment Platform</p>
      </div>

      <nav className="mt-6 space-y-2 px-4">
        {menuItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={path}
            to={path}
            onClick={() => onClose()}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <p className="text-sm font-semibold">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white"
      >
        <FiX size={24} />
      </button>
    </div>
  );
};

export const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <FiMenu size={24} />
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Recruitment Portal
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
