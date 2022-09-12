import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0k9ofI9uisedcCScdc9HYAuI0uylM-6E",
    authDomain: "fb-clone-ecc26.firebaseapp.com",
    projectId: "fb-clone-ecc26",
    storageBucket: "fb-clone-ecc26.appspot.com",
    messagingSenderId: "101102079626",
    appId: "1:101102079626:web:3382127e7b197eed9ca773"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app)
const storage = getStorage(app)

export {db, storage}