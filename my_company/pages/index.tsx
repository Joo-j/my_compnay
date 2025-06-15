import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">회사 생활 도우미 🛠️</h1>
      <p className="text-gray-600 mb-6">회사에서 쓸 수 있는 유용하고 재밌는 기능 모음</p>
      <div className="space-y-4 w-full max-w-xs">
        <Link href="/secrets" className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded">🔐 익명 비밀 피드</Link>
        <Link href="/lunch" className="block w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">🍱 점심 추천 룰렛</Link>
        <Link href="/people" className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">🧑‍💼 팀원 소개</Link>
      </div>
    </div>
  );
}