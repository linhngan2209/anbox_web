'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, ChefHat, Flame, Leaf, Users, X, Calendar } from 'lucide-react';
import { RecipeCardProps } from '@/types/menu';



export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Dễ': return 'bg-green-100 text-green-700';
            case 'Trung bình': return 'bg-yellow-100 text-yellow-700';
            case 'Khó': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={recipe.url}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    {recipe.category === 'meat' ? (
                        <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold">
                            <Flame className="w-4 h-4" />
                            Món thịt
                        </div>
                    ) : (
                        <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold">
                            <Leaf className="w-4 h-4" />
                            Món rau
                        </div>
                    )}
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getDifficultyColor(recipe.info.difficulty)}`}>
                        {recipe.info.difficulty}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 min-h-[56px]">
                    {recipe.name}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>{recipe.info.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <ChefHat className="w-4 h-4 text-orange-500" />
                        <span>{recipe.ingredients.length} nguyên liệu</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">
                            {recipe.nutrition.Calories}
                        </span>
                        <span className="text-orange-600 font-bold text-sm group-hover:text-orange-700">
                            Xem chi tiết →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};