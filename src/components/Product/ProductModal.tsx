'use client';

import { useAuth } from "@/contexts/auth";
import { Product } from "@/types/product";
import { Minus, Package, Plus, Shield, ShoppingCart, Truck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const ProductModal: React.FC<{
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}> = ({ product, onClose, onAddToCart }) => {
    const { isAuthenticated } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        if (quantity < product.stock) setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
            return;
        }
        onAddToCart(product, quantity);
        onClose();
    };

    const handleBuyNow = () => {
        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để mua hàng');
            return;
        }
        onAddToCart(product, quantity);
        onClose();
        router.push("/cart");
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Chi tiết sản phẩm</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Ảnh sản phẩm */}
                        <div>
                            <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center mb-4 overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Package className="w-32 h-32 text-gray-400" />
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-xs text-gray-600">Giao hàng</p>
                                        <p className="text-sm font-semibold text-gray-800">Miễn phí</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-xs text-gray-600">Bảo hành</p>
                                        <p className="text-sm font-semibold text-gray-800">12 tháng</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                                    <Package className="w-5 h-5 text-orange-600" />
                                    <div>
                                        <p className="text-xs text-gray-600">Còn hàng</p>
                                        <p className="text-sm font-semibold text-gray-800">{product.stock}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.name}</h1>

                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <p className="text-4xl font-bold text-orange-600 mb-2">
                                    {product.price.toLocaleString('vi-VN')}đ
                                </p>
                                <p className="text-gray-500">Đã bao gồm VAT</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-gray-800 mb-2">Mô tả sản phẩm</h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-gray-800 mb-3">Đặc điểm nổi bật</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-gray-800 mb-3">Số lượng</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                        <button
                                            onClick={handleDecrease}
                                            disabled={quantity <= 1}
                                            className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="px-6 py-3 font-bold text-lg min-w-[60px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={handleIncrease}
                                            disabled={quantity >= product.stock}
                                            className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <span className="text-gray-600">{product.stock} sản phẩm có sẵn</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Thêm vào giỏ hàng
                                </button>

                                <button
                                    onClick={handleBuyNow}
                                    className="px-6 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 py-4 rounded-xl font-bold transition-colors"
                                >
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
