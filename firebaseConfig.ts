import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@async-storage/async-storage';

// Vos identifiants Firebase (récupérés depuis la console Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDbnxCD-uYVm1AT09vlnvRycBgFF1JxZ_4",
  authDomain: "app-le-fleury.firebaseapp.com",
  projectId: "app-le-fleury",
  storageBucket: "app-le-fleury.firebasestorage.app",
  messagingSenderId: "817003691959",
  appId: "1:817003691959:web:33a91304fbd460b504b232"
};

// Initialisation de Firebase (sécurisée pour React Native / Expo)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialisation de l'authentification avec persistance AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialisation de Firestore
const db = getFirestore(app);

export { db, auth };