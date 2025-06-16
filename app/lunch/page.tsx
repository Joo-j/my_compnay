"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Restaurant {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
}

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "맛있는 돈까스",
    category: "일식",
    distance: "도보 5분",
    rating: 4.5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    name: "신선한 초밥",
    category: "일식",
    distance: "도보 8분",
    rating: 4.8,
    reviews: 256,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "3",
    name: "맛있는 치킨",
    category: "치킨",
    distance: "도보 3분",
    rating: 4.3,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

export default function LunchPage() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinRoulette = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setSelectedRestaurant(restaurants[randomIndex]);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">오늘은 여기다</h1>

      <div className="flex flex-col items-center gap-8">
        <button
          onClick={spinRoulette}
          disabled={isSpinning}
          className={`px-8 py-4 text-xl font-bold rounded-full ${
            isSpinning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white transition-colors`}
        >
          {isSpinning ? "선택 중..." : "오늘의 점심 뽑기"}
        </button>

        {selectedRestaurant && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedRestaurant.name}
              </h2>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span>{selectedRestaurant.category}</span>
                <span>•</span>
                <span>{selectedRestaurant.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span className="font-bold">{selectedRestaurant.rating}</span>
                <span className="text-gray-500">
                  ({selectedRestaurant.reviews}개의 리뷰)
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">근처 맛집 목록</h2>
          <div className="grid gap-4">
            {restaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                whileHover={{ scale: 1.02 }}
                className="flex gap-4 bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{restaurant.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{restaurant.category}</span>
                    <span>•</span>
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">★</span>
                    <span>{restaurant.rating}</span>
                    <span className="text-gray-500">
                      ({restaurant.reviews})
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
