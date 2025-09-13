// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY1GBXo4ReLho5vaXq9oftBSCFdRsoxMo",
  authDomain: "gamezonedvz.firebaseapp.com",
  projectId: "gamezonedvz",
  storageBucket: "gamezonedvz.firebasestorage.app",
  messagingSenderId: "641555724886",
  appId: "1:641555724886:web:7bca73f683513a85c759f7",
  measurementId: "G-EFZ1EQX3CY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
