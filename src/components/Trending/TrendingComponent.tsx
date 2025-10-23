import React from 'react';
import { Flame, TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';

interface Dish {
    title: string;
    description: string;
    image: string;
    badge: {
        label: string;
        icon: React.ElementType;
        bgColor: string;
        borderColor: string;
    };
}

const TrendingThisWeek = () => {
    const dishes: Dish[] = [
        {
            title: 'Bò Lúc Lắc',
            description: "Bò lúc lắc sốt đặc trưng, mềm thơm",
            image: 'https://res.cloudinary.com/drri9iwmc/image/upload/v1761124698/r3reuna8zf0irqns9kp1.jpg',
            badge: {
                label: 'Hot',
                icon: Flame,
                bgColor: 'bg-yellow-600',
                borderColor: 'border-yellow-600'
            }
        },
        {
            title: 'Salad Tôm',
            description: "Salad tôm tươi ngon, ăn kèm rau xanh",
            image: "https://res.cloudinary.com/drri9iwmc/image/upload/v1761124920/oxknwj3848niathoqdcs.jpg", badge: {
                label: 'Rising',
                icon: TrendingUp,
                bgColor: 'bg-green-600',
                borderColor: 'border-green-600'
            }
        },
        {
            title: 'Gà Xào Nấm',
            description: 'Gà xào nấm mềm thơm, đậm vị',
            image: "https://res.cloudinary.com/drri9iwmc/image/upload/v1761056350/po3xykc3etpn9fgh2m5p.jpg",
            badge: {
                label: 'Top',
                icon: Star,
                bgColor: 'bg-orange-500',
                borderColor: 'border-orange-500'
            }
        }
    ];

    return (
        <section id="trending" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Xu Hướng Tuần Này
                    </h2>
                    <p className="text-xl text-gray-600">
                        Những món ăn được cộng đồng yêu thích nhất
                    </p>

                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                    {dishes.map((dish, index) => {
                        const BadgeIcon = dish.badge.icon;
                        return (
                            <div
                                key={index}
                                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 ${dish.badge.borderColor}`}
                            >
                                <div className={`absolute top-4 right-4 ${dish.badge.bgColor} text-white px-3 py-1 rounded-full text-sm font-semibold z-10 flex items-center gap-1`}>
                                    <BadgeIcon className="w-4 h-4" />
                                    {dish.badge.label}
                                </div>
                                <Image
                                    className="w-full h-56 object-cover"
                                    src={dish.image}
                                    alt={`Vietnamese ${dish.title.toLowerCase()} - ${dish.description}`}
                                    width={400}
                                    height={224}
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {dish.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {dish.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrendingThisWeek;