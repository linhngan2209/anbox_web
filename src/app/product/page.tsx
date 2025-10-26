'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/Product/ProductCard';
import { ProductModal } from '@/components/Product/ProductModal';
import ProductService from '@/service/productService';
import Loading from '@/components/Loading';
import { useCart } from '@/contexts/cartContext';
import { toast } from 'react-hot-toast';

export default function AppliancesPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ProductService.getListProduct();
                setProducts(data);
            } catch (err) {
                setError('Không thể tải danh sách sản phẩm.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product, quantity: number) => {
        addItem({
            itemId: product._id,
            name: product.name,
            url: product.image || '/placeholder.jpg',
            quantity: quantity,
            price: product.price || 0,
            type: 'appliance',
        });

        setSelectedProduct(null);
    };
    ;

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading />
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                {error}
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Sản phẩm gia dụng tre</h2>
                    <p className="text-gray-600">{products.length} sản phẩm có sẵn</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onClick={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>
            </main>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
}
