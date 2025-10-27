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
    Tag,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cartContext';
import { useAuth } from '@/contexts/auth';
import toast from 'react-hot-toast';

const CartPage = () => {
    const router = useRouter();
    const { items: cartItems, removeItem, updateQuantity, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [promoCode, setPromoCode] = useState('');
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [totalMeals, setTotalMeals] = useState(0);
    const [planName, setPlanName] = useState('');

    useEffect(() => {
        const savedMaxMeals = localStorage.getItem('weekly_menu_maxMeals');
        if (savedMaxMeals) {
            const mealsCount = parseInt(savedMaxMeals);
            setTotalMeals(mealsCount);

            switch (mealsCount) {
                case 100:
                    setPlanName('Gói Ăn nhanh mỗi ngày');
                    break;
                case 12:
                    setPlanName('Gói Ăn ngon 3 ngày');
                    break;
                case 25:
                    setPlanName('Gói Ăn ngon trọn tuần');
                    break;
                default:
                    setPlanName(`Gói ${mealsCount} món`);
            }
        }
    }, []);

    const dishItems = cartItems.filter(i => i.type === 'dish');
    const applianceItems = cartItems.filter(i => i.type === 'appliance');

    const subtotalDish = dishItems.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
    );
    const subtotalAppliance = applianceItems.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
    );
    const subtotal = subtotalDish + subtotalAppliance;
    const discount = isPromoApplied ? subtotal * 0.05 : 0;
    const shippingFee = subtotal > 500000 ? 0 : 30000;
    const total = subtotal - discount + shippingFee;

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === 'welcome') {
            setIsPromoApplied(true);
            toast.success('Áp dụng mã giảm giá thành công!');
        } else {
            toast.error('Mã giảm giá không hợp lệ!');
        }
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để thanh toán');
            router.push('/login');
            return;
        }

        if (cartItems.length === 0) {
            toast.error('Giỏ hàng trống. Vui lòng thêm sản phẩm!');
            return;
        }

        // Lưu thông tin đơn hàng vào localStorage để dùng ở trang checkout
        const orderData = {
            items: cartItems,
            subtotalDish,
            subtotalAppliance,
            subtotal,
            discount,
            shippingFee,
            total,
            promoCode: isPromoApplied ? promoCode : null,
            planName,
            totalMeals,
            timestamp: Date.now()
        };

        localStorage.setItem('checkout_order', JSON.stringify(orderData));
        router.push('/checkout');
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
                        Kiểm tra lại các sản phẩm bạn đã chọn trước khi thanh toán
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">
                                    Sản phẩm đã chọn ({cartItems.length})
                                </h2>
                                {cartItems.length > 0 && (
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm?')) {
                                                clearCart();
                                                toast.success('Đã xóa tất cả sản phẩm');
                                            }
                                        }}
                                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Xóa tất cả
                                    </button>
                                )}
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        Giỏ hàng trống
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Hãy thêm món ăn yêu thích vào giỏ hàng nhé!
                                    </p>
                                    <Link href="/menu">
                                        <button className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                                            Khám phá thực đơn
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item: any, index: any) => (
                                        <div
                                            key={`${item.itemId}-${index}`}
                                            className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-orange-200"
                                        >
                                            <img
                                                src={item.url}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-800 mb-2 truncate">
                                                    {item.name}
                                                </h3>

                                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                                                    {item.type === 'dish' ? (
                                                        <>
                                                            <div className="flex items-center gap-1">
                                                                <Users className="w-4 h-4" />
                                                                {item.servings} người
                                                            </div>
                                                            {item.category && (
                                                                <div className="flex items-center gap-1">
                                                                    <ChefHat className="w-4 h-4" />
                                                                    {item.category === 'meat' ? 'Món thịt' : 'Món rau'}
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-blue-600 font-medium">
                                                            <Tag className="w-4 h-4" />
                                                            <span>Đồ gia dụng</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <p className="text-orange-600 font-bold text-lg">
                                                    {(item.price || 0).toLocaleString('vi-VN')}đ
                                                </p>
                                            </div>

                                            <div className="flex flex-col justify-between items-end">
                                                {item.type === 'appliance' && (
                                                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() =>
                                                                item.quantity > 1 &&
                                                                updateQuantity(item.itemId, item.type, item.quantity - 1)
                                                            }
                                                            className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="px-4 font-semibold text-gray-700">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.itemId, item.type, item.quantity + 1)
                                                            }
                                                            className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => {
                                                        removeItem(item.itemId, item.type);
                                                        toast.success('Đã xóa sản phẩm');
                                                    }}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Xóa sản phẩm"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <Link href="/menu" passHref>
                                        <button className="w-full py-4 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                                            <Plus className="w-5 h-5" />
                                            Tiếp tục chọn món
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Plan Info */}
                        {planName && dishItems.length > 0 && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-blue-900 mb-2">{planName}</h3>

                                        {totalMeals === 100 ? (
                                            <p className="text-sm text-blue-800">
                                                Bạn có thể chọn <span className="font-bold">không giới hạn món</span>
                                            </p>
                                        ) : (
                                            <p className="text-sm text-blue-800">
                                                Bạn có thể chọn tối đa <span className="font-bold">{totalMeals}</span> món —
                                                hiện đã chọn <span className="font-bold">{dishItems.length}</span> món
                                            </p>
                                        )}

                                        {totalMeals !== 100 && dishItems.length < totalMeals && (
                                            <p className="text-sm text-blue-700 mt-1">
                                                Còn thiếu {totalMeals - dishItems.length} món nữa để đủ gói
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                Tóm tắt đơn hàng
                            </h2>

                            {/* Promo Code */}
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
                                        disabled={!promoCode}
                                        className="px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                                {isPromoApplied && (
                                    <div className="mt-2 text-sm text-green-600 flex items-center gap-1 bg-green-50 p-2 rounded-lg">
                                        <Tag className="w-4 h-4" />
                                        Đã áp dụng mã giảm 5%
                                    </div>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                {dishItems.length > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Món ăn ({dishItems.length})</span>
                                        <span>{subtotalDish.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                )}
                                {applianceItems.length > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Đồ gia dụng ({applianceItems.length})</span>
                                        <span>{subtotalAppliance.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                )}
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600 font-semibold">
                                        <span>Giảm giá (5%)</span>
                                        <span>-{discount.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className={shippingFee === 0 ? 'text-green-600 font-semibold' : ''}>
                                        {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}
                                    </span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-bold text-gray-800">
                                    Tổng cộng
                                </span>
                                <span className="text-3xl font-bold text-orange-600">
                                    {total.toLocaleString('vi-VN')}đ
                                </span>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                                className="w-full py-4 rounded-xl font-bold text-lg transition-all transform shadow-lg mb-4 bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                Thanh toán
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Free Shipping Progress */}
                            {shippingFee > 0 && subtotal > 0 && (
                                <div className="text-center text-sm bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <p className="text-blue-800">
                                        Mua thêm <span className="font-bold text-blue-900">
                                            {(500000 - subtotal).toLocaleString('vi-VN')}đ
                                        </span> để được miễn phí ship
                                    </p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${Math.min((subtotal / 500000) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {cartItems.length === 0 && (
                                <div className="text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
                                    Giỏ hàng trống. Thêm sản phẩm để thanh toán
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