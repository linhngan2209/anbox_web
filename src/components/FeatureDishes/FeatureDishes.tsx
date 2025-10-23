'use client';

import React from 'react';
import Image from 'next/image';

interface Dish {
    name: string;
    url: string;
    alt: string;
}

interface FeaturedDishesProps {
    dishes: Dish[];
}

export default function FeaturedDishes({ dishes }: FeaturedDishesProps) {
    return (
        <section id="featured" className="py-20 bg-[#FFF8F2]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Món Nổi Bật
                    </h2>
                    <p className="text-xl text-gray-600">
                        Những món được yêu thích nhất tại AnBox
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    {dishes.map((dish, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={dish.url}
                                    alt={dish.alt}
                                    fill
                                    className="object-cover rounded-t-xl"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {dish.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}