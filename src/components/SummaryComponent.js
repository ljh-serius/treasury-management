import React, { useEffect, useState } from 'react';
import { fetchUnitsSummaryForStore, saveSummaryToFirestore, saveHistoricalSummaryToFirestore, fetchHistoricalSummaryFromFirestore } from '../utils/firebaseHelpers';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebaseConfig';
import TreasuryTable from './TreasuryTable'; // Import the TreasuryTable component

const SummaryComponent = () => {
  const [summary, setSummary] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const organizationId = userData.organizationId;
    const entityId = userData.entityId;
    const role = userData.role;

    setUserRole(role);

    const checkAndLoadBilanHistorique = async () => {
      try {
        const historicalSummary = await fetchHistoricalSummaryFromFirestore(organizationId, 'Bilan Historique');

        if (historicalSummary) {
          // If Bilan Historique exists, set it to the state
          setSummary({ "Bilan Historique": historicalSummary });
          console.log('Bilan Historique found and loaded from database.');
        } else {
          console.log('Bilan Historique not found, generating and saving it...');
          // If Bilan Historique does not exist, generate it
          if (role === 'admin' || role === 'headquarter') {
            const groupedData = await fetchSummaryForAllEntities(organizationId);
            setSummary(groupedData);
            await saveHistoricalSummaryToFirestore(organizationId, 'Bilan Historique', groupedData["Bilan Historique"]);
            console.log('Bilan Historique generated and saved.');
          } else if (role === 'store') {
            const storeSummary = await fetchUnitsSummaryForStore(organizationId, entityId);
            const groupedData = { [entityId]: storeSummary };
            setSummary(groupedData);
            await saveSummaryToFirestore(organizationId, entityId, 'Bilan Historique', groupedData[entityId]["Bilan Historique"]);
            console.log('Bilan Historique generated and saved for the store.');
          }
        }
      } catch (error) {
        console.error('Failed to load or generate Bilan Historique:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    checkAndLoadBilanHistorique();
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

  return (
    <div>
      {isLoaded ? (
        summary && <TreasuryTable transactions={summary["Bilan Historique"]} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SummaryComponent;
