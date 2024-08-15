import React, { useEffect, useState } from 'react';
import { fetchUnitsSummaryForStore, saveSummaryToFirestore, saveHistoricalSummaryToFirestore } from '../utils/firebaseHelpers';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebaseConfig';
import TreasuryTable from './TreasuryTable'; // Import the TreasuryTable component

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
      fetchSummaryForAllEntities(organizationId)
        .then(groupedData => {
          setSummary(groupedData);
        })
        .catch(error => console.error("Failed to fetch summary for all entities:", error));
    } else if (role === 'store') {
      fetchUnitsSummaryForStore(organizationId, entityId)
        .then(data => {
          const groupedData = { [entityId]: data };
          setSummary(groupedData);
        })
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

    return groupDataByStore(summary);
  };

  const groupDataByStore = (summary) => {
    const groupedSummary = {
      "Bilan Historique": {
        encaissements: [],
        decaissements: []
      }
    };

  
    const accumulateData = (targetArray, sourceArray) => {
        sourceArray.forEach(source => {
            const existingCategory = targetArray.find(item => item.nature === source.nature);

            if (existingCategory) {
            // Add the montants of the current source to the existing category's montants
            existingCategory.montants = existingCategory.montants.map(
                (monthTotal, index) => monthTotal + (source.montants[index] || 0)
            );
            } else {
            // If this category doesn't exist, add it with its montants
            targetArray.push({
                nature: source.nature,
                montantInitial: source.montantInitial,
                montants: [...source.montants] // Copy montants array
            });
            }
        });
    };
  
    Object.values(summary).forEach(storeData => {
      Object.entries(storeData).forEach(([year, data]) => {
        // Accumulate data across all years for encaissements and decaissements
        accumulateData(groupedSummary["Bilan Historique"].encaissements, data.encaissements);
        accumulateData(groupedSummary["Bilan Historique"].decaissements, data.decaissements);
      });
    });
  
    return groupedSummary;
  };
  
  const handleSaveSummary = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const organizationId = userData.organizationId;
  
    if (!summary || !organizationId) {
      console.error("Organization ID or summary is missing.");
      return;
    }
  
    if (userRole === 'admin' || userRole === 'headquarter') {
      // Log the summary before saving
      console.log("Saving summary for organization:", JSON.stringify(summary, null, 2));
      
      saveHistoricalSummaryToFirestore(organizationId, 'Bilan Historique', summary["Bilan Historique"])
        .then(() => console.log(`Summary for organization in 'Bilan Historique' saved successfully.`))
        .catch(error => console.error(`Failed to save summary for 'ALL' in 'Bilan Historique':`, error));
    } else if (userRole === 'store') {
      const entityId = userData.entityId;
  
      if (!summary[entityId]) {
        console.error(`Summary for entity ID ${entityId} is missing.`);
        return;
      }
  
      // Log the entity-specific summary before saving
      console.log(`Saving summary for entity ${entityId}:`, JSON.stringify(summary[entityId], null, 2));
  
      saveSummaryToFirestore(organizationId, entityId, 'Bilan Historique', summary[entityId]["Bilan Historique"])
        .then(() => console.log(`Summary for ${entityId} saved successfully.`))
        .catch(error => console.error(`Failed to save summary for ${entityId}:`, error));
    }
  };
  

  return (
    <div>
      <button onClick={handleSaveSummary}>Save</button>
      {summary && <TreasuryTable transactions={summary["Bilan Historique"]} />}
    </div>
  );
};

export default SummaryComponent;
