import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './components/Dashboard';
import TransactionBooks from './components/TransactionBooks';
import Analytics from './components/Analytics';
import TransactionDetails from './components/TransactionDetails';
import HomePage from './components/HomePage';
import Blog from './components/Blog';
import Article from './components/Article';
import UnitDetails from './components/UnitDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './utils/firebaseConfig';
import UnitGenerator from './components/UnitGenerator';
import SummaryComponent from './components/SummaryComponent';
import OrganizationRegistration from './components/OrganizationRegistration';
import ManageUsers from './pages/ManageUsers';
import { TranslationProvider } from './utils/TranslationProvider';
import { getOrganizationIdForUser } from './utils/firebaseHelpers'; // Import the helper function

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState(null); // State to store organizationId
  const [language, setLanguage] = useState('en'); // Default language

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false); // Stop loading once auth state is determined
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <TranslationProvider>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/books" replace /> : <HomePage />}
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <TransactionBooks />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <SummaryComponent />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <Analytics />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/units"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <UnitGenerator />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <ManageUsers />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <Blog language={language} switchLanguage={switchLanguage} />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/:slug"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <Article language={language} switchLanguage={switchLanguage} />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route path="/registration" element={<OrganizationRegistration />} />
      </Routes>
    </TranslationProvider>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
