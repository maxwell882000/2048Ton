// Import the functions you need from the SDKs you need
import {FirebaseApp, initializeApp} from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjFDgoBF1mwLQ_KsbsOGK3x4U4lP_m5VI",
    authDomain: "ton-9a87d.firebaseapp.com",
    projectId: "ton-9a87d",
    storageBucket: "ton-9a87d.appspot.com",
    messagingSenderId: "24201501477",
    appId: "1:24201501477:web:2b1740ba3e7665eebbd8cc",
    measurementId: "G-G3WVFTNPJN"
};

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
