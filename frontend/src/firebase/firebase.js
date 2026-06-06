import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAfFxTJLcJgREHBHi6T-RWqOzvZE_z17M",
  authDomain: "transgpt-2.firebaseapp.com",
  projectId: "transgpt-2",
  storageBucket: "transgpt-2.firebasestorage.app",
  messagingSenderId: "335736299969",
  appId: "1:335736299969:web:20663674baa7e4e1b98f40",
  measurementId: "G-BSGH25QVGN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;