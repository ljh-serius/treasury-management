import { collection, getDocs, addDoc, getDoc, setDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Function to save or update a transaction book
export const saveTransactionBook = async (userId, bookName, transactions) => {
  try {
    const bookRef = doc(collection(db, "users", userId, "transaction-books"), bookName);
    await setDoc(bookRef, transactions, { merge: true });
  } catch (error) {
    console.error("Error saving transaction book: ", error);
  }
};

// Function to retrieve all transaction books
export const getTransactionBooks = async (userId) => {
  try {
    const booksCollection = collection(db, "users", userId, "transaction-books");
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
