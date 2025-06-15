import { useEffect, useState } from "react";
import { db, auth } from "../src/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { generateDailyNickname } from "../utils/nickname";

export default function Secrets() {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
    const q = query(collection(db, "secrets"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snap) =>
      setSecrets(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  const submit = async () => {
    if (!content.trim()) return;
    const nickname = generateDailyNickname(user?.uid || "anon");
    await addDoc(collection(db, "secrets"), {
      content,
      nickname,
      reacts: { 공감: 0, 나도겪음: 0, 팩트아님: 0 },
      comments: [],
      timestamp: Date.now()
    });
    setContent("");
  };

  const react = async (id, type) => {
    const postRef = doc(db, "secrets", id);
    const post = secrets.find(s => s.id === id);
    await updateDoc(postRef, {
      reacts: { ...post.reacts, [type]: post.reacts[type] + 1 }
    });
  };

  const comment = async (id) => {
    const text = prompt("댓글을 입력하세요");
    if (!text) return;
    const postRef = doc(db, "secrets", id);
    const entry = secrets.find(s => s.id === id);
    await updateDoc(postRef, { comments: [...entry.comments, text] });
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">📝 고인물의 속삭임</h1>
      {user ? (
        <div className="space-y-2">
          <textarea
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="비밀을 입력하세요..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button onClick={submit} className="bg-indigo-500 text-white px-4 py-2 rounded">작성</button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">로그인 후 작성할 수 있어요!</p>
      )}

      <div className="space-y-4">
        {secrets.map((s: any) => (
          <div key={s.id} className="border rounded p-4 bg-white shadow">
            <p className="text-gray-700 whitespace-pre-wrap">{s.content}</p>
            <p className="text-xs text-gray-400 mt-2">by {s.nickname}</p>
            <div className="text-sm mt-2 flex items-center gap-4 flex-wrap">
              <button onClick={() => react(s.id, "공감")} className="text-pink-500">👍 공감 ({s.reacts?.공감 ?? 0})</button>
              <button onClick={() => react(s.id, "나도겪음")} className="text-blue-500">😮 나도 겪음 ({s.reacts?.나도겪음 ?? 0})</button>
              <button onClick={() => react(s.id, "팩트아님")} className="text-yellow-600">❌ 팩트 아님 ({s.reacts?.팩트아님 ?? 0})</button>
              <button onClick={() => comment(s.id)} className="text-gray-700">💬 댓글 ({s.comments.length})</button>
            </div>
            {s.comments.length > 0 && (
              <ul className="mt-2 pl-4 list-disc text-sm text-gray-600">
                {s.comments.map((c: any, i: number) => <li key={i}>{c}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}