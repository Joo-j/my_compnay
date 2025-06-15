import Link from "next/link";
import Image from "next/image";

const navItems = [
  { title: "📢 비밀 피드", href: "/feed" },
  { title: "🎲 점심 룰렛", href: "/lunch" },
  { title: "🧠 직원 퀴즈", href: "/quiz" },
  { title: "🎧 소리 측정기", href: "/noise" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">🧭 기능 메뉴</h2>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">{item.title}</div>
          </Link>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 relative">
        <Link href="/login">
          <div className="absolute top-4 right-4 text-blue-600 hover:underline font-medium">
            🔐 로그인 / 회원가입
          </div>
        </Link>
        <div className="max-w-sm w-full px-4">
          <Image
            src="/supercent-logo.png"
            alt="Supercent Logo"
            width={512}
            height={200}
            className="w-full h-auto mx-auto"
          />
        </div>
      </div>
    </div>
  );
}