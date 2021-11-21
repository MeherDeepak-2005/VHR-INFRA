// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "vhr-infra.firebaseapp.com",
  projectId: "vhr-infra",
  storageBucket: "vhr-infra.appspot.com",
  messagingSenderId: "514523510644",
  appId: "1:514523510644:web:7d7686081c086cf2425e21",
  measurementId: "G-7RWBP5WSE6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


const db = getFirestore();

const storage = getStorage();


export { app, db, storage };
