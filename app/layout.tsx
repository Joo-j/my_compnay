import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "우리 회사 앱",
  description: "회사 문화를 더 즐겁게 만드는 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100`}
      >
        <main className="min-h-screen bg-gray-50">{children}</main>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
