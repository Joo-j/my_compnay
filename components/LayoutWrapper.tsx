import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="p-4">
        <button
          onClick={() => router.push("/")}
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← 뒤로가기
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}