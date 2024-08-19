import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './layout/Dashboard';
import HomePage from './pages/HomePage';
import Blog from './pages/Blog';
import Article from './pages/Article';
import ProtectedRoute from './components/Partials/ProtectedRoute';
import { auth } from './utils/firebaseConfig';
import OrganizationRegistration from './components/Authentication/OrganizationRegistration';
import { TranslationProvider } from './contexts/TranslationProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import GanttChart from './pages/GanttChart';
import Treasury from './pages/Treasury';
import Management from './pages/Management'
import Visualizer from './pages/UnitVisualizer'

const stripePromise = loadStripe(String(process.env.REACT_APP_STRIPE_PUBLIC_KEY));

if (!process.env.REACT_APP_STRIPE_PUBLIC_KEY) {
  console.error("Stripe public key is missing. Make sure to set REACT_APP_STRIPE_PUBLIC_KEY in your .env file.");
}

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    <Elements stripe={stripePromise}>
      <TranslationProvider>

        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Treasury />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/management/:entity"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Management />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          { /* Blog and documentation */}
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
          { /* Authentication */}
          <Route
            path="/registration"
            element={
              <OrganizationRegistration />
            }
          />
 

          <Route
            path="/gantt-chart"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <GanttChart />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:entity/:id"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Visualizer />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          { /* Configuration */}
        </Routes>
      </TranslationProvider>
    </Elements>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
