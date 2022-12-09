// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1WKf7R78bkXAw0CgwhoeyQIrwJ6HKwa0",
  authDomain: "bellasnatural-2a2e9.firebaseapp.com",
  projectId: "bellasnatural-2a2e9",
  storageBucket: "bellasnatural-2a2e9.appspot.com",
  messagingSenderId: "352674601407",
  appId: "1:352674601407:web:848f23fa5b04879105690a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();