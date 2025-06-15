import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
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
} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

export default function Secrets() {
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubUser = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubUser();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "secrets"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(newPosts);
    });
    return () => unsubscribe();
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

  const handleLike = async (postId: string) => {
    const ref = doc(db, "secrets", postId);
    await updateDoc(ref, { likes: increment(1) });
  };

  const handleCommentSubmit = async (postId: string) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    const ref = doc(db, "secrets", postId);
    const post = posts.find(p => p.id === postId);
    const newComment = [...(post.comments || []), commentText];
    await updateDoc(ref, { comments: newComment });
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">🔐 익명 비밀 피드</h1>
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <textarea
          className="w-full border p-2 rounded mb-2"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="비밀을 적어보세요..."
        />
        <button
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
          onClick={submitPost}
        >
          익명으로 공유하기
        </button>
      </div>
      <div className="mt-6 max-w-xl mx-auto space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow text-gray-700">
            <div className="mb-2">{post.text}</div>
            <div className="flex items-center space-x-4 text-sm">
              <button onClick={() => handleLike(post.id)} className="text-indigo-600 hover:underline">
                ❤️ 공감 {post.likes || 0}
              </button>
            </div>
            <div className="mt-3">
              <input
                className="w-full border p-1 rounded text-sm"
                placeholder="댓글 달기..."
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                className="mt-1 text-xs text-white bg-gray-600 px-2 py-1 rounded hover:bg-gray-700"
              >
                댓글 작성
              </button>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {(post.comments || []).map((cmt: string, idx: number) => (
                  <li key={idx} className="border-l-2 border-gray-300 pl-2">💬 {cmt}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}