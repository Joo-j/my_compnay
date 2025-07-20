"use client";

import { useState, useEffect } from "react";
import restaurantsData from "../data/restaurants.json";

// 네이버 지도 API 타입 선언
declare global {
  interface Window {
    naver: {
      maps: {
        Map: any;
        LatLng: any;
        Marker: any;
        InfoWindow: any;
        Event: any;
        MapTypeControlStyle: any;
        Position: any;
      };
    };
  }
}

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
  lat?: number;
  lng?: number;
}

const categories = ["전체", "한식", "일식", "중식", "태국", "홍콩", "베트남", "샐러드", "분식", "카페"];

// 네이버 지도 API 키 (실제 사용시 환경변수로 관리)
const NAVER_CLIENT_ID = "YOUR_NAVER_CLIENT_ID";
const NAVER_CLIENT_SECRET = "YOUR_NAVER_CLIENT_SECRET";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(restaurantsData as Restaurant[]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedRestaurantDetail, setSelectedRestaurantDetail] = useState<Restaurant | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  // 네이버 지도 스크립트 로드
  useEffect(() => {
    if (showMap && !mapLoaded) {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}&submodules=geocoder`;
      script.async = true;
      script.onload = () => {
        setMapLoaded(true);
        initializeMap();
      };
      document.head.appendChild(script);
    }
  }, [showMap, mapLoaded]);

  // 지도 초기화
  const initializeMap = () => {
    if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울 시청
        zoom: 13,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.DROPDOWN,
          position: window.naver.maps.Position.TOP_RIGHT
        }
      });

      // 식당들을 지도에 마커로 표시
      filteredRestaurants.forEach((restaurant) => {
        if (restaurant.lat && restaurant.lng) {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(restaurant.lat, restaurant.lng),
            map: map,
            title: restaurant.name
          });

          // 마커 클릭시 정보창 표시
          const infoWindow = new window.naver.maps.InfoWindow({
            content: `
              <div style="padding: 10px; min-width: 200px;">
                <h3 style="margin: 0 0 5px 0; font-weight: bold;">${restaurant.name}</h3>
                <p style="margin: 0 0 5px 0; color: #666;">${restaurant.category} • ${restaurant.priceRange}</p>
                <p style="margin: 0 0 5px 0; color: #666;">⭐ ${restaurant.rating} (${restaurant.reviews})</p>
                <p style="margin: 0; color: #666;">📍 ${restaurant.address}</p>
              </div>
            `
          });

          window.naver.maps.Event.addListener(marker, 'click', () => {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          });
        }
      });
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent text-center">
          🍽️ 오늘 점심 뭐 먹을까?
        </h1>
        
        <p className="text-center text-gray-600 mb-8 text-lg">
          회사 근처 맛집을 스마트하게 추천해드려요!
        </p>

        {/* 검색 및 필터 */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="식당명이나 태그로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
            />
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-6 py-3 rounded-lg transition-colors text-lg font-medium ${
                showFavorites 
                  ? "bg-red-500 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {showFavorites ? "❤️ 즐겨찾기" : "🤍 전체보기"}
            </button>
            <button
              onClick={() => setShowMap(!showMap)}
              className={`px-6 py-3 rounded-lg transition-colors text-lg font-medium ${
                showMap 
                  ? "bg-blue-500 text-white" 
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {showMap ? "📋 목록보기" : "🗺️ 지도보기"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors font-medium ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 룰렛 버튼 */}
        <div className="flex justify-center mb-12">
          <button
            onClick={spinRoulette}
            disabled={isSpinning || filteredRestaurants.length === 0}
            className={`px-12 py-6 text-2xl font-bold rounded-full transition-all duration-300 shadow-xl ${
              isSpinning || filteredRestaurants.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-2xl transform hover:scale-105"
            }`}
          >
            {isSpinning ? "🎲 선택 중..." : "🎲 오늘의 점심 뽑기"}
          </button>
        </div>

        {/* 선택된 식당 */}
        {selectedRestaurant && (
          <div className="w-full max-w-3xl mx-auto mb-12 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">{selectedRestaurant.name}</h2>
                <span className={`px-4 py-2 rounded-full text-lg font-medium ${getPriceRangeColor(selectedRestaurant.priceRange)}`}>
                  {selectedRestaurant.priceRange}
                </span>
              </div>
              <div className="flex items-center gap-6 text-gray-600 mb-6 text-lg">
                <span className="flex items-center gap-2">
                  📍 {selectedRestaurant.distance}
                </span>
                <span className="flex items-center gap-2">
                  🕒 {selectedRestaurant.openingHours}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-yellow-500 text-2xl">{getRatingStars(selectedRestaurant.rating)}</span>
                <span className="font-bold text-xl">{selectedRestaurant.rating}</span>
                <span className="text-gray-500 text-lg">({selectedRestaurant.reviews}개의 리뷰)</span>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedRestaurant.tags.slice(0, 4).map((tag, index) => (
                  <span key={index} className="px-3 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedRestaurantDetail(selectedRestaurant)}
                className="w-full bg-orange-500 text-white py-4 rounded-xl hover:bg-orange-600 transition-colors text-lg font-bold"
              >
                상세 정보 보기
              </button>
            </div>
          </div>
        )}

        {/* 지도 또는 식당 목록 */}
        {showMap ? (
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">지도에서 보기 ({filteredRestaurants.length}개)</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">네이버 지도 기능</h3>
              <p className="text-lg text-gray-600 mb-6">
                지도에서 식당 위치를 확인할 수 있습니다.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-blue-800 mb-3">📋 설정 방법</h4>
                <ol className="text-left text-blue-700 space-y-2">
                  <li>1. <a href="https://www.ncloud.com/" target="_blank" rel="noopener noreferrer" className="underline">네이버 클라우드 플랫폼</a>에서 Maps 서비스 신청</li>
                  <li>2. Client ID 발급받기</li>
                  <li>3. 코드에서 <code className="bg-blue-100 px-2 py-1 rounded">YOUR_NAVER_CLIENT_ID</code> 부분을 실제 Client ID로 교체</li>
                  <li>4. 환경변수로 설정하는 것을 권장합니다</li>
                </ol>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-orange-800 text-sm">
                  💡 현재는 목록보기로 식당 정보를 확인할 수 있습니다.
                </p>
              </div>
              <button
                onClick={() => setShowMap(false)}
                className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-bold"
              >
                목록보기로 돌아가기
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">근처 맛집 목록 ({filteredRestaurants.length}개)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedRestaurantDetail(restaurant)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-xl">{restaurant.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriceRangeColor(restaurant.priceRange)}`}>
                        {restaurant.priceRange}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span className="font-medium">{restaurant.category}</span>
                      <span>•</span>
                      <span>{restaurant.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-500 text-lg">{getRatingStars(restaurant.rating)}</span>
                      <span className="font-bold">{restaurant.rating}</span>
                      <span className="text-gray-500 text-sm">({restaurant.reviews})</span>
                    </div>
                    {restaurant.timeRequired && (
                      <div className="text-sm text-gray-500 mb-3">
                        ⏱️ {restaurant.timeRequired}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(restaurant.id);
                        }}
                        className="text-2xl hover:scale-110 transition-transform"
                      >
                        {restaurant.isFavorite ? "❤️" : "🤍"}
                      </button>
                      {restaurant.companyDiscount && (
                        <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full font-medium">
                          🏢 할인
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 상세 정보 모달 */}
        {selectedRestaurantDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">{selectedRestaurantDetail.name}</h2>
                  <span className={`px-4 py-2 rounded-full text-lg font-medium ${getPriceRangeColor(selectedRestaurantDetail.priceRange)}`}>
                    {selectedRestaurantDetail.priceRange}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-bold mb-3 text-lg">📞 연락처</h3>
                    <p className="text-gray-600">{selectedRestaurantDetail.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-lg">📍 주소</h3>
                    <p className="text-gray-600">{selectedRestaurantDetail.address}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-lg">🕒 영업시간</h3>
                    <p className="text-gray-600">{selectedRestaurantDetail.openingHours}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-lg">⭐ 평점</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-500 text-2xl">{getRatingStars(selectedRestaurantDetail.rating)}</span>
                      <span className="font-bold text-xl">{selectedRestaurantDetail.rating}</span>
                      <span className="text-gray-500">({selectedRestaurantDetail.reviews}개의 리뷰)</span>
                    </div>
                  </div>
                  {selectedRestaurantDetail.timeRequired && (
                    <div>
                      <h3 className="font-bold mb-3 text-lg">⏱️ 소요시간</h3>
                      <p className="text-gray-600">{selectedRestaurantDetail.timeRequired}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold mb-3 text-lg">💳 결제</h3>
                    <div className="flex gap-3">
                      {selectedRestaurantDetail.applePay && (
                        <span className="px-3 py-2 bg-green-100 text-green-800 rounded text-sm font-medium">🍎 Apple Pay</span>
                      )}
                      {selectedRestaurantDetail.companyDiscount && (
                        <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded text-sm font-medium">🏢 입주사 할인</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold mb-4 text-lg">🏷️ 태그</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedRestaurantDetail.tags.map((tag, index) => (
                      <span key={index} className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedRestaurantDetail.notes && (
                  <div className="mb-8">
                    <h3 className="font-bold mb-4 text-lg">📝 비고</h3>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-xl text-lg">{selectedRestaurantDetail.notes}</p>
                  </div>
                )}

                {selectedRestaurantDetail.userReviews && selectedRestaurantDetail.userReviews.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-bold mb-4 text-lg">💬 동료 리뷰</h3>
                    <div className="space-y-3">
                      {selectedRestaurantDetail.userReviews.map((review, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-700 text-lg">{review}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-bold mb-6 text-lg">🍽️ 메뉴</h3>
                  <div className="space-y-4">
                    {selectedRestaurantDetail.menus.map((menu) => (
                      <div key={menu.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-lg">{menu.name}</span>
                            {menu.spicy && <span className="text-red-500 text-sm font-medium">🌶️ 매운맛</span>}
                            {menu.vegetarian && <span className="text-green-500 text-sm font-medium">🥬 채식</span>}
                          </div>
                          <p className="text-gray-600 mt-1">{menu.description}</p>
                        </div>
                        <span className="font-bold text-orange-600 text-lg">{menu.price.toLocaleString()}원</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setSelectedRestaurantDetail(null)}
                    className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
