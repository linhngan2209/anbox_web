'use client';

import React from 'react';
import Image from 'next/image';

export default function Hero() {
    const onCTAClick = () => {
        const planSection = document.getElementById('meal-plans');
        if (planSection) {
            planSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative h-[700px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10"></div>

            <Image
                src="/hero_section.png"
                alt="Hộp ăn Việt với nguyên liệu tươi ngon"
                fill
                priority
                className="object-cover"
                quality={90}
            />

            <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="text-white max-w-2xl">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        ĂnBox – <span className="text-yellow-400">Nấu dễ dàng, ăn an tâm</span>
                    </h1>

                    <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
                        Hộp nguyên liệu nấu ăn trọn gói với công thức chuẩn đầu bếp – giao tận nơi, giúp bạn nấu
                        nhanh món ngon tại nhà trong{' '}
                        <span className="font-semibold text-yellow-300">15 phút</span>.
                    </p>

                    <button
                        onClick={onCTAClick}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                        Bắt Đầu Ngay
                    </button>
                </div>
            </div>
        </section>
    );
}
