'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Clock, ChefHat, Flame, Leaf, Filter, X, Users, Loader2, Sparkles } from 'lucide-react'; // Thêm Sparkles
import { RecipeCard } from '@/components/menu/RecipeCard';
import { Recipe } from '@/types/menu';
import MenuService from '@/service/menuService';
import toast from 'react-hot-toast';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/auth';
import { RecipeModal } from '@/components/Recipe/RecipeModal';
import { AISuggestionModal } from '@/components/AI/AISuggestMadal';

const MenuPage = () => {
    const [sampleRecipes, setSampleRecipes] = useState<Recipe[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'meat' | 'vegetarian'>('all');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const [showAIModal, setShowAIModal] = useState(false);

    const { addItem } = useCart();

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

    const handleAISearch = async (preferences: any) => {
        const filteredPrefs = {
            favorites: preferences.favorites,
            goal: preferences.goal,
        }
        setIsLoading(true);
        try {
            const results = await MenuService.getListFilter(filteredPrefs);
            setSampleRecipes(results);
        } catch (error) {
            toast.error('Không thể tìm kiếm. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
            setShowAIModal(false);
        }
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

                        {/* THÊM NÚT NÀY */}
                        <button
                            onClick={() => setShowAIModal(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>Gợi ý AI</span>
                        </button>

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

            <RecipeModal
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                onAddToCart={handleAddToCart}
            />
            <AISuggestionModal
                isOpen={showAIModal}
                onClose={() => setShowAIModal(false)}
                onSearch={handleAISearch}
            />
        </div>
    );
};

export default MenuPage;