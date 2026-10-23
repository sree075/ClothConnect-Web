// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDO5bKnp3HZU14lxuhw287sqhFNbFuEhsY",
    authDomain: "clothconnect-290a3.firebaseapp.com",
    projectId: "clothconnect-290a3",
    storageBucket: "clothconnect-290a3.firebasestorage.app",
    messagingSenderId: "717189392209",
    appId: "1:717189392209:web:40ea98513f5f92ba81d570",
    measurementId: "G-2QQTQ3LLLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Storage
const storage = getStorage(app);

// Firestore Database
const db = getFirestore(app);

export { app, storage, db };