import { Sparkles, X } from "lucide-react";
import { useState } from "react";

export const AISuggestionModal = ({ isOpen, onClose, onSearch }: {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (preferences: any) => void;
}) => {
    const [preferences, setPreferences] = useState({
        goal: '',
        favorites: [] as string[],
        style: '',
        spicyLevel: 'medium',
        saltyLevel: 'medium',
        sweetLevel: 'medium'
    });

    const goals = [
        { id: 'weight-loss', label: '🏃 Giảm cân', value: 'weight-loss' },
        { id: 'muscle-gain', label: '💪 Tăng cơ', value: 'muscle-gain' },
        { id: 'healthy', label: '🥗 Ăn uống lành mạnh', value: 'healthy' },
        { id: 'energy', label: '⚡ Tăng năng lượng', value: 'energy' }
    ];

    const foodTypes = [
        { id: 'meat', label: '🥩 Món thịt' },
        { id: 'vegetarian', label: '🥬 Món rau' }
    ];

    const styles = [
        { id: 'traditional', label: '🏠 Món truyền thống', value: 'traditional' },
        { id: 'modern', label: '✨ Món hiện đại', value: 'modern' },
        { id: 'fusion', label: '🌍 Món fusion', value: 'fusion' },
        { id: 'quick', label: '⚡ Món nhanh', value: 'quick' }
    ];

    const levels = [
        { value: 'low', label: 'Ít' },
        { value: 'medium', label: 'Vừa phải' },
        { value: 'high', label: 'Nhiều' }
    ];

    const handleSearch = () => {
        onSearch(preferences);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-orange-600" />
                        <h2 className="text-2xl font-bold text-gray-800">Gợi ý AI cho bạn</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Goal Selection */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Mục tiêu của bạn</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {goals.map(goal => (
                                <button
                                    key={goal.id}
                                    onClick={() => setPreferences(prev => ({
                                        ...prev,
                                        goal: prev.goal === goal.value ? '' : goal.value
                                    }))}
                                    className={`p-4 rounded-xl border-2 transition-all ${preferences.goal === goal.value
                                        ? 'border-orange-600 bg-orange-50 text-orange-600'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="font-semibold">{goal.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Food Preferences */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Sở thích về món ăn</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {foodTypes.map(food => (
                                <button
                                    key={food.id}
                                    onClick={() => setPreferences(prev => ({
                                        ...prev,
                                        favorites: prev.favorites.includes(food.id) ? [] : [food.id]
                                    }))}
                                    className={`p-4 rounded-xl border-2 transition-all ${preferences.favorites.includes(food.id)
                                        ? 'border-orange-600 bg-orange-50 text-orange-600'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="font-semibold">{food.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Style Preferences */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Phong cách món ăn</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {styles.map(style => (
                                <button
                                    key={style.id}
                                    onClick={() => setPreferences(prev => ({
                                        ...prev,
                                        style: prev.style === style.value ? '' : style.value
                                    }))}
                                    className={`p-4 rounded-xl border-2 transition-all ${preferences.style === style.value
                                        ? 'border-orange-600 bg-orange-50 text-orange-600'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="font-semibold">{style.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Taste Preferences */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Độ vị</h3>
                        <div className="space-y-4">
                            {/* Spicy Level */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">🌶️ Độ cay</label>
                                <div className="flex gap-2">
                                    {levels.map(level => (
                                        <button
                                            key={level.value}
                                            onClick={() => setPreferences(prev => ({ ...prev, spicyLevel: level.value }))}
                                            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${preferences.spicyLevel === level.value
                                                ? 'border-orange-600 bg-orange-50 text-orange-600 font-semibold'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {level.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Salty Level */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">🧂 Độ mặn</label>
                                <div className="flex gap-2">
                                    {levels.map(level => (
                                        <button
                                            key={level.value}
                                            onClick={() => setPreferences(prev => ({ ...prev, saltyLevel: level.value }))}
                                            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${preferences.saltyLevel === level.value
                                                ? 'border-orange-600 bg-orange-50 text-orange-600 font-semibold'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {level.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sweet Level */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">🍯 Độ ngọt</label>
                                <div className="flex gap-2">
                                    {levels.map(level => (
                                        <button
                                            key={level.value}
                                            onClick={() => setPreferences(prev => ({ ...prev, sweetLevel: level.value }))}
                                            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${preferences.sweetLevel === level.value
                                                ? 'border-orange-600 bg-orange-50 text-orange-600 font-semibold'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {level.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                    <button
                        onClick={handleSearch}
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Tìm kiếm món ăn phù hợp
                    </button>
                </div>
            </div>
        </div>
    );
};