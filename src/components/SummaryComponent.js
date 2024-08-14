import React, { useEffect, useState } from 'react';
import { fetchUnitsSummaryForStore, saveSummaryToFirestore } from '../utils/firebaseHelpers';

const SummaryComponent = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
    const entityId = JSON.parse(localStorage.getItem('userData')).entityId;

    if (organizationId && entityId) {
      fetchUnitsSummaryForStore(organizationId, entityId)
        .then(setSummary)
        .catch(error => console.error("Failed to fetch summary:", error));
    }
  }, []); // Ensure useEffect runs when userId is defined

  const handleSaveSummary = () => {
    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
    
    if (organizationId && summary) {
      Object.keys(summary).forEach((year) => {
        saveSummaryToFirestore(organizationId, year, summary[year])
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
