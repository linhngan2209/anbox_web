'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cartContext';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/auth';

interface PlanCardProps {
    title: string;
    tagline: string;
    maxMeals: number;
    description: string;
    image: string;
    imageAlt: string;
    onChoosePlan?: () => void;
}

export function PlanCard({
    title,
    tagline,
    maxMeals,
    description,
    image,
    imageAlt,
    onChoosePlan
}: PlanCardProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { clearCart } = useCart();

    const handleChoosePlan = () => {
        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để chọn gói ăn');
            router.push('/login');
            return;
        }

        try {
            clearCart();

            localStorage.removeItem('weekly_menu_cart');
            localStorage.removeItem('weekly_menu_maxMeals');

            localStorage.setItem('weekly_menu_maxMeals', maxMeals.toString());

            toast.success(`Đã chọn gói ${title} (${maxMeals} món)`);

            if (onChoosePlan) {
                onChoosePlan();
            }

            router.push('/menu');
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
            <div className="relative w-full h-48">
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover rounded-t-2xl"
                />
            </div>

            <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-lg font-semibold text-orange-500 mb-4">{tagline}</p>
                <p className="text-gray-600 mb-6">{description}</p>
                <button
                    onClick={handleChoosePlan}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                    Chọn Gói
                </button>
            </div>
        </div>
    );
}