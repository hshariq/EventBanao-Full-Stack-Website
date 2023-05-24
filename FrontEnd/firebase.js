// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFwC3ffsSFp_ADhaWP1TYD8mRk1T_0Sn8",
  authDomain: "uploadimage-2ed90.firebaseapp.com",
  projectId: "uploadimage-2ed90",
  storageBucket: "uploadimage-2ed90.appspot.com",
  messagingSenderId: "741046051443",
  appId: "1:741046051443:web:726c17651c6e87b1edc006"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);