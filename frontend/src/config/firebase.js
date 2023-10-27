// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBmaRnmAaKnSP5L3LjoVFdUcmScF1VLNU",
  authDomain: "loan-app-8d00d.firebaseapp.com",
  projectId: "loan-app-8d00d",
  storageBucket: "loan-app-8d00d.appspot.com",
  messagingSenderId: "267066686565",
  appId: "1:267066686565:web:afcaef66c7f9914b899a8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// create New user
export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Login user
export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Logout User
export const logout = () => {
  return signOut(auth);
};

//  custom hook to get current User
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, []);

  return currentUser;
};
