import React from 'react';
import { MousePointer2, Package, Truck, Utensils } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: MousePointer2,
            bgColor: 'bg-red-600',
            title: '1. Chọn Gói',
            description: 'Chọn gói bữa phù hợp với gia đình và sở thích của bạn'
        },
        {
            icon: Package,
            bgColor: 'bg-orange-500',
            title: '2. Đóng Gói Tươi',
            description: 'Nguyên liệu tươi và gia vị chuẩn bị cẩn thận cho từng món'
        },
        {
            icon: Truck,
            bgColor: 'bg-yellow-600',
            title: '3. Giao Nhanh',
            description: 'Giao đến tận nhà với bao bì giữ nhiệt'
        },
        {
            icon: Utensils,
            bgColor: 'bg-green-600',
            title: '4. Nấu & Thưởng Thức',
            description: 'Theo công thức đơn giản và thưởng thức hương vị Việt'
        }
    ];

    return (
        <section id="how-it-works" className="py-20 bg-orange-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Cách Thức Hoạt Động
                    </h2>
                    <p className="text-xl text-gray-600">
                        Các bước đơn giản để có bữa ăn Việt chuẩn vị
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className={`${step.bgColor} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
