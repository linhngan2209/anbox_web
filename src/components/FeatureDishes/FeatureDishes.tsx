'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Recipe } from '@/types/menu';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/auth';
import toast from 'react-hot-toast';
import { RecipeModal } from '../Recipe/RecipeModal';

interface FeaturedDishesProps {
    dishes: Recipe[];
}

export default function FeaturedDishes({ dishes }: FeaturedDishesProps) {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const { addItem } = useCart();
    const { isAuthenticated } = useAuth();

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

    return (
        <>
            <section id="featured" className="py-20 bg-[#FFF8F2]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Món Nổi Bật
                        </h2>
                        <p className="text-xl text-gray-600">
                            Những món được đặc biệt nhất tại ĂnBox
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                        {dishes.map((dish, index) => (
                            <div
                                key={dish._id || index}
                                onClick={() => handleDishClick(dish)}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer group"
                            >
                                <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                                    <Image
                                        src={dish.url}
                                        alt={dish.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {dish.name}
                                    </h3>
                                    <p className="text-sm text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
                                        Xem chi tiết →
                                    </p>
                                </div>
                            </div>
                        ))}
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
}