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

// Function to fetch organization data along with users
export const fetchOrganizationData = async (organizationId) => {
  const orgRef = doc(db, "organizations", organizationId);
  const orgSnapshot = await getDoc(orgRef);

  if (orgSnapshot.exists()) {
    const orgData = orgSnapshot.data();
    const usersSnapshot = await getDocs(collection(orgRef, "users"));
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { ...orgData, users };
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

// Function to add a user to an organization
export const addUserToOrganization = async (organizationId, user) => {
  const userRef = doc(collection(db, "organizations", organizationId, "users"));
  await setDoc(userRef, user);
};

// Function to save transaction details within an organization
export const saveTransactionDetails = async (organizationId, transactionId, details) => {
  try {
    const detailsRef = doc(db, "organizations", organizationId, "transaction-details", transactionId);
    await setDoc(detailsRef, details, { merge: true });
  } catch (error) {
    console.error("Error saving transaction details: ", error);
  }
};

// Function to get transaction details within an organization
export const getTransactionDetails = async (organizationId, transactionId) => {
  try {
    const docRef = doc(db, "organizations", organizationId, "transaction-details", transactionId);
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

// Function to fetch all transaction units within an organization
export const fetchAllUnits = async (organizationId, filters) => {
  if (!organizationId) return [];

  const allUnits = [];
  const { selectedCategory, selectedType, selectedMonths = [], selectedYear, months } = filters;

  try {
    console.log("Fetching all units for filters ", filters);
    // Only process the specific year if selected
    const year = selectedYear ? parseInt(selectedYear) : new Date().getFullYear();

    // Use selectedMonths if defined, otherwise default to all months
    const monthsToFetch = selectedMonths.length > 0 ? selectedMonths : months;

    for (let month of monthsToFetch) {
      const unitsRef = collection(db, "organizations", organizationId, "transaction-units", year.toString(), month);
      let unitsQuery = unitsRef;

      // Apply the category filter if provided
      if (selectedCategory) {
        unitsQuery = query(unitsQuery, where('category', '==', selectedCategory));
      }

      // Apply the type filter if provided
      if (selectedType) {
        unitsQuery = query(unitsQuery, where('type', '==', selectedType));
      }

      const unitsSnapshot = await getDocs(unitsQuery);
      const units = unitsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date.seconds * 1000), // Convert Firestore timestamp to Date
      }));

      allUnits.push(...units);
    }
  } catch (error) {
    console.error("Error fetching units: ", error);
  }

  return allUnits;
};

// Function to save a unit to Firestore within an organization
export const saveUnitToFirestore = async (organizationId, unit, year, month) => {
  try {
    // Get the reference to the collection where you want to add the document
    const unitsCollectionRef = collection(db, "organizations", organizationId, "transaction-units", year, month);

    // Use addDoc to add the document to the collection
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

export const getAllTransactionSummaries = async (organizationId) => {
  try {
    const summariesCollection = collection(db, 'organizations', organizationId, 'transactions-summary');
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

export const fetchUnitsSummary = async (organizationId) => {
  if (!organizationId) return;

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
        const monthIndex = months.indexOf(month); // 0-based index for the month
        const unitsRef = collection(db, "organizations", organizationId, "transaction-units", year.toString(), month);

        const unitsSnapshot = await getDocs(unitsRef);

        if (unitsSnapshot.empty) {
          console.log(`No units found for ${year} ${month}`);
          continue; // Skip to the next month if no units found
        }

        const units = unitsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: new Date(doc.data().date.seconds * 1000), // Convert Firestore timestamp to Date
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
              montants: Array(12).fill(0), // Initialize an array for 12 months
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

    console.log('Final Summary:', summary); // Debugging output

    return summary;

  } catch (error) {
    console.error("Error fetching units summary: ", error);
    throw error;
  }
};
  

// Function to save a summary to Firestore within an organization
export const saveSummaryToFirestore = async (organizationId, year, summary) => {
  try {
    summary.name = year;

    // Save the summary to Firestore, using the year as the document ID
    await setDoc(doc(db, "organizations", organizationId, "transactions-summary", year.toString()), summary);

    console.log(`Summary for ${year} saved successfully.`);
  } catch (error) {
    console.error(`Error saving summary for ${year} to Firestore:`, error);
    throw error;
  }
};
