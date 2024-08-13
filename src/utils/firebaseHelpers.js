import { collectionGroup, collection, getDocs, addDoc, getDoc, setDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

// Function to save or update a transaction book
export const saveTransactionSummary = async (userId, bookName, transactions) => {
  try {
    const bookRef = doc(collection(db, "users", userId, "transactions-summary"), bookName);
    await setDoc(bookRef, transactions, { merge: true });
  } catch (error) {
    console.error("Error saving transaction book: ", error);
  }
};

// Function to retrieve all transaction books
export const getTransactionSummary = async (userId) => {
  try {
    const booksCollection = collection(db, "users", userId, "transactions-summary");
    const booksSnapshot = await getDocs(booksCollection);
    const books = {};
    booksSnapshot.forEach((doc) => {
      books[doc.id] = doc.data();
    });
    return books;
  } catch (error) {
    console.error("Error getting transaction books: ", error);
  }
};

// Saving transaction details using transaction ID
export const saveTransactionDetails = async (userId, transactionId, details) => {
  try {
    const detailsRef = doc(db, "users", userId, "transaction-books-details", transactionId);
    await setDoc(detailsRef, details, { merge: true });
  } catch (error) {
    console.error("Error saving transaction details: ", error);
  }
};

// Function to get transaction details using transaction ID
export const getTransactionDetails = async (userId, transactionId) => {
  try {
    const docRef = doc(db, "users", userId, "transaction-books-details", transactionId);
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


/**
 * Fetches all transaction summary books for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - An object containing all transaction summaries keyed by their document ID.
 */
export const getAllTransactionSummaries = async (userId) => {
  try {
    const summariesCollection = collection(db, 'users', userId, 'transactions-summary');
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

// Function to get details of a specific transaction book
export const getTransactionBookDetails = async (bookId) => {
  try {
    const bookRef = doc(db, "transaction-books-details", bookId);
    const bookSnap = await getDoc(bookRef);
    if (bookSnap.exists()) {
      return { id: bookSnap.id, ...bookSnap.data() };
    } else {
      throw new Error("Transaction book details not found.");
    }
  } catch (error) {
    console.error("Error fetching transaction book details: ", error);
    throw new Error("Failed to fetch transaction book details.");
  }
};

// Function to add a new transaction book
export const addTransactionBook = async (newBook) => {
  try {
    const docRef = await addDoc(collection(db, "transaction-books"), newBook);
    return docRef.id;
  } catch (error) {
    console.error("Error adding transaction book: ", error);
    throw new Error("Failed to add transaction book.");
  }
};

// Function to update a transaction book
export const updateTransactionBook = async (bookId, updatedData) => {
  try {
    const bookRef = doc(db, "transaction-books", bookId);
    await updateDoc(bookRef, updatedData);
  } catch (error) {
    console.error("Error updating transaction book: ", error);
    throw new Error("Failed to update transaction book.");
  }
};

// Function to delete a transaction book
export const deleteTransactionBook = async (bookId) => {
  try {
    const bookRef = doc(db, "transaction-books", bookId);
    await deleteDoc(bookRef);
  } catch (error) {
    console.error("Error deleting transaction book: ", error);
    throw new Error("Failed to delete transaction book.");
  }
};

export const fetchAllUnits = async (userId, filters) => {
  if (!userId) return [];

  const allUnits = [];
  const { selectedCategory, selectedType, selectedMonths = [], selectedYear, months } = filters;

  try {
    console.log("Fetching all units for filters ", filters);
    // Only process the specific year if selected
    const year = selectedYear ? parseInt(selectedYear) : new Date().getFullYear();

    // Use selectedMonths if defined, otherwise default to all months
    const monthsToFetch = selectedMonths.length > 0 ? selectedMonths : months;

    for (let month of monthsToFetch) {
      const unitsRef = collection(db, "users", userId, "transaction-units", year.toString(), month);
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

export const saveUnitToFirestore = async (userId, unit, year, month) => {
  try {
    // Get the reference to the collection where you want to add the document
    const unitsCollectionRef = collection(db, "users", userId, "transaction-units", year, month);

    // Use addDoc to add the document to the collection
    await addDoc(unitsCollectionRef, {
      ...unit,
      createdBy: userId,
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

export const fetchUnitsSummary = async (userId) => {
  if (!userId) return;

  const summary = {};

  try {
    // Loop through all years and months
    for (let year = new Date().getFullYear(); year >= new Date().getFullYear() - 15; year--) {
      // Initialize the year object in the summary
      summary[year] = {
        encaissements: [],
        decaissements: [],
      };

      for (let month of months) {
        const monthIndex = months.indexOf(month); // 0-based index for the month

        const unitsRef = collection(db, "users", userId, "transaction-units", year.toString(), month);
        const unitsSnapshot = await getDocs(unitsRef);

        const units = unitsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: new Date(doc.data().date.seconds * 1000), // Convert Firestore timestamp to Date
        }));

        units.forEach(unit => {
          const { type, category, quantity, unitPrice } = unit;
          const totalAmount = parseFloat(unitPrice) * parseInt(quantity);

          // Determine if the unit is an encaissement or decaissement
          const summaryType = type === 'revenues' ? 'encaissements' : 'decaissements';

          // Find the existing category (nature) object within the year
          let natureEntry = summary[year][summaryType].find(entry => entry.nature === category);

          if (!natureEntry) {
            // If it doesn't exist, create a new one
            natureEntry = {
              nature: category,
              montantInitial: 0,
              montants: Array(12).fill(0), // Initialize an array for 12 months
            };
            summary[year][summaryType].push(natureEntry);
          }

          // Add the total amount to the correct month in the montants array
          natureEntry.montants[monthIndex] += totalAmount;
        });
      }

      // Calculate the total for each type within the year
      const calculateTotal = (entries) => {
        const totalEntry = {
          nature: `Total ${entries.length > 0 ? entries[0].nature.split(" ")[0] : ""}`, // Total Encaissements or Total Decaissements
          montantInitial: 0,
          montants: Array(12).fill(0), // Initialize an array for 12 months
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

      // Push the calculated totals to the summary
      summary[year].encaissements.push(calculateTotal(summary[year].encaissements));
      summary[year].decaissements.push(calculateTotal(summary[year].decaissements));
    }

    return summary;

  } catch (error) {
    console.error("Error fetching units summary: ", error);
    throw error;
  }
};


export const saveSummaryToFirestore = async (userId, year, summary) => {
  try {
    summary.name = year;

    // Save the summary to Firestore, using the year as the document ID
    await setDoc(doc(db, "users", userId, "transactions-summary", year.toString()), summary);

    console.log(`Summary for ${year} saved successfully.`);
  } catch (error) {
    console.error(`Error saving summary for ${year} to Firestore:`, error);
    throw error;
  }
};