"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Joke {
  id: number;
  content: string;
  author: string;
  votes: number;
  timestamp: string;
}

export default function MeetingPage() {
  const [jokes, setJokes] = useState<Joke[]>([
    {
      id: 1,
      content: "이건 좀 더 생각해봐야 할 것 같아요...",
      author: "김철수",
      votes: 15,
      timestamp: "10분 전",
    },
    {
      id: 2,
      content: "우리 모두가 원하는 방향으로 가고 있습니다!",
      author: "이영희",
      votes: 8,
      timestamp: "30분 전",
    },
  ]);

  const [newJoke, setNewJoke] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJoke.trim()) return;

    const joke: Joke = {
      id: jokes.length + 1,
      content: newJoke,
      author: "익명의 회의러",
      votes: 0,
      timestamp: "방금 전",
    };

    setJokes([joke, ...jokes]);
    setNewJoke("");
  };

  const handleVote = (id: number) => {
    setJokes(
      jokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + 1 } : joke
      )
    );
  };

  const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
          오늘의 회의 드립 랭킹
        </h1>

        <motion.form
          onSubmit={handleSubmit}
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            value={newJoke}
            onChange={(e) => setNewJoke(e.target.value)}
            placeholder="오늘 회의에서 들은 드립을 공유해보세요!"
            className="input-field min-h-[100px] mb-4"
          />
          <button type="submit" className="btn-primary w-full theme-red">
            드립 공유하기
          </button>
        </motion.form>

        <div className="space-y-4">
          <AnimatePresence>
            {sortedJokes.map((joke, index) => (
              <motion.div
                key={joke.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="card hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-red-600">
                        {joke.author}
                      </span>
                      <span className="text-sm text-gray-500">
                        {joke.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{joke.content}</p>
                    <button
                      onClick={() => handleVote(joke.id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <span>😂</span>
                      <span>{joke.votes}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
