import React, { useState } from 'react';
import { X, Clock, ChefHat, Flame, Users } from 'lucide-react';
import { Recipe } from '@/types/menu';
import { addLineBreaksReact } from '@/utils/formatTextLine';

interface RecipeModalProps {
    recipe: Recipe | null;
    onClose: () => void;
    onAddToCart: (recipe: Recipe, servings: '1' | '2' | '4') => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose, onAddToCart }) => {
    const [selectedServings, setSelectedServings] = useState<'1' | '2' | '4'>('2');

    if (!recipe) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8 shadow-2xl">
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
                    <h2 className="text-3xl font-bold text-gray-800 pr-8">
                        {recipe.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
                        <img
                            src={recipe.url}
                            alt={recipe.name}
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
                            <div className="font-bold text-gray-800 text-lg">{recipe.info.time}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl">
                            <ChefHat className="w-7 h-7 text-green-600 mb-2" />
                            <div className="text-sm text-gray-600">Độ khó</div>
                            <div className="font-bold text-gray-800 text-lg">{recipe.info.difficulty}</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl">
                            <Flame className="w-7 h-7 text-red-600 mb-2" />
                            <div className="text-sm text-gray-600">Năng lượng</div>
                            <div className="font-bold text-gray-800 text-lg">{recipe.nutrition.Calories}</div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                            <span className="w-1 h-8 bg-orange-600 rounded"></span>
                            Nguyên liệu ({selectedServings} người)
                        </h3>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {recipe.ingredients.map((ing, idx) => (
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
                            Không bao gồm trong giao hàng của bạn
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {recipe.seasonings.map((seasoning, idx) => (
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
                                            {addLineBreaksReact(recipe.instructions.preparation)}
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
                                            {addLineBreaksReact(recipe.instructions.cooking)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {recipe.nutrition && (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <span className="w-1 h-8 bg-orange-600 rounded"></span>
                                Thông tin dinh dưỡng
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(recipe.nutrition).map(([key, value], index) => (
                                    <div key={`${key}-${index}`} className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl text-center">
                                        <div className="text-sm text-gray-600 mb-1">{key}</div>
                                        <div className="font-bold text-gray-800 text-lg">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t">
                        <button 
                            onClick={() => onAddToCart(recipe, selectedServings)} 
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};