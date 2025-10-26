'use client';

import React, { useState } from 'react';
import { Flame, TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';
import { Recipe } from '@/types/menu';
import { RecipeModal } from '../Recipe/RecipeModal';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/auth';
import toast from 'react-hot-toast';

interface TrendingThisWeekProps {
    dishes?: Recipe[];
}

const TrendingThisWeek = ({ dishes = [] }: TrendingThisWeekProps) => {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const { addItem } = useCart();
    const { isAuthenticated } = useAuth();

    const badges = [
        {
            label: 'Hot',
            icon: Flame,
            bgColor: 'bg-yellow-600',
            borderColor: 'border-yellow-600'
        },
        {
            label: 'Rising',
            icon: TrendingUp,
            bgColor: 'bg-green-600',
            borderColor: 'border-green-600'
        },
        {
            label: 'Top',
            icon: Star,
            bgColor: 'bg-orange-500',
            borderColor: 'border-orange-500'
        }
    ];

    const handleDishClick = (dish: Recipe) => {
        setSelectedRecipe(dish);
    };

    const handleAddToCart = (recipe: Recipe, servings: '1' | '2' | '4') => {
        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để thêm món ăn vào giỏ hàng');
        } else {
            addItem({
                itemId: recipe._id,
                name: recipe.name,
                category: recipe.category,
                url: recipe.url,
                quantity: 1,
                servings,
                type: 'dish',
                price: recipe.price * parseInt(servings),
            });
        }
    };

    // Lấy tối đa 3 món trending
    const displayDishes = dishes.slice(0, 3);

    // Nếu không có data, không hiển thị section
    if (displayDishes.length === 0) {
        return null;
    }

    return (
        <>
            <section id="trending" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Xu Hướng Tuần Này
                        </h2>
                        <p className="text-xl text-gray-600">
                            Những món ăn được cộng đồng yêu thích nhất
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {displayDishes.map((dish, index) => {
                            const badge = badges[index] || badges[0];
                            const BadgeIcon = badge.icon;

                            return (
                                <div
                                    key={dish._id || index}
                                    onClick={() => handleDishClick(dish)}
                                    className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 ${badge.borderColor} cursor-pointer group transform hover:scale-105`}
                                >
                                    <div className={`absolute top-4 right-4 ${badge.bgColor} text-white px-3 py-1 rounded-full text-sm font-semibold z-10 flex items-center gap-1`}>
                                        <BadgeIcon className="w-4 h-4" />
                                        {badge.label}
                                    </div>
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <Image
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            src={dish.url}
                                            alt={dish.name}
                                            width={400}
                                            height={224}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {dish.name}
                                        </h3>
                                        <p className="text-gray-600 mb-3">
                                            {dish.info?.time && `⏱️ ${dish.info.time}`}
                                            {dish.info?.difficulty && ` • ${dish.info.difficulty}`}
                                        </p>
                                        <p className="text-sm text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
                                            Xem chi tiết →
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <RecipeModal
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                onAddToCart={handleAddToCart}
            />
        </>
    );
};

export default TrendingThisWeek;