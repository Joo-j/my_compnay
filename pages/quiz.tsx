import { useEffect, useState } from "react";

interface Quiz {
  nickname: string;
  hint: string;
  answer: string;
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch("/data/quiz.json")
      .then(res => res.json())
      .then(data => {
        const today = new Date().getDate();
        const selected = data[today % data.length];
        setQuiz(selected);
      });
  }, []);

  const checkAnswer = () => {
    if (!quiz) return;
    if (userAnswer.trim() === quiz.answer) {
      setFeedback("🎉 정답입니다! 오늘도 누군가를 더 알게 되었어요!");
    } else {
      setFeedback("❌ 틀렸어요! 다시 한 번 생각해보세요!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center space-y-6">
      <h1 className="text-2xl font-bold text-indigo-600">👤 오늘의 사원 맞히기 퀴즈</h1>
      {quiz && (
        <>
          <p className="text-lg font-medium">“{quiz.nickname}”</p>
          <p className="text-sm text-gray-500">힌트: {quiz.hint}</p>

          <input
            className="border p-2 rounded w-full"
            placeholder="누굴까요?"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button
            onClick={checkAnswer}
            className="bg-indigo-500 text-white px-4 py-2 rounded shadow"
          >
            정답 확인
          </button>
          {feedback && <p className="mt-2 text-lg">{feedback}</p>}
        </>
      )}
    </div>
  );
}