// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "tutto-rifiuto.firebaseapp.com",
    projectId: "tutto-rifiuto",
    storageBucket: "tutto-rifiuto.appspot.com",
    messagingSenderId: "798139500156",
    appId: "1:798139500156:web:f65c3730f917aa70dbabf9",
    measurementId: "G-PRJPEEVN4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
