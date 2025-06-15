import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ 쵸파가 보여준 진짜 firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyAsW0JbqFI-bkru3cVaMPMe3Jzpt9HWqhc",
  authDomain: "mycompany-c5e7c.firebaseapp.com",
  projectId: "mycompany-c5e7c",
  storageBucket: "mycompany-c5e7c.firebasestorage.app",
  messagingSenderId: "780582603535",
  appId: "1:780582603535:web:641bd77754f766fe690c7a",
  measurementId: "G-SV7Q5BMR6B", // 이건 없어도 됨
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 모듈 export
export const auth = getAuth(app);
export const db = getFirestore(app);
