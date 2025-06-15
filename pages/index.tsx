import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">🚀 우리 회사 도우미</h1>
      <p className="text-gray-600 mb-6">비밀 피드, 로그인, 의견 공유까지!</p>
      <div className="space-x-4">
        <Link href="/secrets" className="px-6 py-3 bg-indigo-500 text-white rounded-xl shadow hover:bg-indigo-600 transition">
          비밀 피드
        </Link>
        <Link href="/login" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition">
          로그인
        </Link>
      </div>
    </div>
  );
}