import { db } from './firebaseConfig'; // Assume you have a Firebase config file
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Function to fetch all products
export const fetchProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return productList;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Function to add a new product
export const addProduct = async (productData, organizationId) => {
  try {
    productData.organizationId = organizationId;
    const productsCollection = collection(db, 'products');
    const docRef = await addDoc(productsCollection, productData);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Could not add product');
  }
};

// Function to update an existing product
export const updateProduct = async (productId, productData) => {
  try {
    const productDoc = doc(db, 'products', productId);
    await updateDoc(productDoc, productData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Could not update product');
  }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
  try {
    const productDoc = doc(db, 'products', productId);
    await deleteDoc(productDoc);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Could not delete product');
  }
};
