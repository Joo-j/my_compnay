"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function QuizPage() {
  const [questions] = useState<Question[]>([
    {
      id: 1,
      question: "이 사람은 누구일까요?",
      options: ["김철수", "이영희", "박지성", "최민수"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "이 사람의 직책은?",
      options: ["개발자", "디자이너", "기획자", "마케터"],
      correctAnswer: 0,
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
          누구냐 넌?
        </h1>

        <div className="card">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">
                    문제 {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <span className="text-blue-600 font-medium">
                    점수: {score}점
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-6">
                  {questions[currentQuestionIndex].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-lg transition-colors ${
                          selectedAnswer === index
                            ? index ===
                              questions[currentQuestionIndex].correctAnswer
                              ? "bg-green-100 border-2 border-green-500"
                              : "bg-red-100 border-2 border-red-500"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        disabled={selectedAnswer !== null}
                      >
                        {option}
                      </motion.button>
                    )
                  )}
                </div>

                {selectedAnswer !== null && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleNextQuestion}
                    className="btn-primary theme-blue w-full mt-6"
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "다음 문제"
                      : "결과 보기"}
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-8"
              >
                <h2 className="text-3xl font-bold mb-4">퀴즈 결과</h2>
                <p className="text-2xl mb-6">
                  총 {questions.length}문제 중 {score}문제 맞추셨습니다!
                </p>
                <div className="text-4xl mb-6">
                  {score === questions.length ? "🎉" : "😊"}
                </div>
                <button
                  onClick={handleRestart}
                  className="btn-primary theme-blue"
                >
                  다시 시작하기
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
