"use client"
import { useEffect, useState } from "react";
import { auth } from "../src/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AppHeader() {
  const [dark, setDark] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email ?? null);
    });
    return unsubscribe;
  }, []);

  return (
    <header className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="text-lg font-bold">🧭 Supercent Fun App</div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDark((d) => !d)}
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {dark ? "🌞 Light" : "🌙 Dark"}
        </button>
        {userEmail ? (
          <div className="text-sm flex items-center space-x-2">
            <span>{userEmail}</span>
            <button
              onClick={() => signOut(auth)}
              className="text-red-500 hover:underline text-xs"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <a href="/login" className="text-blue-500 text-sm hover:underline">로그인</a>
        )}
      </div>
    </header>
  );
}