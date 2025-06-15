import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function TopBar() {
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="w-full p-4 bg-indigo-600 text-white flex justify-between items-center">
      <span className="font-bold">회사 툴</span>
      {userEmail && (
        <div className="flex items-center space-x-4">
          <span className="text-sm">{userEmail}</span>
          <button
            className="bg-white text-indigo-600 px-2 py-1 rounded text-sm hover:bg-gray-200"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}