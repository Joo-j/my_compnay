import AppHeader from "../components/AppHeader";
import Image from "next/image";

const navItems = [
  { title: "📢 고인물의 속삭임", href: "/feed" },
  { title: "🍜 오늘은 여기다", href: "/lunch" },
  { title: "❓ 누구냐 넌", href: "/quiz" },
  { title: "🎧 지금 너무 조용해", href: "/noise" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white flex">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">🧭 기능 메뉴</h2>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="block hover:bg-gray-700 px-3 py-2 rounded">{item.title}</a>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <div className="flex flex-1 items-center justify-center">
          <Image
            src="/main_image.png"
            alt="Supercent Logo"
            width={512}
            height={200}
            className="w-auto h-auto max-w-md"
          />
        </div>
      </div>
    </div>
  );
}