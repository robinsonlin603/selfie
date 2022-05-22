import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDd6wWhLdqUiLaJKDMbuEA-oZmVJKgzX-Q",
  authDomain: "theselfie-59eaf.firebaseapp.com",
  projectId: "theselfie-59eaf",
  storageBucket: "theselfie-59eaf.appspot.com",
  messagingSenderId: "991305123558",
  appId: "1:991305123558:web:6b57b68a3a7baeb1915d27",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore(app);

// init firebase auth
const auth = getAuth(app);

// init firestorage
const storage = getStorage(app);

// timestamp
const timestamp = Timestamp;

export { db, auth, timestamp, storage };
