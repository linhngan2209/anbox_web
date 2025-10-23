'use client';

import React, { useState, useEffect } from 'react';
import {
    ShoppingCart,
    Trash2,
    Plus,
    Clock,
    Users,
    ChefHat,
    ArrowRight,
    Gift,
    Tag
} from 'lucide-react';
import { useCart } from '@/contexts/cartContext';
import Link from 'next/link';



const CartPage = () => {
    const { items: cartItems, removeItem } = useCart();
    const [promoCode, setPromoCode] = useState('');
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [totalMeals, setTotalMeals] = useState(0);
    const [planName, setPlanName] = useState('');
    const [selectedServings, setSelectedServings] = useState<'1' | '2' | '4'>('2');
    useEffect(() => {
        const savedMaxMeals = localStorage.getItem('weekly_menu_maxMeals');
        if (savedMaxMeals) {
            const mealsCount = parseInt(savedMaxMeals);
            setTotalMeals(mealsCount);

            switch (mealsCount) {
                case 3:
                    setPlanName('Gói Ăn ngon 3 ngày');
                    break;
                case 1:
                    setPlanName('Gói Ăn nhanh mỗi ngày');
                    break;
                case 7:
                    setPlanName('Gói Ăn ngon trọn tuần');
                    break;
                default:
                    setPlanName(`Gói ${mealsCount} món`);
            }
        }
    }, []);

    const servingsOptions = [
        { value: '1', label: '1 người', pricePerMeal: 45000 },
        { value: '2', label: '2 người', pricePerMeal: 65000 },
        { value: '4', label: '4 người', pricePerMeal: 115000 }
    ];

    const selectedServingOption = servingsOptions.find(
        (opt) => opt.value === selectedServings
    );
    const pricePerMeal = selectedServingOption?.pricePerMeal || 0;

    const subtotal = cartItems.length * pricePerMeal;
    const discount = isPromoApplied ? subtotal * 0.05 : 0;
    const shippingFee = subtotal > 500000 ? 0 : 30000;
    const total = subtotal - discount + shippingFee;

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === 'welcome') {
            setIsPromoApplied(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <ShoppingCart className="w-8 h-8 text-orange-600" />
                        <h1 className="text-4xl font-bold text-gray-800">
                            Giỏ hàng của bạn
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Kiểm tra lại các món ăn bạn đã chọn trước khi thanh toán
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Món ăn đã chọn ({cartItems.length}/{totalMeals})
                            </h2>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🛒</div>
                                <p className="text-gray-600 mb-2">
                                    Giỏ hàng trống. Hãy thêm món ăn vào nhé!
                                </p>
                                {totalMeals > 0 && (
                                    <p className="text-sm text-orange-600">
                                        Bạn đã chọn {planName}, cần thêm {totalMeals} món
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item: any, index: any) => (
                                    <div
                                        key={item.id || index}
                                        className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <img
                                            src={item.url}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 mb-2">
                                                {item.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {item.servings} người
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {item.time}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ChefHat className="w-4 h-4" />
                                                    {item.calories}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.recipeId)}
                                            className="p-2 h-10 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}

                                {cartItems.length < totalMeals && (
                                    <Link href="/menu" passHref>
                                        <button className="w-full py-4 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 font-semibold hover:bg-orange-50 transition-colors">
                                            <Plus className="w-5 h-5 inline mr-2" />
                                            Thêm món ăn ({cartItems.length}/{totalMeals})
                                        </button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                Tóm tắt đơn hàng
                            </h2>

                            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 mb-6">
                                <div className="flex items-center gap-2 text-orange-700 font-semibold mb-3">
                                    <Gift className="w-5 h-5" />
                                    {planName || 'Gói ẩn'}
                                </div>
                                <div className="text-sm text-gray-700 space-y-1">
                                    <div>{cartItems.length}/{totalMeals} món đã chọn</div>
                                    <div>{selectedServingOption?.label || selectedServings + ' người'}/phần</div>
                                </div>
                                {cartItems.length < totalMeals && (
                                    <div className="mt-3 text-xs text-orange-600 bg-white/50 px-3 py-2 rounded-lg">
                                        Còn thiếu {totalMeals - cartItems.length} món
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Mã giảm giá"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={applyPromoCode}
                                        className="px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                                {isPromoApplied && (
                                    <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                        <Tag className="w-4 h-4" />
                                        Đã áp dụng mã giảm 5%
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính ({cartItems.length} món)</span>
                                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Giảm giá</span>
                                        <span>-{discount.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span>
                                        {shippingFee === 0
                                            ? 'Miễn phí'
                                            : `${shippingFee.toLocaleString('vi-VN')}đ`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-bold text-gray-800">
                                    Tổng cộng
                                </span>
                                <span className="text-3xl font-bold text-orange-600">
                                    {total.toLocaleString('vi-VN')}đ
                                </span>
                            </div>

                            <button
                                disabled={cartItems.length < totalMeals}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform shadow-lg mb-4 ${cartItems.length < totalMeals
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 hover:scale-105'
                                    }`}
                            >
                                {cartItems.length < totalMeals
                                    ? `Cần thêm ${totalMeals - cartItems.length} món`
                                    : 'Thanh toán'
                                }
                                {cartItems.length >= totalMeals && (
                                    <ArrowRight className="inline ml-2 w-5 h-5" />
                                )}
                            </button>

                            {shippingFee > 0 && (
                                <div className="text-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                                    Mua thêm {(500000 - subtotal).toLocaleString('vi-VN')}đ để
                                    được miễn phí ship
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;