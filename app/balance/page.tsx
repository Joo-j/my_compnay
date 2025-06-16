"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BalanceItem {
  id: number;
  category: string;
  workScore: number;
  lifeScore: number;
  color: string;
}

export default function BalancePage() {
  const [items, setItems] = useState<BalanceItem[]>([
    {
      id: 1,
      category: "업무 시간",
      workScore: 8,
      lifeScore: 2,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      category: "스트레스",
      workScore: 7,
      lifeScore: 3,
      color: "from-red-500 to-red-600",
    },
    {
      id: 3,
      category: "만족도",
      workScore: 6,
      lifeScore: 4,
      color: "from-green-500 to-green-600",
    },
  ]);

  const [newItem, setNewItem] = useState({
    category: "",
    workScore: 5,
    lifeScore: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.category) return;

    const colors = [
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-yellow-500 to-yellow-600",
      "from-indigo-500 to-indigo-600",
    ];

    const item: BalanceItem = {
      id: items.length + 1,
      category: newItem.category,
      workScore: newItem.workScore,
      lifeScore: newItem.lifeScore,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setItems([...items, item]);
    setNewItem({ category: "", workScore: 5, lifeScore: 5 });
  };

  const handleScoreChange = (
    id: number,
    type: "work" | "life",
    value: number
  ) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              workScore: type === "work" ? value : item.workScore,
              lifeScore: type === "life" ? value : item.lifeScore,
            }
          : item
      )
    );
  };

  const getBalanceEmoji = (workScore: number, lifeScore: number) => {
    const diff = workScore - lifeScore;
    if (diff > 3) return "😫";
    if (diff > 1) return "😔";
    if (diff < -3) return "🎉";
    if (diff < -1) return "😊";
    return "😌";
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
          업무 밸런스 게임
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6">새로운 항목 추가</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리
                </label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  placeholder="예: 업무 시간, 스트레스, 만족도"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    업무 점수
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={newItem.workScore}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        workScore: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="text-center mt-1">{newItem.workScore}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    삶의 점수
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={newItem.lifeScore}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        lifeScore: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="text-center mt-1">{newItem.lifeScore}</div>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full theme-indigo">
                항목 추가하기
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{item.category}</h3>
                  <span className="text-2xl">
                    {getBalanceEmoji(item.workScore, item.lifeScore)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      업무 점수
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={item.workScore}
                      onChange={(e) =>
                        handleScoreChange(
                          item.id,
                          "work",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                    <div className="text-center mt-1">{item.workScore}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      삶의 점수
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={item.lifeScore}
                      onChange={(e) =>
                        handleScoreChange(
                          item.id,
                          "life",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                    <div className="text-center mt-1">{item.lifeScore}</div>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color}`}
                    style={{
                      width: `${
                        (item.workScore / (item.workScore + item.lifeScore)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
