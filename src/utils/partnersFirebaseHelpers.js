import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Fetch all partners from the 'partners' collection
export const fetchPartners = async () => {
  const querySnapshot = await getDocs(collection(db, 'partners'));
  const partnersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return partnersData;
};

// Add a new partner to the 'partners' collection
export const addPartner = async (partnerData) => {
  await addDoc(collection(db, 'partners'), partnerData);
};

// Update an existing partner in the 'partners' collection
export const updatePartner = async (id, partnerData) => {
  const partnerRef = doc(db, 'partners', id);
  await updateDoc(partnerRef, partnerData);
};

// Delete a partner from the 'partners' collection
export const deletePartner = async (id) => {
  const partnerRef = doc(db, 'partners', id);
  await deleteDoc(partnerRef);
};
