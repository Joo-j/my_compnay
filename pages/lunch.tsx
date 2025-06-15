import { useState } from "react";

const PLACES = [
  "김밥천국", "홍콩반점", "고기굽는마을", "죠스떡볶이", "맘스터치",
  "이삭토스트", "북촌손만두", "백채김치찌개", "육쌈냉면", "돈까스클럽",
  "삼겹살연구소", "서브웨이", "라면엔김밥", "버거킹", "마라탕연구소"
];

function getRandomPlace() {
  return PLACES[Math.floor(Math.random() * PLACES.length)];
}

export default function Lunch() {
  const [place, setPlace] = useState("");

  const draw = () => {
    setPlace(getRandomPlace());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center px-4 py-20">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">🍱 오늘의 점심 추천기</h1>
      <p className="mb-4 text-gray-600">점심 고민 그만하고, 오늘은 운명에 맡기자!</p>
      <button onClick={draw} className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg shadow">
        오늘의 맛집 뽑기 🎲
      </button>
      {place && (
        <div className="mt-8 text-2xl text-green-700 font-semibold">
          👉 오늘은 <span className="underline">{place}</span> 어때요?
        </div>
      )}
    </div>
  );
}