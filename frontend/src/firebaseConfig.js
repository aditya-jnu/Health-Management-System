// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBL3tCXnNI2TgxYFlM8quE3ZHAcJ_NI30",
  authDomain: "healthmanagementsystem-27267.firebaseapp.com",
  projectId: "healthmanagementsystem-27267",
  storageBucket: "healthmanagementsystem-27267.firebasestorage.app",
  messagingSenderId: "605708289487",
  appId: "1:605708289487:web:486b510b6531b9558efeba",
  measurementId: "G-6HSP3YGR5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);