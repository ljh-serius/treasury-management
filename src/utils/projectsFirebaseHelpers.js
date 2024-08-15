import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Fetch all projects from the 'projects' collection
export const fetchProjects = async () => {
  const querySnapshot = await getDocs(collection(db, 'projects'));
  const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return projectsData;
};

// Add a new project to the 'projects' collection
export const addProject = async (projectData) => {
  await addDoc(collection(db, 'projects'), projectData);
};

// Update an existing project in the 'projects' collection
export const updateProject = async (id, projectData) => {
  const projectRef = doc(db, 'projects', id);
  await updateDoc(projectRef, projectData);
};

// Delete a project from the 'projects' collection
export const deleteProject = async (id) => {
  const projectRef = doc(db, 'projects', id);
  await deleteDoc(projectRef);
};
