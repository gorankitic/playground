import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB7lTJ-GHHfjnfsZyGrExi7ItSZGGOL43E",
  authDomain: "playground-b7315.firebaseapp.com",
  projectId: "playground-b7315",
  storageBucket: "playground-b7315.appspot.com",
  messagingSenderId: "861676100518",
  appId: "1:861676100518:web:c474bb114cb8500b52cd67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };