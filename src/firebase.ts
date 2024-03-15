// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  browserLocalPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA_FIf9IlYnOfcrkfeCGhFBfVBsdbqXjUw",
  authDomain: "sandbox-975c0.firebaseapp.com",
  projectId: "sandbox-975c0",
  storageBucket: "sandbox-975c0.appspot.com",
  messagingSenderId: "196613799072",
  appId: "1:196613799072:web:225c91edf1c62ee104ddc5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized.");

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
await auth.setPersistence(browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();
export default app;
