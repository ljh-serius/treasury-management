import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './layout/Dashboard';
import Analytics from './pages/Analytics';
import HomePage from './pages/HomePage';
import Blog from './pages/Blog';
import Article from './pages/Article';
import ProtectedRoute from './components/Partials/ProtectedRoute';
import { auth } from './utils/firebaseConfig';
import OrganizationRegistration from './components/Authentication/OrganizationRegistration';
import Parameters from './pages/Parameters';
import { TranslationProvider } from './utils/TranslationProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import GanttChart from './pages/GanttChart';
import Projects from './pages/Projects';
import Providers from './pages/Providers';
import Products from './pages/Products';
import Costs from './pages/Costs';
import Partners from './pages/Partners';
import Risks from './pages/Risks';
import Employees from './pages/Employees';
import Treasury from './pages/Treasury';
import Invoices from './pages/Invoices'
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
            path="/invoices"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Invoices />
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
          <Route
            path="/registration"
            element={
              <OrganizationRegistration />
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Projects />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Employees />
                </Dashboard>
              </ProtectedRoute>
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
            path="/products"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Products />
                </Dashboard>
              </ProtectedRoute>
            }
          />  
          <Route
            path="/providers"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Providers />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/partners"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Partners />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/costs/:id"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                    <Costs />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/costs"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                    <Costs />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/risks"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Risks />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parameters"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <Parameters />
                </Dashboard>
              </ProtectedRoute>
            }
          />
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
