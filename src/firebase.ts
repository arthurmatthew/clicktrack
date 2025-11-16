// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAABIVPT-V17zPxY-yMH9srZkYadClXgec',
  authDomain: 'auth.useclicktrack.com',
  projectId: 'clicktrack-7dc92',
  storageBucket: 'clicktrack-7dc92.appspot.com',
  messagingSenderId: '149894037389',
  appId: '1:149894037389:web:61ae3afaf9d9bebcccc7c4',
  measurementId: 'G-BLH6J7CN2P',
};

// const firebaseTestingConfig: FirebaseOptions = {
//   apiKey: 'AIzaSyDKmfU9jkBS4lNXRMAtquf4Ro-AJLn4Pvk',
//   authDomain: 'clicktracktest.firebaseapp.com',
//   projectId: 'clicktracktest',
//   storageBucket: 'clicktracktest.appspot.com',
//   messagingSenderId: '785559312074',
//   appId: '1:785559312074:web:b135155396d4e9c568c633',
// };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, 'us-central1');

setPersistence(auth, browserLocalPersistence);

export default app;
