// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage  } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0-uePYvmFXk2KJjttpSJ9f5FdmwoSDIU",
  authDomain: "employee-portal-8f758.firebaseapp.com",
  databaseURL: "https://employee-portal-8f758-default-rtdb.firebaseio.com",
  projectId: "employee-portal-8f758",
  storageBucket: "employee-portal-8f758.appspot.com",
  messagingSenderId: "19111211270",
  appId: "1:19111211270:web:ab7c98cf055f28892eae87",
  measurementId: "G-ESZF1YL6T3"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB =  getFirestore(FirebaseApp);

export const FirebaseStorage = getStorage(FirebaseApp);
