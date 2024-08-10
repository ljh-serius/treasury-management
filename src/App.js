import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Your existing dashboard component
import AnalyticsPage from './components/AnalyticsPage'; // The new analytics page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/transaction-books" element={<Dashboard />} />
        <Route path="/analytical-comparison" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
