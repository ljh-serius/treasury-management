import { db } from './firebaseConfig'; // Assuming you have a Firebase config file
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Function to fetch documents specific to an organization from a subcollection
export const fetchDocuments = async (organizationId, subcollectionName) => {
  try {
    const subcollectionRef = collection(db, 'organizations', organizationId, subcollectionName);
    const snapshot = await getDocs(subcollectionRef);
    const documentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documentsList;
  } catch (error) {
    console.error(`Error fetching documents from ${subcollectionName}:`, error);
    return [];
  }
};

// Function to add a new document linked to an organization in a subcollection
export const addDocument = async (organizationId, subcollectionName, documentData) => {
  try {
    const subcollectionRef = collection(db, 'organizations', organizationId, subcollectionName);
    const docRef = await addDoc(subcollectionRef, documentData);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error(`Error adding document to ${subcollectionName}:`, error);
    throw new Error(`Could not add document to ${subcollectionName}`);
  }
};

// Function to update an existing document in a subcollection
export const updateDocument = async (organizationId, subcollectionName, documentId, documentData) => {
  try {
    const docRef = doc(db, 'organizations', organizationId, subcollectionName, documentId);
    await updateDoc(docRef, documentData);
  } catch (error) {
    console.error(`Error updating document in ${subcollectionName}:`, error);
    throw new Error(`Could not update document in ${subcollectionName}`);
  }
};

// Function to delete a document from a subcollection
export const deleteDocument = async (organizationId, subcollectionName, documentId) => {
  try {
    const docRef = doc(db, 'organizations', organizationId, subcollectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${subcollectionName}:`, error);
    throw new Error(`Could not delete document from ${subcollectionName}`);
  }
};
