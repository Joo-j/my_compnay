import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">🚀 회사 생활 도우미 메인</h1>
      <Link href="/secrets" className="px-4 py-2 bg-indigo-500 text-white rounded">비밀 피드 바로가기</Link>
    </div>
  );
}