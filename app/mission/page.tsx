"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  createdAt: Date;
  createdBy: string;
  completedBy: string[];
}

interface User {
  id: string;
  name: string;
  points: number;
  completedMissions: string[];
}

const sampleMissions: Mission[] = [
  {
    id: "1",
    title: "커피 한 잔의 여유",
    description: "동료와 함께 커피 한 잔 마시며 대화하기",
    points: 10,
    difficulty: "easy",
    category: "소통",
    createdAt: new Date(),
    createdBy: "김개발",
    completedBy: [],
  },
  {
    id: "2",
    title: "코드 리뷰 마스터",
    description: "하루에 3개 이상의 코드 리뷰 작성하기",
    points: 30,
    difficulty: "hard",
    category: "개발",
    createdAt: new Date(),
    createdBy: "이디자이너",
    completedBy: [],
  },
  {
    id: "3",
    title: "점심 메뉴 추천왕",
    description: "팀원들과 함께 새로운 점심 메뉴 추천하기",
    points: 20,
    difficulty: "medium",
    category: "팀워크",
    createdAt: new Date(),
    createdBy: "박기획",
    completedBy: [],
  },
];

const sampleUsers: User[] = [
  {
    id: "1",
    name: "김개발",
    points: 150,
    completedMissions: [],
  },
  {
    id: "2",
    name: "이디자이너",
    points: 120,
    completedMissions: [],
  },
  {
    id: "3",
    name: "박기획",
    points: 200,
    completedMissions: [],
  },
];

const categories = ["전체", "개발", "디자인", "기획", "소통", "팀워크"];
const difficulties = ["easy", "medium", "hard"];

export default function MissionPage() {
  const [missions, setMissions] = useState<Mission[]>(sampleMissions);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [newMission, setNewMission] = useState({
    title: "",
    description: "",
    points: 10,
    difficulty: "easy" as "easy" | "medium" | "hard",
    category: "개발",
  });

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    const mission: Mission = {
      id: Date.now().toString(),
      ...newMission,
      createdAt: new Date(),
      createdBy: "나",
      completedBy: [],
    };

    setMissions([mission, ...missions]);
    setNewMission({
      title: "",
      description: "",
      points: 10,
      difficulty: "easy",
      category: "개발",
    });
  };

  const handleCompleteMission = (missionId: string, userId: string) => {
    setMissions(
      missions.map((mission) =>
        mission.id === missionId
          ? { ...mission, completedBy: [...mission.completedBy, userId] }
          : mission
      )
    );

    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              points:
                user.points + missions.find((m) => m.id === missionId)!.points,
              completedMissions: [...user.completedMissions, missionId],
            }
          : user
      )
    );
  };

  const filteredMissions = missions.filter((mission) => {
    if (selectedCategory !== "전체" && mission.category !== selectedCategory) {
      return false;
    }
    if (selectedDifficulty && mission.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">사내 미션 배틀</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 미션 생성 섹션 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">새로운 미션 만들기</h2>
              <form onSubmit={handleCreateMission} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    미션 제목
                  </label>
                  <input
                    type="text"
                    value={newMission.title}
                    onChange={(e) =>
                      setNewMission({ ...newMission, title: e.target.value })
                    }
                    placeholder="미션 제목을 입력하세요"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    미션 설명
                  </label>
                  <textarea
                    value={newMission.description}
                    onChange={(e) =>
                      setNewMission({
                        ...newMission,
                        description: e.target.value,
                      })
                    }
                    placeholder="미션 설명을 입력하세요"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </label>
                  <select
                    value={newMission.category}
                    onChange={(e) =>
                      setNewMission({ ...newMission, category: e.target.value })
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    난이도
                  </label>
                  <select
                    value={newMission.difficulty}
                    onChange={(e) =>
                      setNewMission({
                        ...newMission,
                        difficulty: e.target.value as
                          | "easy"
                          | "medium"
                          | "hard",
                      })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty === "easy"
                          ? "쉬움"
                          : difficulty === "medium"
                          ? "보통"
                          : "어려움"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    포인트
                  </label>
                  <input
                    type="number"
                    value={newMission.points}
                    onChange={(e) =>
                      setNewMission({
                        ...newMission,
                        points: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  미션 생성하기
                </button>
              </form>
            </div>
          </div>

          {/* 미션 목록 섹션 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">미션 목록</h2>
                <div className="flex gap-4">
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
                  <select
                    value={selectedDifficulty || ""}
                    onChange={(e) =>
                      setSelectedDifficulty(e.target.value || null)
                    }
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">전체 난이도</option>
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty === "easy"
                          ? "쉬움"
                          : difficulty === "medium"
                          ? "보통"
                          : "어려움"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                {filteredMissions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{mission.title}</h3>
                        <p className="text-gray-600">{mission.description}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            mission.difficulty === "easy"
                              ? "bg-green-100 text-green-800"
                              : mission.difficulty === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {mission.difficulty === "easy"
                            ? "쉬움"
                            : mission.difficulty === "medium"
                            ? "보통"
                            : "어려움"}
                        </span>
                        <div className="mt-1 text-blue-600 font-bold">
                          {mission.points} 포인트
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">
                        생성자: {mission.createdBy}
                      </span>
                      <button
                        onClick={() => handleCompleteMission(mission.id, "1")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        미션 완료
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 랭킹 섹션 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">포인트 랭킹</h2>
              <div className="space-y-4">
                {sortedUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          index === 0
                            ? "bg-yellow-400"
                            : index === 1
                            ? "bg-gray-300"
                            : index === 2
                            ? "bg-yellow-600"
                            : "bg-gray-200"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="font-bold">{user.name}</span>
                    </div>
                    <span className="text-blue-600 font-bold">
                      {user.points} 포인트
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
