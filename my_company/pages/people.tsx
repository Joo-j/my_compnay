const people = [
  { name: "박민수", role: "백엔드 개발자", mbti: "INTJ", skill: "NestJS" },
  { name: "이서연", role: "디자이너", mbti: "INFP", skill: "Figma" },
  { name: "정유진", role: "프론트엔드", mbti: "ENTP", skill: "React" }
];

export default function People() {
  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🧑‍💼 팀원 소개</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {people.map((p, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.role} | {p.mbti}</p>
            <p className="mt-2 text-sm text-indigo-600">주요 기술: {p.skill}</p>
          </div>
        ))}
      </div>
    </div>
  );
}