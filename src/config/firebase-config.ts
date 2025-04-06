// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEwkYKkR_L2LcLhW53dlb4Dxhrjy9iulY",
  authDomain: "chatterbox-3fca9.firebaseapp.com",
  projectId: "chatterbox-3fca9",
  storageBucket: "chatterbox-3fca9.firebasestorage.app",
  messagingSenderId: "847688419457",
  appId: "1:847688419457:web:38c336cb1af693074ea580",
  measurementId: "G-XLNQ7ZN714",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
// const analytics = getAnalytics(app);
