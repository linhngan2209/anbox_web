'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Clock, ChefHat, Flame, Leaf, Filter, X, Users, Loader2 } from 'lucide-react';
import { RecipeCard } from '@/components/menu/RecipeCard';
import { Recipe } from '@/types/menu';
import MenuService from '@/service/menuService';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/auth';

const MenuPage = () => {
    const [sampleRecipes, setSampleRecipes] = useState<Recipe[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'meat' | 'vegetarian'>('all');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [selectedServings, setSelectedServings] = useState<'1' | '2' | '4'>('2');
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const recipes = await MenuService.getListMenu();
                setSampleRecipes(recipes);
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


    const categories = [
        { id: 'all', label: 'Tất cả', icon: ChefHat },
        { id: 'meat', label: 'Món thịt', icon: Flame },
        { id: 'vegetarian', label: 'Món rau', icon: Leaf }
    ];

    const filteredRecipes = useMemo(() => {
        return sampleRecipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, sampleRecipes]);



    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 py-12">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm món ăn..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex gap-2">
                            {categories.map((cat, index) => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={`category-${cat.id}-${index}`}
                                        onClick={() => setSelectedCategory(cat.id as any)}
                                        disabled={isLoading}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${selectedCategory === cat.id
                                            ? 'bg-orange-600 text-white shadow-lg scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="hidden sm:inline">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-4 text-gray-600">
                        <Filter className="inline w-4 h-4 mr-2" />
                        {isLoading ? (
                            <span>Đang tải món ăn...</span>
                        ) : (
                            <>
                                Tìm thấy <span className="font-bold text-orange-600">{filteredRecipes.length}</span> món ăn
                            </>
                        )}
                    </div>
                </div>

                {isLoading && (
                    <div className="text-center py-16">
                        <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />

                    </div>
                )}

                {!isLoading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
                        {filteredRecipes.map((recipe, index) => (
                            <RecipeCard
                                key={recipe._id || `recipe-${index}`}
                                recipe={recipe}
                                onClick={() => setSelectedRecipe(recipe)}
                            />
                        ))}
                    </div>
                )}

                {!isLoading && filteredRecipes.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🍳</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Không tìm thấy món ăn
                        </h3>
                        <p className="text-gray-600">
                            Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                        </p>
                    </div>
                )}
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

export default MenuPage;