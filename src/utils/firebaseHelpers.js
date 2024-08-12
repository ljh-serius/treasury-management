import { collection, getDocs, addDoc, getDoc, setDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Function to save or update a transaction book
export const saveTransactionBook = async (userId, bookName, transactions) => {
  try {
    const bookRef = doc(collection(db, "users", userId, "transactionBooks"), bookName);
    await setDoc(bookRef, transactions, { merge: true });
  } catch (error) {
    console.error("Error saving transaction book: ", error);
  }
};

// Function to retrieve all transaction books
export const getTransactionBooks = async (userId) => {
  try {
    const booksCollection = collection(db, "users", userId, "transactionBooks");
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

// Function to save or update transaction book details
export const saveTransactionDetails = async (userId, bookName, details) => {
  try {
    const detailsRef = doc(collection(db, "users", userId, "transaction-books-details"), bookName);
    await setDoc(detailsRef, details, { merge: true });
  } catch (error) {
    console.error("Error saving transaction book details: ", error);
  }
};

// Function to retrieve all transaction books details
export const getTransactionBooksDetails = async (userId) => {
  try {
    const detailsCollection = collection(db, "users", userId, "transaction-books-details");
    const detailsSnapshot = await getDocs(detailsCollection);
    const details = {};
    detailsSnapshot.forEach((doc) => {
      details[doc.id] = doc.data();
    });
    return details;
  } catch (error) {
    console.error("Error getting transaction book details: ", error);
  }
};

// Function to get all transaction books
export const getAllTransactionBooks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "transaction-books"));
    const transactionBooks = [];
    querySnapshot.forEach((doc) => {
      transactionBooks.push({ id: doc.id, ...doc.data() });
    });
    return transactionBooks;
  } catch (error) {
    console.error("Error fetching transaction books: ", error);
    throw new Error("Failed to fetch transaction books.");
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
