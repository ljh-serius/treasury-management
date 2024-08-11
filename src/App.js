import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionBooks from './components/TransactionBooks';
import Analytics from './components/Analytics';
import TransactionDetails from './components/TransactionDetails';
import HomePage from './components/HomePage';

const App = () => (
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
          <Dashboard>
            <TransactionBooks />
          </Dashboard>
        }
      />
      <Route
        path="/comparatives"
        element={
          <Dashboard>
            <Analytics />
          </Dashboard>
        }
      />
      <Route
        path="/details"
        element={
          <Dashboard>
            <TransactionDetails />
          </Dashboard>
        }
      />
    </Routes>
  </Router>
);

export default App;
