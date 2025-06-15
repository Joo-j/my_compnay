import Link from "next/link";

export default function Home() {
  const features = [
    { title: "🔐 로그인 / 회원가입", path: "/login" },
    { title: "📢 고인물의 속삭임 (비밀 피드)", path: "/feed" },
    { title: "🎲 오늘은 여기다 (맛집 뽑기)", path: "/lunch" },
    { title: "🧠 누구냐 넌 (직원 맞히기 퀴즈)", path: "/quiz" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">🎉 회사 전용 Fun App 모음</h1>
      <div className="w-full max-w-md space-y-4">
        {features.map(({ title, path }) => (
          <Link key={path} href={path}>
            <div className="bg-white p-4 rounded shadow hover:bg-blue-50 cursor-pointer border border-gray-200">
              <span className="text-lg text-gray-800">{title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}