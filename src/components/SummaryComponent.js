import React, { useEffect, useState } from 'react';
import {
  fetchUnitsSummaryForStore,
  fetchHistoricalSummaryFromFirestore, 
  saveSummaryToFirestore,
  saveEntityGroupedSummaryToFirestore,
  saveHistoricalSummaryToFirestore
} from '../utils/firebaseHelpers';
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../utils/firebaseConfig';
import TreasuryTable from './TreasuryTable'; // Import the TreasuryTable component
import { Container } from '@mui/material';

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
      
      // Step 1: Generate and save yearly summary for each entity
      const entitySummary = await fetchUnitsSummaryForStore(organizationId, entityId);
      await Promise.all(Object.keys(entitySummary).map(year => 
        saveSummaryToFirestore(organizationId, entityId, year, entitySummary[year])
      ));
      
      // Step 2: Generate and save grouped data summary for each entity
      const groupedEntityYearsSummary = groupDataByYear(entitySummary);
      await saveEntityGroupedSummaryToFirestore(organizationId, entityId, groupedEntityYearsSummary);
      
      summary[entityId] = groupedEntityYearsSummary;
    }

    // Step 3: Generate and save the main summary for all entities
    return groupDataByEntities(summary);
  };

  // Helper function to group data by year
  const groupDataByYear = (entitySummary) => {
    const groupedSummary = {
      encaissements: [],
      decaissements: []
    };

    const accumulateData = (targetArray, sourceArray) => {
      sourceArray.forEach(source => {
        const existingCategory = targetArray.find(item => item.nature === source.nature);

        if (existingCategory) {
          existingCategory.montants = existingCategory.montants.map(
            (monthTotal, index) => monthTotal + (source.montants[index] || 0)
          );
        } else {
          targetArray.push({
            nature: source.nature,
            montantInitial: source.montantInitial,
            montants: [...source.montants]
          });
        }
      });
    };

    Object.entries(entitySummary).forEach(([year, data]) => {
      accumulateData(groupedSummary.encaissements, data.encaissements);
      accumulateData(groupedSummary.decaissements, data.decaissements);
    });

    return groupedSummary;
  };

  // Helper function to group data by entities for the organization
  const groupDataByEntities = (summary) => {
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
          existingCategory.montants = existingCategory.montants.map(
            (monthTotal, index) => monthTotal + (source.montants[index] || 0)
          );
        } else {
          targetArray.push({
            nature: source.nature,
            montantInitial: source.montantInitial,
            montants: [...source.montants]
          });
        }
      });
    };

    Object.values(summary).forEach(entitySummary => {
      accumulateData(groupedSummary["Bilan Historique"].encaissements, entitySummary.encaissements);
      accumulateData(groupedSummary["Bilan Historique"].decaissements, entitySummary.decaissements);
    });

    return groupedSummary;
  };

  return (
    <Container maxWidth="lg"  sx={{ paddingTop: 3, paddingBottom: 7, width: "60vw"}}>
      {isLoaded ? (
        summary && <TreasuryTable transactions={summary["Bilan Historique"]} />
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default SummaryComponent;
