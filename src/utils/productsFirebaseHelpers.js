import { getDocs, collection} from "firebase/firestore";
import { db } from './firebaseConfig';

const productsCollectionRef = collection(db, 'products');

export const fetchProducts = async () => {
    const snapshot = await getDocs(productsCollectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};