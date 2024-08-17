import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Fetch all employees from the 'employees' collection
export const fetchEmployees = async () => {
  const querySnapshot = await getDocs(collection(db, 'employees'));
  const employeesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return employeesData;
};

// Add a new employee to the 'employees' collection
export const addEmployee = async (employeeData, organizationId) => {
  employeeData.organizationId = organizationId;
  await addDoc(collection(db, 'employees'), employeeData);
};

// Update an existing employee in the 'employees' collection
export const updateEmployee = async (id, employeeData) => {
  const employeeRef = doc(db, 'employees', id);
  await updateDoc(employeeRef, employeeData);
};

// Delete an employee from the 'employees' collection
export const deleteEmployee = async (id) => {
  const employeeRef = doc(db, 'employees', id);
  await deleteDoc(employeeRef);
};
