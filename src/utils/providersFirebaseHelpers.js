import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Adjust the path as necessary

// Fetch providers for a specific organization
export const fetchProviders = async (organizationId) => {
  const q = query(collection(db, 'providers'), where('organizationId', 'array-contains', organizationId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add a new provider
export const addProvider = async (provider, organizationId) => {
  provider.organizationId = organizationId;
  return await addDoc(collection(db, 'providers'), provider);
};

// Update an existing provider
export const updateProvider = async (providerId, updatedData) => {
  const providerRef = doc(db, 'providers', providerId);
  return await updateDoc(providerRef, updatedData);
};

// Delete a provider
export const deleteProvider = async (providerId) => {
  const providerRef = doc(db, 'providers', providerId);
  return await deleteDoc(providerRef);
};
