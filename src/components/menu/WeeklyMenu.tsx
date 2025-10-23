'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, ChefHat, Flame, Users, X, Calendar, Loader2 } from 'lucide-react';
import { Recipe, WeeklyMenu } from '@/types/menu';
import { RecipeCard } from './RecipeCard';
import MenuService from '@/service/menuService';
import { toast } from 'react-hot-toast';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/auth';

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
    const [selectedServings, setSelectedServings] = useState<'1' | '2' | '4'>('2');
    const [isLoading, setIsLoading] = useState(true);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [weeklyMenus, setWeeklyMenus] = useState<WeeklyMenu[]>([]);
    const { isAuthenticated } = useAuth();

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

    const { addItem } = useCart();

    const handleAddToCart = (recipe: Recipe, servings: '1' | '2' | '4') => {
        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để thêm món ăn vào giỏ hàng');
        } else {
            addItem({
                recipeId: recipe._id,
                name: recipe.name,
                category: recipe.category,
                url: recipe.url,
                quantity: 1,
                servings
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
            {/* Header */}
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

                    {/* Week Navigator */}
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

            {/* Recipe Grid */}
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

            {selectedRecipe && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8 shadow-2xl">
                        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
                            <h2 className="text-3xl font-bold text-gray-800 pr-8">
                                {selectedRecipe.name}
                            </h2>
                            <button
                                onClick={() => setSelectedRecipe(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
                                <img
                                    src={selectedRecipe.url}
                                    alt={selectedRecipe.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="mb-6 bg-orange-50 p-5 rounded-xl">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-orange-600" />
                                        <span className="font-semibold text-gray-800">Chọn khẩu phần:</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setSelectedServings('1')}
                                            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${selectedServings === '1'
                                                ? 'bg-orange-600 text-white shadow-lg scale-105'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            1 người
                                        </button>
                                        <button
                                            onClick={() => setSelectedServings('2')}
                                            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${selectedServings === '2'
                                                ? 'bg-orange-600 text-white shadow-lg scale-105'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            2 người
                                        </button>
                                        <button
                                            onClick={() => setSelectedServings('4')}
                                            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${selectedServings === '4'
                                                ? 'bg-orange-600 text-white shadow-lg scale-105'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            4 người
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl">
                                    <Clock className="w-7 h-7 text-orange-600 mb-2" />
                                    <div className="text-sm text-gray-600">Thời gian nấu</div>
                                    <div className="font-bold text-gray-800 text-lg">{selectedRecipe.info.time}</div>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl">
                                    <ChefHat className="w-7 h-7 text-green-600 mb-2" />
                                    <div className="text-sm text-gray-600">Độ khó</div>
                                    <div className="font-bold text-gray-800 text-lg">{selectedRecipe.info.difficulty}</div>
                                </div>
                                <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl">
                                    <Flame className="w-7 h-7 text-red-600 mb-2" />
                                    <div className="text-sm text-gray-600">Năng lượng</div>
                                    <div className="font-bold text-gray-800 text-lg">{selectedRecipe.nutrition.Calories}</div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span className="w-1 h-8 bg-orange-600 rounded"></span>
                                    Nguyên liệu ({selectedServings} người)
                                </h3>
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {selectedRecipe.ingredients.map((ing, idx) => (
                                            <div key={`ingredient-${idx}-${ing.name}`} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <div className="flex-1">
                                                    <span className="font-bold text-gray-800">{ing.name}</span>
                                                    <span className="text-gray-600 ml-2">{ing.servings[selectedServings]}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span className="w-1 h-8 bg-orange-600 rounded"></span>
                                    Gia vị
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {selectedRecipe.seasonings.map((seasoning, idx) => (
                                        <span key={`seasoning-${idx}-${seasoning}`} className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm">
                                            {seasoning}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span className="w-1 h-8 bg-orange-600 rounded"></span>
                                    Hướng dẫn nấu
                                </h3>
                                <div className="space-y-5">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                                1
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-blue-900 mb-2 text-lg">Chuẩn bị nguyên liệu</h4>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {selectedRecipe.instructions.preparation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                                2
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-orange-900 mb-2 text-lg">Nấu món ăn</h4>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {selectedRecipe.instructions.cooking}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedRecipe.nutrition && (
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                        <span className="w-1 h-8 bg-orange-600 rounded"></span>
                                        Thông tin dinh dưỡng
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {Object.entries(selectedRecipe.nutrition).map(([key, value], index) => (
                                            <div key={`${key}-${index}`} className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl text-center">
                                                <div className="text-sm text-gray-600 mb-1">{key}</div>
                                                <div className="font-bold text-gray-800 text-lg">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t">
                                <button onClick={() => handleAddToCart(selectedRecipe!, selectedServings)} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeeklyMenuPage;
