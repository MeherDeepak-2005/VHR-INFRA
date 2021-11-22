// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
//   Your Firebase Config Information
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


const db = getFirestore();

const storage = getStorage();


export { app, db, storage };
