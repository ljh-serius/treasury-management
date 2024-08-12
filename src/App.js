import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard>
              <HomePage />
            </Dashboard>
          }
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
          path="/comparatives"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <Analytics />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:transactionId"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <TransactionDetails />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/units/:unitId"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <UnitDetails />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <Blog />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/:slug"
          element={
            <ProtectedRoute user={user}>
              <Dashboard>
                <Article />
              </Dashboard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
