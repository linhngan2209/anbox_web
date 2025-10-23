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

interface Dish {
  name: string;
  url: string;
  alt: string;
}

const Home: NextPage = () => {
  const [featuredDishes, setFeaturedDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingDishes = async () => {
      try {
        setIsLoading(true);
        const response = await MenuService.getListTrend();
        console.log('Trending dishes response:', response);
        const mappedDishes = response.map((item: any) => ({
          name: item.name || item.recipeName,
          url: item.url || item.url || item.url,
          alt: `${item.name || item.recipeName} - Món ăn nổi bật tại AnBox`
        }));

        setFeaturedDishes(mappedDishes);
      } catch (error) {
        setFeaturedDishes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingDishes();
  }, []);

  return (
    <div className="relative">
      <HeroSection />
      <MealPlans />

      {isLoading ? (
        <div className="py-20 text-center">
          <p className="text-gray-600">Đang tải món nổi bật...</p>
        </div>
      ) : (
        <FeaturedDishes dishes={featuredDishes} />
      )}

      <Trending />
      <HowItWork />
      <FAQ />
    </div>
  );
};

export default Home;