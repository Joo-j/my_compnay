import { useEffect, useState } from "react";
import { db, auth } from "../src/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";

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
    await addDoc(collection(db, "secrets"), {
      content,
      email: user?.email || "익명",
      likes: 0,
      comments: [],
      timestamp: Date.now()
    });
    setContent("");
  };

  const like = async (id, current) => {
    await updateDoc(doc(db, "secrets", id), { likes: current + 1 });
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
      <h1 className="text-2xl font-bold">📝 비밀 피드</h1>
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
            <p className="text-xs text-gray-400 mt-2">by {s.email}</p>
            <div className="text-sm mt-2 flex items-center gap-4">
              <button onClick={() => like(s.id, s.likes)} className="text-pink-500">❤️ {s.likes}</button>
              <button onClick={() => comment(s.id)} className="text-blue-500">💬 댓글 ({s.comments.length})</button>
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