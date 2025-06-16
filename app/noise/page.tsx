"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NoiseLevel {
  id: string;
  level: number;
  timestamp: Date;
  location: string;
}

export default function NoisePage() {
  const [noiseLevel, setNoiseLevel] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("측정 대기 중...");
  const [noiseHistory, setNoiseHistory] = useState<NoiseLevel[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isListening) {
      interval = setInterval(() => {
        // 실제 구현에서는 마이크 입력을 받아와야 합니다
        const randomNoise = Math.floor(Math.random() * 100);
        setNoiseLevel(randomNoise);

        if (randomNoise < 30) {
          setStatus("너무 조용해요... 😴");
        } else if (randomNoise < 70) {
          setStatus("적당한 소음이에요! 😊");
        } else {
          setStatus("너무 시끄러워요! 🤫");
        }

        // 소음 레벨 기록
        setNoiseHistory((prev) => [
          {
            id: Date.now().toString(),
            level: randomNoise,
            timestamp: new Date(),
            location: "내 위치",
          },
          ...prev.slice(0, 9),
        ]);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening]);

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setStatus("측정 중...");
    } else {
      setStatus("측정 대기 중...");
      setNoiseLevel(0);
    }
  };

  const getNoiseColor = (level: number) => {
    if (level < 30) return "from-green-500 to-green-600";
    if (level < 70) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getNoiseLevelColor = (level: number) => {
    if (level < 30) return "bg-green-500";
    if (level < 60) return "bg-yellow-500";
    if (level < 80) return "bg-orange-500";
    return "bg-red-500";
  };

  const getNoiseLevelText = (level: number) => {
    if (level < 30) return "매우 조용함";
    if (level < 60) return "적당함";
    if (level < 80) return "시끄러움";
    return "매우 시끄러움";
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
          지금 너무 조용해
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 소음 레벨 섹션 */}
          <div className="md:col-span-2">
            <div className="card">
              <div className="text-center mb-8">
                <motion.div
                  animate={{
                    scale: isListening ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isListening ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${getNoiseColor(
                    noiseLevel
                  )} flex items-center justify-center text-white text-4xl font-bold mb-4`}
                >
                  {noiseLevel}dB
                </motion.div>
                <p className="text-xl font-medium text-gray-700">{status}</p>
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToggleListening}
                  className={`btn-primary ${
                    isListening ? "theme-red" : "theme-green"
                  }`}
                >
                  {isListening ? "측정 중지" : "소음 측정 시작"}
                </motion.button>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">소음 레벨 가이드</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>30dB 미만: 너무 조용함</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span>30-70dB: 적정 소음</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>70dB 이상: 너무 시끄러움</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 소음 기록 섹션 */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">소음 레벨 기록</h2>
            <div className="space-y-4">
              {noiseHistory.map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${getNoiseColor(
                        record.level
                      )}`}
                    />
                    <span>{record.location}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {Math.round(record.level)}dB
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
