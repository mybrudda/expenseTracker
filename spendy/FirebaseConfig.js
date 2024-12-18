
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAaIbLdDijGI3EGzGcbTr6oiaMkiEkW7_c",
  authDomain: "expensetracker-573b5.firebaseapp.com",
  projectId: "expensetracker-573b5",
  storageBucket: "expensetracker-573b5.firebasestorage.app",
  messagingSenderId: "899057358297",
  appId: "1:899057358297:web:5427c4ea63e3ee8cb9b5c8",
  measurementId: "G-D1GEL13B3V"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export { auth, db };

