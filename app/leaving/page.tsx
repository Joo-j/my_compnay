"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Prediction {
  id: number;
  time: string;
  reason: string;
  votes: number;
  timestamp: string;
}

export default function LeavingPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: 1,
      time: "18:00",
      reason: "정시 퇴근!",
      votes: 15,
      timestamp: "10분 전",
    },
    {
      id: 2,
      time: "20:00",
      reason: "회의가 길어질 것 같아요...",
      votes: 8,
      timestamp: "30분 전",
    },
  ]);

  const [newPrediction, setNewPrediction] = useState({
    time: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrediction.time || !newPrediction.reason) return;

    const prediction: Prediction = {
      id: predictions.length + 1,
      time: newPrediction.time,
      reason: newPrediction.reason,
      votes: 0,
      timestamp: "방금 전",
    };

    setPredictions([prediction, ...predictions]);
    setNewPrediction({ time: "", reason: "" });
  };

  const handleVote = (id: number) => {
    setPredictions(
      predictions.map((prediction) =>
        prediction.id === id
          ? { ...prediction, votes: prediction.votes + 1 }
          : prediction
      )
    );
  };

  const sortedPredictions = [...predictions].sort((a, b) => b.votes - a.votes);

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          오늘의 퇴근 예언
        </h1>

        <motion.form
          onSubmit={handleSubmit}
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                예상 퇴근 시간
              </label>
              <input
                type="time"
                value={newPrediction.time}
                onChange={(e) =>
                  setNewPrediction({ ...newPrediction, time: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                예상 이유
              </label>
              <input
                type="text"
                value={newPrediction.reason}
                onChange={(e) =>
                  setNewPrediction({ ...newPrediction, reason: e.target.value })
                }
                placeholder="퇴근 시간 예상 이유"
                className="input-field"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full theme-yellow">
            예언하기
          </button>
        </motion.form>

        <div className="space-y-4">
          {sortedPredictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xl">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl font-bold text-yellow-600">
                      {prediction.time}
                    </span>
                    <span className="text-sm text-gray-500">
                      {prediction.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{prediction.reason}</p>
                  <button
                    onClick={() => handleVote(prediction.id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-yellow-600 transition-colors"
                  >
                    <span>⏰</span>
                    <span>{prediction.votes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
