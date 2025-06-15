import { useEffect, useState } from 'react';
import { db, auth } from '../src/firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Secrets() {
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "secrets"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const submitPost = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "secrets"), {
      text: input.trim(),
      userId,
      timestamp: serverTimestamp(),
      likes: 0,
      comments: []
    });
    setInput('');
  };

  const like = async (id: string) => {
    const ref = doc(db, "secrets", id);
    await updateDoc(ref, { likes: increment(1) });
  };

  const comment = async (id: string) => {
    const text = commentInputs[id];
    if (!text?.trim()) return;
    const ref = doc(db, "secrets", id);
    const post = posts.find(p => p.id === id);
    await updateDoc(ref, { comments: [...(post.comments || []), text.trim()] });
    setCommentInputs({ ...commentInputs, [id]: '' });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔐 익명 비밀 피드</h1>
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="비밀을 작성해보세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="w-full bg-indigo-500 text-white py-2 rounded" onClick={submitPost}>
        익명 작성
      </button>
      <div className="mt-6 space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow p-4 rounded">
            <div>{post.text}</div>
            <div className="text-sm mt-2 flex gap-4 items-center">
              <button onClick={() => like(post.id)}>❤️ {post.likes}</button>
            </div>
            <div className="mt-2">
              <input
                className="border p-1 w-full"
                placeholder="댓글 입력..."
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
              />
              <button className="text-xs mt-1 bg-gray-700 text-white px-2 py-1 rounded" onClick={() => comment(post.id)}>
                댓글 작성
              </button>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {(post.comments || []).map((c: string, i: number) => (
                  <li key={i}>💬 {c}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}