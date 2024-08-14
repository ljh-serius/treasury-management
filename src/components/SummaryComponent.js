import React, { useEffect, useState } from 'react';
import { fetchUnitsSummaryForStore, saveSummaryToFirestore } from '../utils/firebaseHelpers';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebaseConfig';

const SummaryComponent = () => {
  const [summary, setSummary] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const organizationId = userData.organizationId;
    const entityId = userData.entityId;
    const role = userData.role;

    setUserRole(role);

    if (role === 'admin' || role === 'headquarter') {
      // Fetch summary for all entities within the organization
      fetchSummaryForAllEntities(organizationId)
        .then(setSummary)
        .catch(error => console.error("Failed to fetch summary for all entities:", error));
    } else if (role === 'store') {
      // Fetch summary for a specific entity
      fetchUnitsSummaryForStore(organizationId, entityId)
        .then(setSummary)
        .catch(error => console.error("Failed to fetch summary:", error));
    }
  }, []);

  const fetchSummaryForAllEntities = async (organizationId) => {
    const entitiesSnapshot = await getDocs(collection(db, 'organizations', organizationId, 'entities'));
    const summary = {};

    for (const entityDoc of entitiesSnapshot.docs) {
      const entityId = entityDoc.id;
      const entitySummary = await fetchUnitsSummaryForStore(organizationId, entityId);
      summary[entityId] = entitySummary;
    }

    return summary;
  };
  const handleSaveSummary = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const organizationId = userData.organizationId;
  
    if (organizationId && summary) {
      if (userRole === 'admin' || userRole === 'headquarter') {
        Object.keys(summary).forEach((entityId) => {
          const entitySummary = summary[entityId];
          if (entitySummary) {
            Object.keys(entitySummary).forEach((year) => {
              saveSummaryToFirestore(organizationId, entityId, year, entitySummary[year])
                .then(() => console.log(`Summary for ${entityId} in ${year} saved successfully.`))
                .catch(error => console.error(`Failed to save summary for ${entityId} in ${year}:`, error));
            });
          }
        });
      } else if (userRole === 'store') {
        const entityId = userData.entityId;
        Object.keys(summary).forEach((year) => {
          saveSummaryToFirestore(organizationId, entityId, year, summary[year])
            .then(() => console.log(`Summary for ${year} saved successfully.`))
            .catch(error => console.error(`Failed to save summary for ${year}:`, error));
        });
      }
    } else {
      console.error("Organization ID or summary is missing.");
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
