// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh1Dgy33dlP8ltWsjOn4Sx2uL5RVugwac",
  authDomain: "exalt-final-project.firebaseapp.com",
  projectId: "exalt-final-project",
  storageBucket: "exalt-final-project.appspot.com",
  messagingSenderId: "962752385313",
  appId: "1:962752385313:web:965485278fa83f0f8c2e60"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database and get a reference to the service
export const database = getDatabase(app);
export const connectDB = ref(database, 'doctors');
