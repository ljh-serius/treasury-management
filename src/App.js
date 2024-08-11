import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionBooks from './components/TransactionBooks';
import Analytics from './components/Analytics';

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/transaction-books"
        element={
          <Dashboard>
            <TransactionBooks />
          </Dashboard>
        }
      />
      <Route
        path="/analytics"
        element={
          <Dashboard>
            <Analytics />
          </Dashboard>
        }
      />
      <Route
        path="/"
        element={
          <Dashboard>
            <div>Welcome to the Dashboard</div>
          </Dashboard>
        }
      />
    </Routes>
  </Router>
);

export default App;
