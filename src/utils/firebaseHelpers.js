import { collection, collectionGroup, getDocs, addDoc, getDoc, setDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

// Function to create an organization in Firebase
export const createOrganization = async (orgName, customDomain, email, numUsers, numStores, price) => {
  const tenantId = uuidv4();
  const orgDocRef = doc(collection(db, "organizations"));

  const organizationData = {
    name: orgName,
    domain: customDomain,
    email: email,
    numUsers: numUsers,
    numStores: numStores,
    price: price,
    tenant_id: tenantId,
  };

  await setDoc(orgDocRef, organizationData);
  return { tenantId, organizationId: orgDocRef.id };
};


export const getAllStoreTransactionSummaries = async (organizationId) => {
  try {
    const summaries = {};

    // Fetch all entities within the organization
    const entitiesSnapshot = await getDocs(collection(db, 'organizations', organizationId, 'entities'));
    for (const entityDoc of entitiesSnapshot.docs) {
      const entityId = entityDoc.id;

      // Fetch transaction summaries for each entity
      const summariesCollection = collection(db, 'organizations', organizationId, 'entities', entityId, 'transactions-summary');
      const summariesSnapshot = await getDocs(summariesCollection);

      const entitySummaries = {};
      summariesSnapshot.forEach((doc) => {
        entitySummaries[doc.id] = doc.data();
      });

      summaries[entityId] = entitySummaries;
    }

    return summaries;
  } catch (error) {
    console.error('Error fetching all store transaction summaries: ', error);
    throw error;
  }
};

export const getStoreTransactionSummaries = async (organizationId, entityId) => {
  try {
    const summariesCollection = collection(db, 'organizations', organizationId, 'entities', entityId, 'transactions-summary');
    const summariesSnapshot = await getDocs(summariesCollection);

    const summaries = {};
    summariesSnapshot.forEach((doc) => {
      summaries[doc.id] = doc.data();
    });

    return summaries;
  } catch (error) {
    console.error('Error fetching store transaction summaries: ', error);
    throw error;
  }
};
// Function to fetch users of an organization
export const fetchUsersOfOrganization = async (organizationId) => {
  const usersCollection = collection(db, "organizations", organizationId, "users");
  const usersSnapshot = await getDocs(usersCollection);
  
  const users = [];
  usersSnapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
  return users;
};

// Function to add a user to the root `users` collection in Firestore
export const addUser = async (userId, firstName, lastName, email, role = 'admin', organizationId, entityId) => {
  const userRef = doc(db, 'users', userId);
  
  const userData = {
    firstName,
    lastName,
    email,
    role,
    organizationId,
    createdAt: new Date(),
    entityId: entityId
  };

  await setDoc(userRef, userData);
};


// Function to add an entity to an organization
export const addEntityToOrganization = async (organizationId, entityData) => {
  const entityRef = doc(collection(db, "organizations", organizationId, "entities"));
  await setDoc(entityRef, entityData);
  return entityRef.id;
};

// Function to save transaction details within an entity of an organization
export const saveTransactionDetails = async (organizationId, entityId, transactionId, details) => {
  try {
    const detailsRef = doc(db, "organizations", organizationId, "entities", entityId, "transaction-details", transactionId);
    await setDoc(detailsRef, details, { merge: true });
  } catch (error) {
    console.error("Error saving transaction details: ", error);
  }
};

// Function to get transaction details within an entity of an organization
export const getTransactionDetails = async (organizationId, entityId, transactionId) => {
  try {
    const docRef = doc(db, "organizations", organizationId, "entities", entityId, "transaction-details", transactionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting transaction details: ", error);
  }
};

export const fetchAllUnits = async (organizationId, filters) => {
  if (!organizationId) return [];

  const allUnits = [];
  const {
    selectedCategories = [],
    selectedTypes = [],
    selectedMonths = [],
    selectedYears = null,
    months = [],
    selectedEntity = '',  // Ajout de l'entity sélectionnée dans les filtres
  } = filters;

  try {
    const years = selectedYears ? selectedYears : [new Date().getFullYear()];
    
    // Filtrer les valeurs null des mois sélectionnés
    const monthsToFetch = selectedMonths.filter(month => month !== null).length > 0 
      ? selectedMonths.filter(month => month !== null) 
      : months;
    // Définir l'ensemble des entités à récupérer, soit toutes soit l'entité spécifique sélectionnée
    const entityIds = selectedEntity 
      ? [selectedEntity] 
      : (await getDocs(collection(db, "organizations", organizationId, "entities"))).docs.map(doc => doc.id);

      for (let entityId of entityIds) {
        for (let year of years) {
          for (let month of monthsToFetch) {
          const unitsRef = collection(db, "organizations", organizationId, "entities", entityId, "transaction-units", year.toString(), month);
          let unitsQuery = unitsRef;

          // Appliquer les filtres de catégories si spécifiés
          if (selectedCategories.length > 0) {
            unitsQuery = query(unitsQuery, where('category', 'in', selectedCategories));
          }

          // Appliquer les filtres de types si spécifiés
          if (selectedTypes.length > 0) {
            unitsQuery = query(unitsQuery, where('type', 'in', selectedTypes));
          }

          const unitsSnapshot = await getDocs(unitsQuery);
          console.log(`Fetched ${unitsSnapshot.size} units for entity ${entityId} in ${month} ${year}`);

          const units = unitsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: new Date(doc.data().date.seconds * 1000),
          }));

          allUnits.push(...units);
        }
      }
    }

    console.log(`Total units fetched: ${allUnits.length}`);
  } catch (error) {
    console.error("Error fetching units: ", error);
  }

  return allUnits;
};


// Function to save a unit to Firestore within an entity of an organization
export const saveUnitToFirestore = async (organizationId, entityId, unit, year, month) => {
  try {
    // Convert year to string and ensure month is a string
    const yearStr = year.toString();
    const monthStr = month.toString();

    // Reference to the correct Firestore collection
    const unitsCollectionRef = collection(db, "organizations", organizationId, "entities", entityId, "transaction-units", yearStr, monthStr);

    await addDoc(unitsCollectionRef, {
      ...unit,
      entityId,
      createdBy: organizationId,
      createdAt: new Date(),
    });

    console.log('Unit saved successfully.');
  } catch (error) {
    console.error("Error saving unit: ", error);
    throw error;
  }
};


// Define the months array
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getAllTransactionSummaries = async (organizationId, entityId) => {
  try {
    const summariesCollection = collection(db, 'organizations', organizationId, 'entities', entityId, 'transactions-summary');
    const summariesSnapshot = await getDocs(summariesCollection);

    const summaries = {};
    summariesSnapshot.forEach((doc) => {
      summaries[doc.id] = doc.data();
    });

    return summaries;
  } catch (error) {
    console.error('Error fetching transaction summaries: ', error);
    throw error;
  }
};


export const fetchUnitsSummaryForStore = async (organizationId, entityId) => {
  if (!organizationId || !entityId) return;

  const summary = {};
  const currentYear = new Date().getFullYear();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  try {
    for (let year = currentYear; year >= currentYear - 15; year--) {
      summary[year] = {
        encaissements: [],
        decaissements: [],
      };

      for (let month of months) {
        const monthIndex = months.indexOf(month);
        const unitsRef = collection(db, "organizations", organizationId, "entities", entityId, "transaction-units", year.toString(), month);

        const unitsSnapshot = await getDocs(unitsRef);

        if (unitsSnapshot.empty) {
          console.log(`No units found for ${year} ${month}`);
          continue;
        }

        const units = unitsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        units.forEach(unit => {
          const { type, category, quantity, unitPrice } = unit;
          const totalAmount = parseFloat(unitPrice) * parseInt(quantity, 10);

          const summaryType = type === 'revenues' ? 'encaissements' : 'decaissements';

          let natureEntry = summary[year][summaryType].find(entry => entry.nature === category);

          if (!natureEntry) {
            natureEntry = {
              nature: category,
              montantInitial: 0,
              montants: Array(12).fill(0),
            };
            summary[year][summaryType].push(natureEntry);
          }

          natureEntry.montants[monthIndex] += totalAmount;
        });
      }

      const calculateTotal = (entries) => {

        const totalEntry = {
          nature: `Total ${entries.length > 0 ? entries[0].nature.split(" ")[0] : ""}`,
          montantInitial: 0,
          montants: Array(12).fill(0),
        };

        entries.forEach(entry => {
          entry.montantInitial = 0;
          entry.montants.forEach((montant, index) => {
            totalEntry.montants[index] += parseFloat(montant);
          });
          totalEntry.montantInitial = 0;
        });

        return totalEntry;
      };

      summary[year].encaissements.push(calculateTotal(summary[year].encaissements));
      summary[year].decaissements.push(calculateTotal(summary[year].decaissements));
    }

    console.log('Final Summary:', summary);

    return summary;

  } catch (error) {
    console.error("Error fetching units summary: ", error);
    throw error;
  }
};


/**
 * Fetch the historical summary for the given organization from Firestore.
 *
 * @param {string} organizationId - The ID of the organization.
 * @param {string} summaryType - The type of summary to fetch (e.g., 'Bilan Historique').
 * @returns {Promise<Object|null>} - A promise that resolves to the historical summary if it exists, or null if it doesn't.
 */
export const fetchHistoricalSummaryFromFirestore = async (organizationId, summaryType) => {
  try {

    
    const docRef = doc(db, "organizations", organizationId, "transactions-historical-summary", "Bilan Historique");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`No ${summaryType} found for organization ${organizationId}.`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching ${summaryType} for organization ${organizationId}:`, error);
    throw error; // rethrow the error after logging it
  }
};

export const saveSummaryToFirestore = async (organizationId, entityId, year, summary) => {
  try {
    if (!summary) {
      throw new Error("Summary data is undefined or null");
    }

    if (!organizationId || !entityId || !year) {
      throw new Error("Invalid organizationId, entityId, or year");
    }

    summary.name = year.toString();

    const docRef = doc(db, "organizations", organizationId, "entities", entityId, "transactions-summary", year.toString());
    await setDoc(docRef, summary);

    console.log(`Summary for ${year} saved successfully.`);
  } catch (error) {
    console.error(`Error saving summary for ${year} to Firestore:`, error);
    throw error;
  }
};


export const saveHistoricalSummaryToFirestore = async (organizationId, name, summary) => {
  try {
    if (!summary) {
      throw new Error("Summary data is undefined or null");
    }

    if (!organizationId) {
      throw new Error("Invalid organizationId, entityId, or year");
    }

    summary.name = name;

    const docRef = doc(db, "organizations", organizationId, "transactions-historical-summary", name);
    await setDoc(docRef, summary);

    console.log(`Summary for 'Bilan Historique' saved successfully.`);
  } catch (error) {
    console.error(`Error saving summary for 'Bilan Historique' to Firestore:`, error);
    throw error;
  }
};


export const fetchEntities = async (organizationId) => {
  try {
    const entitiesRef = collection(db, "organizations", organizationId, "entities");
    const entitiesSnapshot = await getDocs(entitiesRef);

    const entities = entitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return entities;
  } catch (error) {
    console.error("Error fetching entities: ", error);
    throw error;
  }
};

export const fetchEntityById = async (organizationId, entityId) => {
  try {
    const entityRef = doc(db, "organizations", organizationId, "entities", entityId);
    const entityDoc = await getDoc(entityRef);

    if (entityDoc.exists()) {
      return { id: entityId, ...entityDoc.data() };
    } else {
      throw new Error("Entity not found");
    }
  } catch (error) {
    console.error("Error fetching entity: ", error);
    throw error;
  }
};

export const updateEntity = async (organizationId, entityId, updatedData) => {
  try {
    const entityRef = doc(db, "organizations", organizationId, "entities", entityId);
    await updateDoc(entityRef, updatedData);

    return { success: true };
  } catch (error) {
    console.error("Error updating entity: ", error);
    return { success: false, error };
  }
};

export const deleteEntity = async (organizationId, entityId) => {
  try {
    const entityRef = doc(db, "organizations", organizationId, "entities", entityId);
    await deleteDoc(entityRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting entity: ", error);
    return { success: false, error };
  }
};
