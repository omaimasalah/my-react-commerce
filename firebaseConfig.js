import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBdqPKtVG3X3t709TQInUhCY3ATpkiaivM",
  authDomain: "ecommerce-a43e4.firebaseapp.com",
  projectId: "ecommerce-a43e4",
  storageBucket: "ecommerce-a43e4.firebasestorage.app",
  messagingSenderId: "658265318756",
  appId: "1:658265318756:web:88104c4e2f77df9e120671",
  measurementId: "G-0749804SVG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const analytics = getAnalytics(app);

export default app;