import { Product } from "@/types/product";
import { Package, ShoppingCart } from "lucide-react";

export const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 border border-gray-100"
        >
            <div className="relative h-64 bg-gray-100 rounded-t-xl overflow-hidden">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Package className="w-20 h-20" />
                    </div>
                )}

                {product.stock < 10 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Còn {product.stock}
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[56px]">
                    {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                </p>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-orange-600">
                            {product.price.toLocaleString("vi-VN")}đ
                        </p>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Xem
                    </button>
                </div>
            </div>
        </div>
    );
};
