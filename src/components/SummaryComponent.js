import React, { useEffect, useState } from 'react';
import { fetchUnitsSummary, saveSummaryToFirestore } from '../utils/firebaseHelpers';
import { auth } from '../utils/firebaseConfig';

const SummaryComponent = () => {
  const [summary, setSummary] = useState(null);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      fetchUnitsSummary(userId)
        .then(setSummary)
        .catch(error => console.error("Failed to fetch summary:", error));
    }
  }, [userId]); // Ensure useEffect runs when userId is defined

  const handleSaveSummary = () => {
    if (userId && summary) {
      Object.keys(summary).forEach((year) => {
        saveSummaryToFirestore(userId, year, summary[year])
          .then(() => console.log(`Summary for ${year} saved successfully.`))
          .catch(error => console.error(`Failed to save summary for ${year}:`, error));
      });
    } else {
      console.error("User ID or summary is missing.");
    }
  };

  return (
    <div>
      <button onClick={handleSaveSummary}>Save</button>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
    </div>
  );
};

export default SummaryComponent;
