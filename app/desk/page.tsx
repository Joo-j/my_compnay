"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DeskPost {
  id: string;
  image: string;
  mood: string;
  description: string;
  author: string;
  likes: number;
  createdAt: Date;
}

const samplePosts: DeskPost[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    mood: "😊",
    description: "오늘은 날씨가 좋아서 기분이 좋아요!",
    author: "김개발",
    likes: 15,
    createdAt: new Date(),
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    mood: "😴",
    description: "커피가 필요한 순간...",
    author: "이디자이너",
    likes: 8,
    createdAt: new Date(),
  },
];

const moods = ["😊", "😴", "😎", "🤔", "😤", "🥳", "😭", "😡"];

export default function DeskPage() {
  const [posts, setPosts] = useState<DeskPost[]>(samplePosts);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState("😊");
  const [description, setDescription] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage || !description.trim()) return;

    const post: DeskPost = {
      id: Date.now().toString(),
      image: selectedImage,
      mood: selectedMood,
      description,
      author: "나",
      likes: 0,
      createdAt: new Date(),
    };

    setPosts([post, ...posts]);
    setSelectedImage(null);
    setDescription("");
  };

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">내 자리에서 본 풍경</h1>

        {/* 새로운 포스트 작성 폼 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">새로운 풍경 공유하기</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이미지 업로드
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {selectedImage && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                오늘의 기분
              </label>
              <div className="flex gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    className={`text-2xl p-2 rounded-lg ${
                      selectedMood === mood
                        ? "bg-blue-100 ring-2 ring-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                한줄 설명
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="오늘의 기분을 한줄로 표현해보세요"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              공유하기
            </button>
          </form>
        </div>

        {/* 포스트 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative aspect-video">
                <img
                  src={post.image}
                  alt="Desk view"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{post.mood}</span>
                    <span className="font-bold">{post.author}</span>
                  </div>
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
                  >
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                </div>
                <p className="text-gray-700">{post.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {post.createdAt.toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
