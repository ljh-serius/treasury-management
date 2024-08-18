import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig'; // Assuming you have firebaseConfig

export const login = async (email, password) => {
  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get userId
    const userId = user.uid;

    // Fetch user document from Firestore
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User data:', userData);

      // Fetch organization data using the organizationId from the user data
      const organizationId = userData.organizationId;

      if (organizationId) {
        const organizationDocRef = doc(db, 'organizations', organizationId);
        const organizationDoc = await getDoc(organizationDocRef);

        if (organizationDoc.exists()) {
          const organizationData = organizationDoc.data();
          console.log('Organization data:', organizationData);

          // Save both user and organization data to localStorage or state as needed
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('organizationData', JSON.stringify(organizationData));

          return true;
          // Additional logic after successful login (e.g., redirecting the user)
          // window.location.href = '/dashboard'; // Example redirect
        } else {
          console.log('No such organization document!');
        }
      } else {
        console.log('User has no associated organization!');
      }
    } else {
      console.log('No such user document!');
    }

  } catch (error) {
    console.error('Error logging in:', error);
    // Handle errors (e.g., show error messages to the user)
  }
};

// Function to add a user to the root `users` collection in Firestore
export const addUser = async (userId, firstName, lastName, email, role = 'admin', organizationId, entityId) => {
  const userRef = doc(db, 'users', userId);
  
  const userData = {
    firstName,
    lastName,
    email,
    role,
    organizationId,
    createdAt: new Date(),
    entityId: entityId
  };

  await setDoc(userRef, userData);
};


// Function to create an organization in Firebase
export const createOrganization = async (orgName, customDomain, email, numUsers, numStores, price) => {
  const tenantId = uuidv4();
  const orgDocRef = doc(collection(db, "organizations"));

  const organizationData = {
    name: orgName,
    domain: customDomain,
    email: email,
    numUsers: numUsers,
    numStores: numStores,
    price: price,
    tenant_id: tenantId,
  };

  await setDoc(orgDocRef, organizationData);
  return { tenantId, organizationId: orgDocRef.id };
};

