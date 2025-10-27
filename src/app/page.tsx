'use client';

import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import HeroSection from '@/components/HeroComponents/HeroSection';
import MealPlans from '@/components/Plans/MealCard';
import FeaturedDishes from '@/components/FeatureDishes/FeatureDishes';
import Trending from '@/components/Trending/TrendingComponent';
import HowItWork from '@/components/HowItWork/HowItWork';
import FAQ from '@/components/FAQ/FAQComponent';
import MenuService from '@/service/menuService';
import { Recipe } from '@/types/menu';
import toast from 'react-hot-toast';
import Loading from './loading';

const Home: NextPage = () => {
  const [featuredDishes, setFeaturedDishes] = useState<Recipe[]>([]);
  const [trendingDishes, setTrendingDishes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingDishes = async () => {
      try {
        setIsLoading(true);
        const response = await MenuService.getListTrend();
        const trendingRes = await MenuService.getListTopSelling();
        setFeaturedDishes(response);
        setTrendingDishes(trendingRes);
      } catch (error) {
        toast.error('Không cập nhật được dữ liệu!!!')
        setFeaturedDishes([]);
        setTrendingDishes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingDishes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative">
      <HeroSection />
      <MealPlans />

      {featuredDishes.length > 0 ? (
        <FeaturedDishes dishes={featuredDishes} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-600">Không có món nổi bật</p>
        </div>
      )}

      {trendingDishes.length > 0 ? (
        <Trending dishes={trendingDishes} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-600">Không có món trending</p>
        </div>
      )}

      <HowItWork />
      <FAQ />
    </div>
  );
};

export default Home;