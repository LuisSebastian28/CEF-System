// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-DpfB2Xjf1_KsqsgB1HTK3o4qD7N-DrQ",
  authDomain: "cefproject-f4f80.firebaseapp.com",
  projectId: "cefproject-f4f80",
  storageBucket: "cefproject-f4f80.appspot.com",
  messagingSenderId: "283483295099",
  appId: "1:283483295099:web:4145ff4f58c7f9764141de",
  measurementId: "G-X639NGL1XZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);