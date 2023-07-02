// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUnBRJm32FCBLADl8I8AXNrHblFtkPMQw",
  authDomain: "react-app-2d00d.firebaseapp.com",
  projectId: "react-app-2d00d",
  storageBucket: "react-app-2d00d.appspot.com",
  messagingSenderId: "147575226900",
  appId: "1:147575226900:web:08597f58ce86ccd67e5d01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Database=getFirestore(app)
 export const notesCollection=collection(Database,"notes")