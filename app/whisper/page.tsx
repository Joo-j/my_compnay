"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Whisper {
  id: number;
  content: string;
  nickname: string;
  likes: number;
  timestamp: string;
}

export default function WhisperPage() {
  const [whispers, setWhispers] = useState<Whisper[]>([
    {
      id: 1,
      content: "오늘 회의 너무 길었어요...",
      nickname: "익명의 고인물",
      likes: 15,
      timestamp: "10분 전",
    },
    {
      id: 2,
      content: "사무실 냉장고 정리 좀 해주세요",
      nickname: "냉장고 관리자",
      likes: 8,
      timestamp: "30분 전",
    },
  ]);

  const [newWhisper, setNewWhisper] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWhisper.trim()) return;

    const newPost: Whisper = {
      id: whispers.length + 1,
      content: newWhisper,
      nickname: `익명의 고인물 ${Math.floor(Math.random() * 1000)}`,
      likes: 0,
      timestamp: "방금 전",
    };

    setWhispers([newPost, ...whispers]);
    setNewWhisper("");
  };

  const handleLike = (id: number) => {
    setWhispers(
      whispers.map((whisper) =>
        whisper.id === id ? { ...whisper, likes: whisper.likes + 1 } : whisper
      )
    );
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
          고인물의 속삭임
        </h1>

        <motion.form
          onSubmit={handleSubmit}
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            value={newWhisper}
            onChange={(e) => setNewWhisper(e.target.value)}
            placeholder="무슨 생각을 하고 계신가요?"
            className="input-field min-h-[100px] mb-4"
          />
          <button type="submit" className="btn-primary w-full theme-purple">
            속삭이기
          </button>
        </motion.form>

        <div className="space-y-4">
          <AnimatePresence>
            {whispers.map((whisper) => (
              <motion.div
                key={whisper.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="card hover:scale-[1.02] transition-transform"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-purple-600">
                    {whisper.nickname}
                  </span>
                  <span className="text-sm text-gray-500">
                    {whisper.timestamp}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{whisper.content}</p>
                <button
                  onClick={() => handleLike(whisper.id)}
                  className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors"
                >
                  <span>👍</span>
                  <span>{whisper.likes}</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
