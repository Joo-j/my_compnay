"use client";

import { useState, useEffect } from "react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  spicy: boolean;
  vegetarian: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
  address: string;
  phone: string;
  openingHours: string;
  priceRange: "저렴" | "보통" | "고급";
  menus: MenuItem[];
  tags: string[];
  isFavorite: boolean;
  timeRequired?: string;
  applePay?: boolean;
  companyDiscount?: boolean;
  notes?: string;
  userReviews?: string[];
}

// 임시로 데이터를 직접 정의 (나중에 API로 변경 가능)
const sampleRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "호석촌",
    category: "한식",
    distance: "석촌호수 서호 (석촌역 방향)",
    rating: 5.0,
    reviews: 3,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    address: "석촌호수 서호 (석촌역 방향)",
    phone: "02-1234-5678",
    openingHours: "11:00 - 21:00",
    priceRange: "보통",
    menus: [
      { id: "1-1", name: "순대국", price: 10000, description: "기본 순대국", spicy: false, vegetarian: false },
      { id: "1-2", name: "순대국 특", price: 12000, description: "특별 순대국", spicy: false, vegetarian: false }
    ],
    tags: ["인기", "편육", "정식", "빨간 국물", "하얀 국물"],
    isFavorite: false,
    timeRequired: "15-20분",
    applePay: false,
    companyDiscount: false,
    notes: "편육도 같이먹을 수 있는 정식 강추. 기본이 빨간 국물. 하얀 국물로 시킬 수도 있어요",
    userReviews: [
      "로완 : 호석촌 덕분에 회사 다닐 맛이 난다.",
      "쵸파 : 이장우? 다시 보인다",
      "아리 : 국물이 깊고 진한 스타일의 국밥"
    ]
  },
  {
    id: "2",
    name: "서보",
    category: "태국",
    distance: "송리단길",
    rating: 5.0,
    reviews: 1,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    address: "송리단길",
    phone: "02-2345-6789",
    openingHours: "11:00 - 22:00",
    priceRange: "보통",
    menus: [
      { id: "2-1", name: "태국음식", price: 0, description: "태국 음식", spicy: true, vegetarian: false }
    ],
    tags: ["태국", "웨이팅", "포장 가능"],
    isFavorite: false,
    timeRequired: "0분",
    applePay: false,
    companyDiscount: false,
    notes: "평일 낮에도 웨이팅이 있음. 포장은 바로 됨"
  },
  {
    id: "3",
    name: "팡즈",
    category: "홍콩",
    distance: "송리단길",
    rating: 5.0,
    reviews: 2,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    address: "송리단길",
    phone: "02-3456-7890",
    openingHours: "11:00 - 22:00",
    priceRange: "보통",
    menus: [
      { id: "3-1", name: "유포면", price: 12000, description: "홍콩 유포면", spicy: false, vegetarian: false },
      { id: "3-2", name: "완탕면", price: 12000, description: "홍콩 완탕면", spicy: false, vegetarian: false },
      { id: "3-3", name: "볶음면", price: 12000, description: "홍콩 볶음면", spicy: true, vegetarian: false }
    ],
    tags: ["홍콩", "믿먹", "유포면", "완탕면", "볶음면"],
    isFavorite: false,
    timeRequired: "15-20분",
    applePay: false,
    companyDiscount: false,
    notes: "유포면, 완탕면, 대표 볶음면(이름 기억안남) 믿먹",
    userReviews: [
      "레나 : 맛있는데! 걸어가면 땀남ㅜ"
    ]
  },
  {
    id: "4",
    name: "오비베어",
    category: "한식",
    distance: "방이동",
    rating: 5.0,
    reviews: 3,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    address: "방이동",
    phone: "02-4567-8901",
    openingHours: "11:00 - 21:00",
    priceRange: "저렴",
    menus: [
      { id: "4-1", name: "한식뷔페", price: 9000, description: "한식 뷔페", spicy: false, vegetarian: false }
    ],
    tags: ["뷔페", "커피", "요구르트", "라면", "월요일 치킨", "시원함"],
    isFavorite: false,
    timeRequired: "10-12분",
    applePay: false,
    companyDiscount: false,
    notes: "메뉴 매일 바뀜, 커피,요구르트,라면 공짜, 매장 시원함, 월요일 치킨",
    userReviews: [
      "칼슨 : 8월까지 잘 부탁해 / 슈퍼센트 공식 구내식당",
      "브리 : 흡족"
    ]
  },
  {
    id: "5",
    name: "홍대쌀국수",
    category: "베트남",
    distance: "롯데백화점 제타플렉스 6층",
    rating: 4.0,
    reviews: 2,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    address: "롯데백화점 제타플렉스 6층",
    phone: "02-5678-9012",
    openingHours: "11:00 - 21:00",
    priceRange: "저렴",
    menus: [
      { id: "5-1", name: "베트남 쌀국수", price: 8000, description: "베트남 쌀국수", spicy: false, vegetarian: false },
      { id: "5-2", name: "불고기 볶음밥", price: 12000, description: "불고기 볶음밥", spicy: false, vegetarian: false }
    ],
    tags: ["베트남", "쉐어 가능", "서비스"],
    isFavorite: false,
    timeRequired: "10-15분",
    applePay: false,
    companyDiscount: false,
    notes: "둘이서 메뉴 3개 시켜서 쉐어 가능",
    userReviews: [
      "불고기 볶음밥이 맛있다. / 서비스 잘 주심"
    ]
  }
];

const categories = ["전체", "한식", "일식", "중식", "태국", "홍콩", "베트남", "샐러드", "분식", "카페"];

export default function LunchPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(sampleRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedRestaurantDetail, setSelectedRestaurantDetail] = useState<Restaurant | null>(null);

  // 로컬 스토리지에서 즐겨찾기 상태 로드
  useEffect(() => {
    const savedFavorites = localStorage.getItem('lunch-favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setRestaurants(prev => prev.map(restaurant => ({
        ...restaurant,
        isFavorite: favoriteIds.includes(restaurant.id)
      })));
    }
  }, []);

  // 즐겨찾기 상태를 로컬 스토리지에 저장
  const saveFavorites = (favoriteIds: string[]) => {
    localStorage.setItem('lunch-favorites', JSON.stringify(favoriteIds));
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory = selectedCategory === "전체" || restaurant.category === selectedCategory;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFavorites = !showFavorites || restaurant.isFavorite;
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  const spinRoulette = () => {
    if (filteredRestaurants.length === 0) return;
    
    setIsSpinning(true);
    setTimeout(() => {
      // 스마트 추천: 평점이 높고 리뷰가 많은 식당에 가중치 부여
      const weightedRestaurants = filteredRestaurants.map(restaurant => ({
        ...restaurant,
        weight: restaurant.rating * restaurant.reviews / 100
      }));
      
      // 가중치 기반 랜덤 선택
      const totalWeight = weightedRestaurants.reduce((sum, restaurant) => sum + restaurant.weight, 0);
      let random = Math.random() * totalWeight;
      
      let selectedRestaurant = weightedRestaurants[0];
      for (const restaurant of weightedRestaurants) {
        random -= restaurant.weight;
        if (random <= 0) {
          selectedRestaurant = restaurant;
          break;
        }
      }
      
      setSelectedRestaurant(selectedRestaurant);
      setIsSpinning(false);
    }, 2000);
  };

  const toggleFavorite = (restaurantId: string) => {
    const updatedRestaurants = restaurants.map(restaurant => 
      restaurant.id === restaurantId 
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    setRestaurants(updatedRestaurants);
    
    // 로컬 스토리지에 저장
    const favoriteIds = updatedRestaurants
      .filter(restaurant => restaurant.isFavorite)
      .map(restaurant => restaurant.id);
    saveFavorites(favoriteIds);
  };

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case "저렴": return "text-green-600";
      case "보통": return "text-yellow-600";
      case "고급": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getRatingStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent text-center">
        🍽️ 오늘 점심 뭐 먹을까?
      </h1>

      {/* 검색 및 필터 */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="식당명이나 태그로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-6 py-2 rounded-lg transition-colors ${
              showFavorites 
                ? "bg-red-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {showFavorites ? "❤️ 즐겨찾기" : "🤍 전체보기"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 룰렛 버튼 */}
      <div className="flex justify-center mb-8">
        <button
          onClick={spinRoulette}
          disabled={isSpinning || filteredRestaurants.length === 0}
          className={`px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 ${
            isSpinning || filteredRestaurants.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
          }`}
        >
          {isSpinning ? "🎲 선택 중..." : "🎲 오늘의 점심 뽑기"}
        </button>
      </div>

      {/* 선택된 식당 */}
      {selectedRestaurant && (
        <div className="w-full max-w-2xl mx-auto mb-8 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="relative">
            <img
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={() => toggleFavorite(selectedRestaurant.id)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              {selectedRestaurant.isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedRestaurant.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriceRangeColor(selectedRestaurant.priceRange)}`}>
                {selectedRestaurant.priceRange}
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                📍 {selectedRestaurant.distance}
              </span>
              <span className="flex items-center gap-1">
                🕒 {selectedRestaurant.openingHours}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-lg">{getRatingStars(selectedRestaurant.rating)}</span>
              <span className="font-bold">{selectedRestaurant.rating}</span>
              <span className="text-gray-500">({selectedRestaurant.reviews}개의 리뷰)</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedRestaurant.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedRestaurantDetail(selectedRestaurant)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              상세 정보 보기
            </button>
          </div>
        </div>
      )}

      {/* 식당 목록 */}
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">근처 맛집 목록 ({filteredRestaurants.length}개)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedRestaurantDetail(restaurant)}
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(restaurant.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                  {restaurant.isFavorite ? "❤️" : "🤍"}
                </button>
                {restaurant.companyDiscount && (
                  <span className="absolute top-4 left-4 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    🏢 할인
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{restaurant.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceRangeColor(restaurant.priceRange)}`}>
                    {restaurant.priceRange}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>{restaurant.category}</span>
                  <span>•</span>
                  <span>{restaurant.distance}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-500">{getRatingStars(restaurant.rating)}</span>
                  <span className="font-bold">{restaurant.rating}</span>
                  <span className="text-gray-500 text-sm">({restaurant.reviews})</span>
                </div>
                {restaurant.timeRequired && (
                  <div className="text-sm text-gray-500 mb-2">
                    ⏱️ {restaurant.timeRequired}
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {restaurant.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 정보 모달 */}
      {selectedRestaurantDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedRestaurantDetail.image}
                alt={selectedRestaurantDetail.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedRestaurantDetail(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedRestaurantDetail.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriceRangeColor(selectedRestaurantDetail.priceRange)}`}>
                  {selectedRestaurantDetail.priceRange}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold mb-2">📞 연락처</h3>
                  <p className="text-gray-600">{selectedRestaurantDetail.phone}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">📍 주소</h3>
                  <p className="text-gray-600">{selectedRestaurantDetail.address}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">🕒 영업시간</h3>
                  <p className="text-gray-600">{selectedRestaurantDetail.openingHours}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">⭐ 평점</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-lg">{getRatingStars(selectedRestaurantDetail.rating)}</span>
                    <span className="font-bold">{selectedRestaurantDetail.rating}</span>
                    <span className="text-gray-500">({selectedRestaurantDetail.reviews}개의 리뷰)</span>
                  </div>
                </div>
                {selectedRestaurantDetail.timeRequired && (
                  <div>
                    <h3 className="font-bold mb-2">⏱️ 소요시간</h3>
                    <p className="text-gray-600">{selectedRestaurantDetail.timeRequired}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-bold mb-2">💳 결제</h3>
                  <div className="flex gap-2">
                    {selectedRestaurantDetail.applePay && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">🍎 Apple Pay</span>
                    )}
                    {selectedRestaurantDetail.companyDiscount && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">🏢 입주사 할인</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-2">🏷️ 태그</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRestaurantDetail.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedRestaurantDetail.notes && (
                <div className="mb-6">
                  <h3 className="font-bold mb-2">📝 비고</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedRestaurantDetail.notes}</p>
                </div>
              )}

              {selectedRestaurantDetail.userReviews && selectedRestaurantDetail.userReviews.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold mb-2">💬 동료 리뷰</h3>
                  <div className="space-y-2">
                    {selectedRestaurantDetail.userReviews.map((review, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-700">{review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold mb-4">🍽️ 메뉴</h3>
                <div className="space-y-3">
                  {selectedRestaurantDetail.menus.map((menu) => (
                    <div key={menu.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{menu.name}</span>
                          {menu.spicy && <span className="text-red-500 text-sm">🌶️ 매운맛</span>}
                          {menu.vegetarian && <span className="text-green-500 text-sm">🥬 채식</span>}
                        </div>
                        <p className="text-sm text-gray-600">{menu.description}</p>
                      </div>
                      <span className="font-bold text-orange-600">{menu.price.toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
