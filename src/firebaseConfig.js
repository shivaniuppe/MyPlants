// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcituv9SF4W74FxN8QZdUPj_z1JkHOjlI",
  authDomain: "fir-plants-adf31.firebaseapp.com",
  projectId: "fir-plants-adf31",
  storageBucket: "fir-plants-adf31.firebasestorage.app",
  messagingSenderId: "310150364124",
  appId: "1:310150364124:web:f901d93a60b6d62ddc6d19"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
// get the firestore database object
export const db = getFirestore(firebase_app);
