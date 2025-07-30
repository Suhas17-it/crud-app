
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API",
  authDomain: "crud---app.firebaseapp.com",
  projectId: "crud---app",
  storageBucket: "crud---app.appspot.com",
  messagingSenderId: "173018789851",
  appId: "1:173018789851:web:2594fc52d6320fa6d019fe",
  measurementId: "G-X4Y951T12N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
