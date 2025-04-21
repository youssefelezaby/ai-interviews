import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLyONUxaTcUDwtVTJ4b-07F5xYGWeJO0o",
  authDomain: "ai-interviews-11.firebaseapp.com",
  projectId: "ai-interviews-11",
  storageBucket: "ai-interviews-11.firebasestorage.app",
  messagingSenderId: "555438718392",
  appId: "1:555438718392:web:b5e090982c46915a2ae34d",
  measurementId: "G-72VVGNXWTR",
};
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
