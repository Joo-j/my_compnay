"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: Date;
  likes: number;
  emojis: {
    [key: string]: number;
  };
}

const sampleTips: Tip[] = [
  {
    id: "1",
    title: "VSCode 생산성 향상 팁",
    content:
      "VSCode에서 자주 사용하는 단축키 모음입니다:\n1. Ctrl + P: 파일 검색\n2. Ctrl + Shift + P: 명령어 검색\n3. Alt + ↑/↓: 라인 이동",
    category: "개발",
    author: "김개발",
    createdAt: new Date(),
    likes: 15,
    emojis: {
      "👍": 10,
      "🎯": 5,
      "💡": 3,
    },
  },
  {
    id: "2",
    title: "효율적인 회의 진행법",
    content:
      "회의 시간을 절약하고 효율적으로 진행하는 방법:\n1. 명확한 아젠다 설정\n2. 시간 제한 설정\n3. 액션 아이템 기록",
    category: "업무",
    author: "이디자이너",
    createdAt: new Date(),
    likes: 12,
    emojis: {
      "👍": 8,
      "⏰": 4,
    },
  },
];

const categories = ["전체", "개발", "디자인", "업무", "생활", "기타"];
const emojis = ["👍", "🎯", "💡", "⏰", "🔥", "✨"];

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>(sampleTips);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [newTip, setNewTip] = useState({
    title: "",
    content: "",
    category: "개발",
  });

  const handleCreateTip = (e: React.FormEvent) => {
    e.preventDefault();
    const tip: Tip = {
      id: Date.now().toString(),
      ...newTip,
      author: "나",
      createdAt: new Date(),
      likes: 0,
      emojis: {},
    };

    setTips([tip, ...tips]);
    setNewTip({
      title: "",
      content: "",
      category: "개발",
    });
  };

  const handleLike = (tipId: string) => {
    setTips(
      tips.map((tip) =>
        tip.id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
      )
    );
  };

  const handleEmoji = (tipId: string, emoji: string) => {
    setTips(
      tips.map((tip) =>
        tip.id === tipId
          ? {
              ...tip,
              emojis: {
                ...tip.emojis,
                [emoji]: (tip.emojis[emoji] || 0) + 1,
              },
            }
          : tip
      )
    );
  };

  const filteredTips = tips.filter(
    (tip) => selectedCategory === "전체" || tip.category === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">이건 꼭 공유하고 싶었다</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 팁 작성 섹션 */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">새로운 팁 공유하기</h2>
              <form onSubmit={handleCreateTip} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    제목
                  </label>
                  <input
                    type="text"
                    value={newTip.title}
                    onChange={(e) =>
                      setNewTip({ ...newTip, title: e.target.value })
                    }
                    placeholder="팁 제목을 입력하세요"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    내용
                  </label>
                  <textarea
                    value={newTip.content}
                    onChange={(e) =>
                      setNewTip({ ...newTip, content: e.target.value })
                    }
                    placeholder="팁 내용을 입력하세요"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </label>
                  <select
                    value={newTip.category}
                    onChange={(e) =>
                      setNewTip({ ...newTip, category: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories
                      .filter((cat) => cat !== "전체")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  팁 공유하기
                </button>
              </form>
            </div>
          </div>

          {/* 팁 목록 섹션 */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">팁 목록</h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                {filteredTips.map((tip) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{tip.title}</h3>
                      <span className="text-sm text-gray-500">
                        {tip.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line mb-4">
                      {tip.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          작성자: {tip.author}
                        </span>
                        <span className="text-sm text-gray-500">
                          카테고리: {tip.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLike(tip.id)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          👍 {tip.likes}
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleEmoji(tip.id, emoji)}
                          className="text-2xl hover:scale-110 transition-transform"
                        >
                          {emoji}
                          {tip.emojis[emoji] && (
                            <span className="text-sm text-gray-500 ml-1">
                              {tip.emojis[emoji]}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
