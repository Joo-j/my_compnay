import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
      <div className="p-4">
        <button onClick={() => router.push("/")} className="inline-flex items-center space-x-2 hover:opacity-80">
          <img src="/arrow-left.svg" alt="뒤로가기" className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}