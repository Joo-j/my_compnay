import AppHeader from "../components/AppHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white">
      <AppHeader />
      <main className="p-8">
        <h1 className="text-2xl font-bold">🎉 Supercent 사내 앱 홈</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">왼쪽 메뉴에서 기능을 선택하세요.</p>
      </main>
    </div>
  );
}