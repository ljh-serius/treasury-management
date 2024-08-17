import { db } from './firebaseConfig'; // Assuming you have a Firebase config file
import { collection, getDocs, addDoc, updateDoc, deleteDoc, query, where, doc } from 'firebase/firestore';

// Function to fetch cost allocations specific to an organization
export const fetchCostAllocations = async (organizationId) => {
  try {
    const costAllocationsCollection = collection(db, 'cost-allocations');
    const q = query(costAllocationsCollection, where('organizationId', '==', organizationId));
    const costAllocationsSnapshot = await getDocs(q);
    const costAllocationsList = costAllocationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return costAllocationsList;
  } catch (error) {
    console.error('Error fetching cost allocations:', error);
    return [];
  }
};

// Function to add a new cost allocation linked to an organization
export const addCostAllocation = async (allocationData, organizationId) => {
  try {
    const costAllocationsCollection = collection(db, 'cost-allocations');
    const docRef = await addDoc(costAllocationsCollection, { ...allocationData, organizationId });
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error('Error adding cost allocation:', error);
    throw new Error('Could not add cost allocation');
  }
};

// Function to update an existing cost allocation
export const updateCostAllocation = async (allocationId, allocationData) => {
  try {
    const allocationDoc = doc(db, 'cost-allocations', allocationId);
    await updateDoc(allocationDoc, allocationData);
  } catch (error) {
    console.error('Error updating cost allocation:', error);
    throw new Error('Could not update cost allocation');
  }
};

// Function to delete a cost allocation
export const deleteCostAllocation = async (allocationId) => {
  try {
    const allocationDoc = doc(db, 'cost-allocations', allocationId);
    await deleteDoc(allocationDoc);
  } catch (error) {
    console.error('Error deleting cost allocation:', error);
    throw new Error('Could not delete cost allocation');
  }
};
