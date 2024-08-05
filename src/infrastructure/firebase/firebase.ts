// Import the functions you need from the SDKs you need
import {FirebaseApp, initializeApp} from "firebase/app";
import {firebaseSecret} from "../../secrets/firebaseSecret";


// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseSecret);
export default firebaseApp;
