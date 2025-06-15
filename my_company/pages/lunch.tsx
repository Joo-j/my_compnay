import { useState } from 'react';

const lunchPlaces = ["국밥집", "마라탕", "카페 샌드위치", "초밥", "김치찌개", "버거", "파스타", "쌀국수"];

export default function Lunch() {
  const [choice, setChoice] = useState('');

  const pickRandom = () => {
    const random = lunchPlaces[Math.floor(Math.random() * lunchPlaces.length)];
    setChoice(random);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">🍱 점심 추천 룰렛</h1>
      <button
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 mb-6"
        onClick={pickRandom}
      >
        오늘 뭐 먹지?
      </button>
      {choice && <div className="text-2xl text-green-700">{choice} 어때요?</div>}
    </div>
  );
}