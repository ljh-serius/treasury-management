import { doc, deleteDoc, collection, query, where, getDocs,updateDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

export const updateUnit = async (organizationId, entityId, year, month, unitId, updatedData) => {
    try {
        // Get the reference to the collection
        const unitsCollectionRef = collection(
            db,   
            "organizations", 
            organizationId, 
            "entities", 
            entityId, 
            "transaction-units", 
            String(year),  
            String(month)[0].toUpperCase() + String(month).slice(1).toLowerCase()
        );

        // Create the query with the where clause to find the document by id
        const q = query(unitsCollectionRef, where("id", "==", unitId));

        // Get the documents matching the query
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('No matching document found');
        }

        // Iterate over the documents and update each one
        const updatePromises = [];
        querySnapshot.forEach((docSnapshot) => {
            const unitDocRef = doc(unitsCollectionRef, docSnapshot.id);
            updatePromises.push(updateDoc(unitDocRef, updatedData));
        });

        // Wait for all updates to complete
        await Promise.all(updatePromises);

        console.log('Unit updated successfully.');
    } catch (error) {
        console.error("Error updating unit: ", error);
        throw error;
    }
};


export const deleteUnit = async (organizationId, entityId, year, month, unitId) => {
    try {

        const unitsCollectionRef = collection(
            db, 
            "organizations", 
            organizationId, 
            "entities", 
            entityId, 
            "transaction-units", 
            String(year), 
            String(month)[0].toUpperCase() + String(month).slice(1).toLowerCase()
        );
    
        const q = query(unitsCollectionRef, where("id", "==", unitId));
        const querySnapshot = await getDocs(q);
    
        const deletePromises = [];
        querySnapshot.forEach((docSnapshot) => {
            const unitDocRef = doc(db, "organizations", organizationId, "entities", entityId, "transaction-units", String(year), String(month)[0].toUpperCase() + String(month).slice(1).toLowerCase(), docSnapshot.id);
            deletePromises.push(deleteDoc(unitDocRef));
        });
    
        await Promise.all(deletePromises);
        console.log('Units deleted successfully.');
    } catch (error) {
        console.error("Error deleting units: ", error);
        throw error;
    }
};