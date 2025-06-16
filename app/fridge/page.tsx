"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  expiryDate: string;
  quantity: number;
  location: string;
  color: string;
}

export default function FridgePage() {
  const [items, setItems] = useState<FoodItem[]>([
    {
      id: 1,
      name: "우유",
      category: "유제품",
      expiryDate: "2024-03-25",
      quantity: 1,
      location: "냉장실",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "사과",
      category: "과일",
      expiryDate: "2024-03-28",
      quantity: 5,
      location: "냉장실",
      color: "from-red-500 to-red-600",
    },
    {
      id: 3,
      name: "계란",
      category: "기타",
      expiryDate: "2024-04-01",
      quantity: 12,
      location: "냉장실",
      color: "from-yellow-500 to-yellow-600",
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    expiryDate: "",
    quantity: 1,
    location: "냉장실",
  });

  const [filter, setFilter] = useState({
    category: "",
    location: "",
    search: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category || !newItem.expiryDate) return;

    const colors = [
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-green-500 to-green-600",
      "from-indigo-500 to-indigo-600",
    ];

    const item: FoodItem = {
      id: items.length + 1,
      name: newItem.name,
      category: newItem.category,
      expiryDate: newItem.expiryDate,
      quantity: newItem.quantity,
      location: newItem.location,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setItems([...items, item]);
    setNewItem({
      name: "",
      category: "",
      expiryDate: "",
      quantity: 1,
      location: "냉장실",
    });
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    return (
      (filter.category === "" || item.category === filter.category) &&
      (filter.location === "" || item.location === filter.location) &&
      (filter.search === "" ||
        item.name.toLowerCase().includes(filter.search.toLowerCase()))
    );
  });

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryColor = (days: number) => {
    if (days < 0) return "text-red-500";
    if (days <= 3) return "text-orange-500";
    if (days <= 7) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
          냉장고 관리
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6">새로운 식품 추가</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  식품명
                </label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  placeholder="예: 우유, 사과, 계란"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="">선택하세요</option>
                    <option value="유제품">유제품</option>
                    <option value="과일">과일</option>
                    <option value="채소">채소</option>
                    <option value="육류">육류</option>
                    <option value="해산물">해산물</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    보관 위치
                  </label>
                  <select
                    value={newItem.location}
                    onChange={(e) =>
                      setNewItem({ ...newItem, location: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="냉장실">냉장실</option>
                    <option value="냉동실">냉동실</option>
                    <option value="실온">실온</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    유통기한
                  </label>
                  <input
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) =>
                      setNewItem({ ...newItem, expiryDate: e.target.value })
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    수량
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="input-field"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full theme-green">
                식품 추가하기
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">필터</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </label>
                  <select
                    value={filter.category}
                    onChange={(e) =>
                      setFilter({ ...filter, category: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="">전체</option>
                    <option value="유제품">유제품</option>
                    <option value="과일">과일</option>
                    <option value="채소">채소</option>
                    <option value="육류">육류</option>
                    <option value="해산물">해산물</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    보관 위치
                  </label>
                  <select
                    value={filter.location}
                    onChange={(e) =>
                      setFilter({ ...filter, location: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="">전체</option>
                    <option value="냉장실">냉장실</option>
                    <option value="냉동실">냉동실</option>
                    <option value="실온">실온</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  검색
                </label>
                <input
                  type="text"
                  value={filter.search}
                  onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                  }
                  placeholder="식품명으로 검색"
                  className="input-field"
                />
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {filteredItems.map((item) => {
                  const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.02 }}
                      className="card"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.category} • {item.location}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          삭제
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">수량</p>
                          <p className="font-medium">{item.quantity}개</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">유통기한</p>
                          <p
                            className={`font-medium ${getExpiryColor(
                              daysUntilExpiry
                            )}`}
                          >
                            {daysUntilExpiry < 0
                              ? "만료됨"
                              : `${daysUntilExpiry}일 남음`}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color}`}
                          style={{
                            width: `${Math.min(
                              (daysUntilExpiry / 30) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
