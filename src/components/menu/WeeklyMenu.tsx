'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Loader2 } from 'lucide-react';
import { Recipe, WeeklyMenu } from '@/types/menu';
import { RecipeCard } from './RecipeCard';
import MenuService from '@/service/menuService';
import { toast } from 'react-hot-toast';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/auth';
import { RecipeModal } from '../Recipe/RecipeModal';

const getWeekDates = (weekOffset: number = 0) => {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilMonday = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + daysUntilMonday + weekOffset * 7);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleDateString('vi-VN', { month: 'short' });
        return `${day} ${month}`;
    };

    return {
        startDate: formatDate(monday),
        endDate: formatDate(sunday)
    };
};

const groupRecipesByWeekByCategory = (recipes: Recipe[], perWeek: number = 4) => {
    const weeks: WeeklyMenu[] = [];

    const meatRecipes = recipes.filter(r => r.category === 'meat');
    const vegRecipes = recipes.filter(r => r.category === 'vegetarian');

    const totalWeeks = Math.ceil(Math.max(meatRecipes.length / 2, vegRecipes.length / 2));

    for (let i = 0; i < totalWeeks; i++) {
        const weekMeat = meatRecipes.slice(i * 2, i * 2 + 2);
        const weekVeg = vegRecipes.slice(i * 2, i * 2 + 2);

        const weekRecipes = [...weekMeat, ...weekVeg];

        const { startDate, endDate } = getWeekDates(i);

        weeks.push({
            weekNumber: i + 1,
            startDate,
            endDate,
            recipes: weekRecipes,
        });
    }

    return weeks;
};

export const WeeklyMenuPage = () => {
    const [currentWeek, setCurrentWeek] = useState(0);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [weeklyMenus, setWeeklyMenus] = useState<WeeklyMenu[]>([]);
    const { isAuthenticated } = useAuth();
    const { addItem } = useCart();

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const recipes = await MenuService.getListMenu();
                setAllRecipes(recipes);
                const menus = groupRecipesByWeekByCategory(recipes, 4);
                setWeeklyMenus(menus);
                setCurrentWeek(0);
            } catch (error) {
                toast.error('Không thể tải danh sách món ăn. Vui lòng thử lại sau.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipes();
    }, []);

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

    if (isLoading || weeklyMenus.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
            </div>
        );
    }

    const currentMenu = weeklyMenus[currentWeek];

    const nextWeek = () => {
        if (currentWeek < weeklyMenus.length - 1) {
            setCurrentWeek(currentWeek + 1);
        }
    };

    const prevWeek = () => {
        if (currentWeek > 0) {
            setCurrentWeek(currentWeek - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                            Thực đơn tuần này
                        </h1>
                        <p className="text-lg text-gray-600">
                            Chọn món yêu thích và bắt đầu nấu ăn ngay hôm nay
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={prevWeek}
                            disabled={currentWeek === 0}
                            className={`p-3 rounded-full transition-all ${currentWeek === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50'
                                }`}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="text-center px-8 py-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl min-w-[280px]">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Calendar className="w-5 h-5 text-orange-600" />
                                <span className="text-sm font-semibold text-orange-600">TUẦN {currentMenu.weekNumber}</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">
                                {currentMenu.startDate} - {currentMenu.endDate}
                            </p>
                        </div>

                        <button
                            onClick={nextWeek}
                            disabled={currentWeek === weeklyMenus.length - 1}
                            className={`p-3 rounded-full transition-all ${currentWeek === weeklyMenus.length - 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50'
                                }`}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-8 text-center">
                    <p className="text-gray-600">
                        <span className="font-bold text-orange-600">{currentMenu.recipes.length} món</span> trong tuần này
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentMenu.recipes.map((recipe, idx) => (
                        <RecipeCard
                            key={idx}
                            recipe={recipe}
                            onClick={() => setSelectedRecipe(recipe)}
                        />
                    ))}
                </div>
            </div>

            <RecipeModal
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
};

export default WeeklyMenuPage;