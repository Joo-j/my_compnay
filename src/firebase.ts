import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsW0JbqFI-bkru3cVaMPMe3Jzpt9HWqhc",
  authDomain: "mycompany-c5e7c.firebaseapp.com",
  projectId: "mycompany-c5e7c",
  storageBucket: "mycompany-c5e7c.appspot.com",
  messagingSenderId: "780582603535",
  appId: "1:780582603535:web:641bd77754f766fe690c7a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);