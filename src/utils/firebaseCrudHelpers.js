import { db } from './firebaseConfig'; // Assuming you have a Firebase config file
import { collection, getDocs, addDoc, updateDoc, deleteDoc, query, where, doc } from 'firebase/firestore';

// Function to fetch documents specific to an organization from a given collection
export const fetchDocuments = async (collectionName, organizationId) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where('organizationId', '==', organizationId));
    const snapshot = await getDocs(q);
    const documentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documentsList;
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);
    return [];
  }
};

// Function to add a new document linked to an organization in a given collection
export const addDocument = async (collectionName, documentData, organizationId) => {
  try {
    documentData.organizationId = organizationId;
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, documentData);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw new Error(`Could not add document to ${collectionName}`);
  }
};

// Function to update an existing document in a given collection
export const updateDocument = async (collectionName, documentId, documentData) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, documentData);
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw new Error(`Could not update document in ${collectionName}`);
  }
};

// Function to delete a document from a given collection
export const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw new Error(`Could not delete document from ${collectionName}`);
  }
};
