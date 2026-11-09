import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbnxCD-uYVm1AT09vlnvRycBgFF1JxZ_4",
  authDomain: "app-le-fleury.firebaseapp.com",
  projectId: "app-le-fleury",
  storageBucket: "app-le-fleury.firebasestorage.app",
  messagingSenderId: "817003691959",
  appId: "1:817003691959:web:33a91304fbd460b504b232",
  measurementId: "G-W95R043XKH"
};

// Empêche la double initialisation qui fait crasher l'app au démarrage
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);