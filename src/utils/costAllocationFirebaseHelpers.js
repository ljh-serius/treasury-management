import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const costAllocationCollectionRef = collection(db, 'costs-allocation');

export const fetchCostAllocations = async () => {
  const snapshot = await getDocs(costAllocationCollectionRef);
  const allocations = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return allocations;
};

export const addCostAllocation = async (allocationData) => {
    await addDoc(costAllocationCollectionRef, {
      ...allocationData,
      productIds: allocationData.productIds || [],
      employeeIds: allocationData.employeeIds || [],
      projectIds: allocationData.projectIds || [],
      partnerIds: allocationData.partnerIds || [],
      providerIds: allocationData.providerIds || [],
    });
  };
  
  export const updateCostAllocation = async (id, updatedData) => {
    const allocationDoc = doc(db, 'costs-allocation', id);
    await updateDoc(allocationDoc, {
      ...updatedData,
      productIds: updatedData.productIds || [],
      employeeIds: updatedData.employeeIds || [],
      projectIds: updatedData.projectIds || [],
      partnerIds: updatedData.partnerIds || [],
      providerIds: updatedData.providerIds || [],
    });
  };
  
export const deleteCostAllocation = async (id) => {
  const allocationDoc = doc(db, 'costs-allocation', id);
  await deleteDoc(allocationDoc);
};