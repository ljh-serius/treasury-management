import { collection, getDocs, addDoc, getDoc, setDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
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
    const summariesCollection = collection(db, 'organizations', organizationId, 'transactions-summary');
    const summariesSnapshot = await getDocs(summariesCollection);

    const summaries = {};
    summariesSnapshot.forEach((doc) => {
      summaries[doc.id] = doc.data();
    });

    return summaries;
  } catch (error) {
    console.error('Error fetching all store transaction summaries: ', error);
    throw error;
  }
};

export const getStoreTransactionSummaries = async (organizationId, storeId) => {
  try {
    const storeSummariesCollection = collection(db, 'organizations', organizationId, 'entities', storeId, 'transactions-summary');
    const summariesSnapshot = await getDocs(storeSummariesCollection);

    const summaries = {};
    summariesSnapshot.forEach((doc) => {
      summaries[doc.id] = doc.data();
    });

    return summaries;
  } catch (error) {
    console.error('Error fetching transaction summaries for store: ', error);
    throw error;
  }
};

// Function to fetch organization data along with users and entities
export const fetchOrganizationData = async (organizationId) => {
  const orgRef = doc(db, "organizations", organizationId);
  const orgSnapshot = await getDoc(orgRef);

  if (orgSnapshot.exists()) {
    const orgData = orgSnapshot.data();
    
    // Fetch users
    const usersSnapshot = await getDocs(collection(orgRef, "users"));
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch entities
    const entitiesSnapshot = await getDocs(collection(orgRef, "entities"));
    const entities = entitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { ...orgData, users, entities };
  } else {
    throw new Error("Organization not found");
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
export const addUser = async (userId, firstName, lastName, email, role = 'admin', organizationId) => {
  const userRef = doc(db, 'users', userId);
  
  const userData = {
    firstName,
    lastName,
    email,
    role,
    organizationId,
    createdAt: new Date(),
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

// Function to fetch all transaction units within an entity of an organization
export const fetchAllUnits = async (organizationId, entityId, filters) => {
  if (!organizationId || !entityId) return [];

  const allUnits = [];
  const { selectedCategory, selectedType, selectedMonths = [], selectedYear, months } = filters;

  try {
    const year = selectedYear ? parseInt(selectedYear) : new Date().getFullYear();
    const monthsToFetch = selectedMonths.length > 0 ? selectedMonths : months;

    for (let month of monthsToFetch) {
      const unitsRef = collection(db, "organizations", organizationId, "entities", entityId, "transaction-units", year.toString(), month);
      let unitsQuery = unitsRef;

      if (selectedCategory) {
        unitsQuery = query(unitsQuery, where('category', '==', selectedCategory));
      }

      if (selectedType) {
        unitsQuery = query(unitsQuery, where('type', '==', selectedType));
      }

      const unitsSnapshot = await getDocs(unitsQuery);
      const units = unitsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date.seconds * 1000),
      }));

      allUnits.push(...units);
    }
  } catch (error) {
    console.error("Error fetching units: ", error);
  }

  return allUnits;
};

// Function to save a unit to Firestore within an entity of an organization
export const saveUnitToFirestore = async (organizationId, entityId, unit, year, month) => {
  try {
    const unitsCollectionRef = collection(db, "organizations", organizationId, "entities", entityId, "transaction-units", year, month);

    await addDoc(unitsCollectionRef, {
      ...unit,
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
          date: new Date(doc.data().date.seconds * 1000),
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
          entry.montantInitial = entry.montants.reduce((sum, montant) => sum + montant, 0);
          entry.montants.forEach((montant, index) => {
            totalEntry.montants[index] += montant;
          });
          totalEntry.montantInitial += entry.montantInitial;
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
  

// Function to save a summary to Firestore within an entity of an organization
export const saveSummaryToFirestore = async (organizationId, entityId, year, summary) => {
  try {
    summary.name = year;

    await setDoc(doc(db, "organizations", organizationId, "entities", entityId, "transactions-summary", year.toString()), summary);

    console.log(`Summary for ${year} saved successfully.`);
  } catch (error) {
    console.error(`Error saving summary for ${year} to Firestore:`, error);
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
