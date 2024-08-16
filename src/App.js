import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import HomePage from './components/HomePage';
import Blog from './components/Blog';
import Article from './components/Article';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './utils/firebaseConfig';
import UnitGenerator from './components/UnitGenerator';
import SummaryComponent from './components/SummaryComponent';
import OrganizationRegistration from './components/OrganizationRegistration';
import ManageParameters from './pages/ManageParameters';
import { TranslationProvider } from './utils/TranslationProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import GanttChart from './components/GanttChart';
import Projects from './components/Projects';
import Providers from './components/Providers';
import CostAllocation from './components/CostAllocation';
import ProductPrototypes from './components/ProductPrototypes';
import Partners from './components/Partners';
import SearchPartners from './components/SearchPartners';
import RiskManagement from './components/RiskManagement';
import Employees from './components/Employees';
import TreasuryTable from './components/TreasuryTable';

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
            path="/books"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <TreasuryTable />
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
              path="/manage-parameters"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard>
                    <ManageParameters />
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
            path="/cost-allocation"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                    <CostAllocation />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-prototypes"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <ProductPrototypes />
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
            path="/search-partners"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                  <SearchPartners />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/risk-management"
            element={
              <ProtectedRoute user={user}>
                <Dashboard>
                <RiskManagement />
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
