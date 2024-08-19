import { db } from './firebaseConfig'; // Assuming you have a Firebase config file
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

// Function to fetch documents specific to an organization from a subcollection
export const fetchDocuments = async(subcollectionName) => {
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
export const addDocument = async(subcollectionName, documentData) => {
  try {
    documentData.organizationId = organizationId;
    const subcollectionRef = collection(db, 'organizations', organizationId, subcollectionName);
    const docRef = await addDoc(subcollectionRef, documentData);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error(`Error adding document to ${subcollectionName}:`, error);
    throw new Error(`Could not add document to ${subcollectionName}`);
  }
};

// Function to update an existing document in a subcollection
export const updateDocument = async(subcollectionName, documentId, documentData) => {
  try {
    const docRef = doc(db, 'organizations', organizationId, subcollectionName, documentId);
    await updateDoc(docRef, documentData);
  } catch (error) {
    console.error(`Error updating document in ${subcollectionName}:`, error);
    throw new Error(`Could not update document in ${subcollectionName}`);
  }
};

// Function to delete a document from a subcollection
export const deleteDocument = async(subcollectionName, documentId) => {
  try {
    const docRef = doc(db, 'organizations', organizationId, subcollectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${subcollectionName}:`, error);
    throw new Error(`Could not delete document from ${subcollectionName}`);
  }
};


export const fetchDocumentsBySelectValue = async(relativeCollection, foreignKey, foreignValue) => {
  try {
    const subcollectionRef = collection(db, 'organizations', organizationId, relativeCollection);
    
    // Create a query against the collection
    const q = query(subcollectionRef, where(foreignKey, 'array-contains', foreignValue));
    
    // Execute the query and get the documents
    const snapshot = await getDocs(q);
    const documentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return documentsList;
  } catch (error) {
    console.error(`Error fetching documents from ${relativeCollection}:`, error);
    return [];
  }
}

export const fetchDocumentsByFieldValue = async(relativeCollection, fieldName, fieldValue) => {
  try {
    const subcollectionRef = collection(db, 'organizations', organizationId, relativeCollection);
    
    // Create a query against the collection
    const q = query(subcollectionRef, where(fieldName, '==', fieldValue));
    
    // Execute the query and get the documents
    const snapshot = await getDocs(q);
    const documentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return documentsList;
  } catch (error) {
    console.error(`Error fetching documents from ${relativeCollection}:`, error);
    return [];
  }
}
export const fetchDocumentById = async(subcollectionName, documentId) => {
  console.log("Fetching document with ID:", documentId);
  console.log("In subcollection:", subcollectionName);
  console.log("Under organization ID:", organizationId);

  try {
    const docRef = doc(db, 'organizations', organizationId, subcollectionName, documentId);
    console.log("Document Reference:", docRef.path); // Log the path being queried

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data()); // Log the retrieved data
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error(`No document found with ID ${documentId} in ${subcollectionName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching document with ID ${documentId} from ${subcollectionName}:`, error);
    return null;
  }
};
