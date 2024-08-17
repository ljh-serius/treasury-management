import { db } from './firebaseConfig'; // Assuming you have a Firebase config file
import { collection, getDocs, addDoc, updateDoc, deleteDoc, query, where, doc } from 'firebase/firestore';

// Function to fetch partners specific to an organization
export const fetchPartners = async (organizationId) => {
  try {
    const partnersCollection = collection(db, 'partners');
    const q = query(partnersCollection, where('organizationId', '==', organizationId));
    const partnersSnapshot = await getDocs(q);
    const partnersList = partnersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return partnersList;
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
};

// Function to add a new partner linked to an organization
export const addPartner = async (partnerData) => {
  try {
    const partnersCollection = collection(db, 'partners');
    const docRef = await addDoc(partnersCollection, partnerData);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error('Error adding partner:', error);
    throw new Error('Could not add partner');
  }
};

// Function to update an existing partner
export const updatePartner = async (partnerId, partnerData) => {
  try {
    const partnerDoc = doc(db, 'partners', partnerId);
    await updateDoc(partnerDoc, partnerData);
  } catch (error) {
    console.error('Error updating partner:', error);
    throw new Error('Could not update partner');
  }
};

// Function to delete a partner
export const deletePartner = async (partnerId) => {
  try {
    const partnerDoc = doc(db, 'partners', partnerId);
    await deleteDoc(partnerDoc);
  } catch (error) {
    console.error('Error deleting partner:', error);
    throw new Error('Could not delete partner');
  }
};
