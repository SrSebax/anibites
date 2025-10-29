/**
 * Configuración de Firebase
 * Inicializa Firebase y Firestore para la aplicación
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
// Los valores se obtienen de las variables de entorno
// Crea un archivo .env en la raíz del proyecto con tus credenciales
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "TU_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "TU_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "TU_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "TU_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "TU_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
export default app;
