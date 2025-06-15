import { useState } from "react";
import { auth } from "../src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const onLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      router.push("/");
    } catch (err) {
      alert((err as any).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-xl font-bold mb-4">🔐 로그인</h1>
      <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2 rounded w-64" />
      <input type="password" placeholder="비밀번호" value={pw} onChange={e => setPw(e.target.value)} className="border p-2 mb-4 rounded w-64" />
      <button onClick={onLogin} className="px-4 py-2 bg-blue-500 text-white rounded">로그인</button>
    </div>
  );
}