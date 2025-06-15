import { useState } from 'react';
import { auth } from '../src/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (!email.includes('@') || !email.includes('.')) {
      alert("📧 이메일 형식이 올바르지 않아요!");
      return;
    }

    try {
      if (signup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-xl font-bold mb-4">{signup ? "회원가입" : "로그인"}</h1>
      <input className="border p-2 mb-2 w-64" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 mb-2 w-64" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-indigo-500 text-white px-4 py-2 rounded w-64" onClick={submit}>
        {signup ? "회원가입" : "로그인"}
      </button>
      <button className="mt-2 text-sm underline text-blue-700" onClick={() => setSignup(!signup)}>
        {signup ? "이미 계정이 있어요" : "계정이 없어요"}
      </button>
    </div>
  );
}