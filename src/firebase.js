// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGFfJ2mjN0LX8EPd93UuBVuYJ0lJykC60",
  authDomain: "myareaa-ca0cb.firebaseapp.com",
  databaseURL: "https://myareaa-ca0cb-default-rtdb.firebaseio.com",
  projectId: "myareaa-ca0cb",
  storageBucket: "myareaa-ca0cb.appspot.com",
  messagingSenderId: "555794584428",
  appId: "1:555794584428:web:a1cd29162898d0a0b79949",
  measurementId: "G-X9N5LTBZF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);