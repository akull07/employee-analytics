import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { Sidebar, Navbar } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { AddCandidatePage } from './pages/AddCandidatePage';
import { JobsPage } from './pages/JobsPage';
import { CreateJobPage } from './pages/CreateJobPage';
import { ShortlistPage } from './pages/ShortlistPage';

// Styles
import './index.css';

function App() {
  const { token } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthenticated = !!token;

  const LayoutWrapper = ({ children }) => {
    if (!isAuthenticated) {
      return children;
    }

    return (
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />

        <Route
          path="/candidates"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <CandidatesPage />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />

        <Route
          path="/candidates/new"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <AddCandidatePage />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />

        <Route
          path="/jobs"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />

        <Route
          path="/jobs/new"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <CreateJobPage />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />

        <Route
          path="/jobs/:jobId/shortlist"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <ShortlistPage />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
