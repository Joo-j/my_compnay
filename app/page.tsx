"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "업무 밸런스 게임",
    icon: "⚖️",
    color: "bg-gradient-to-r from-blue-100 to-blue-200",
    href: "/balance",
  },
  {
    id: 2,
    title: "냉장고",
    icon: "❄️",
    color: "bg-gradient-to-r from-green-100 to-green-200",
    href: "/fridge",
  },
  {
    id: 3,
    title: "지금 너무 조용해",
    icon: "🔊",
    color: "bg-gradient-to-r from-purple-100 to-purple-200",
    href: "/noise",
  },
  {
    id: 4,
    title: "오늘의 회의 드립 랭킹",
    icon: "😄",
    color: "bg-gradient-to-r from-yellow-100 to-yellow-200",
    href: "/meeting",
  },
  {
    id: 5,
    title: "오늘의 퇴근 예언",
    icon: "🔮",
    color: "bg-gradient-to-r from-red-100 to-red-200",
    href: "/leaving",
  },
  {
    id: 6,
    title: "내 자리 찾기",
    icon: "💺",
    color: "bg-gradient-to-r from-indigo-100 to-indigo-200",
    href: "/desk",
  },
  {
    id: 7,
    title: "커피 머신",
    icon: "☕",
    color: "bg-gradient-to-r from-orange-100 to-orange-200",
    href: "/coffee",
  },
  {
    id: 8,
    title: "점심 메뉴",
    icon: "🍱",
    color: "bg-gradient-to-r from-pink-100 to-pink-200",
    href: "/lunch",
  },
  {
    id: 9,
    title: "화장실",
    icon: "🚻",
    color: "bg-gradient-to-r from-teal-100 to-teal-200",
    href: "/toilet",
  },
  {
    id: 10,
    title: "회의실",
    icon: "🏢",
    color: "bg-gradient-to-r from-cyan-100 to-cyan-200",
    href: "/meeting-room",
  },
  {
    id: 11,
    title: "사무용품",
    icon: "📎",
    color: "bg-gradient-to-r from-emerald-100 to-emerald-200",
    href: "/supplies",
  },
  {
    id: 12,
    title: "복사기",
    icon: "🖨️",
    color: "bg-gradient-to-r from-violet-100 to-violet-200",
    href: "/printer",
  },
  {
    id: 13,
    title: "주차장",
    icon: "🅿️",
    color: "bg-gradient-to-r from-amber-100 to-amber-200",
    href: "/parking",
  },
  {
    id: 14,
    title: "건물 관리",
    icon: "🏗️",
    color: "bg-gradient-to-r from-rose-100 to-rose-200",
    href: "/building",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        >
          우리 회사 앱
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="show"
          className="space-y-3 max-w-xl"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.id * 0.1 }}
            >
              <Link href={feature.href}>
                <div
                  className={`${feature.color} rounded-xl p-4 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold">{feature.title}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
