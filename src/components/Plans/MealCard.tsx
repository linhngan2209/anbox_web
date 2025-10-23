import { PlanCard } from "./PlanCard";

interface MealPlansProps {
    onChoosePlan?: (planName: string) => void;
}

export default function MealPlans({ onChoosePlan }: MealPlansProps) {
    const plans = [
        {
            title: 'Ăn nhanh mỗi ngày',
            tagline: 'Tiện lợi – Ngon chuẩn vị',
            maxMeals: 1,
            description:
                '4 bữa ăn Việt được chuẩn bị sẵn nguyên liệu tươi ngon và công thức chi tiết. Giúp bạn nấu nhanh, thưởng thức món ngon mỗi ngày mà vẫn giữ trọn hương vị Việt.',
            image: '/plan_card1.png',
            imageAlt: 'Hộp nguyên liệu món Việt đa dạng, tươi ngon và hấp dẫn',
        },
        {
            title: 'Ăn ngon 3 ngày',
            tagline: 'Đổi vị – Dễ nấu – Vừa miệng',
            maxMeals: 3,
            description:
                '3 bữa ăn Việt phong phú với nguyên liệu được chia sẵn và hướng dẫn cụ thể. Mỗi ngày là một trải nghiệm ẩm thực tươi mới, đậm đà và nhanh gọn.',
            image: '/plan_card2.png',
            imageAlt: 'Gói 3 ngày với phở, gỏi cuốn và cà phê Việt Nam',
        },
        {
            title: 'Ăn ngon trọn tuần',
            tagline: 'Đủ vị – Dễ chuẩn bị',
            maxMeals: 7,
            description:
                '7 bữa ăn trọn vị cho cả tuần. Nguyên liệu sạch, tươi mới cùng công thức chuẩn đầu bếp giúp bạn giữ nhịp ăn ngon và lành mạnh mỗi ngày.',
            image: '/plan_card3.png',
            imageAlt: 'Gói 7 ngày với bún bò Huế, rau củ và món Việt truyền thống',
        },
    ];



    const handleChoosePlan = (planTitle: string) => {
        if (onChoosePlan) {
            onChoosePlan(planTitle);
        }
    };

    return (
        <section id="meal-plans" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Chọn Gói Ăn Của Bạn
                    </h2>
                    <p className="text-xl text-gray-600">
                        Khẩu phần hoàn hảo, hương vị chính gốc, giao hàng linh hoạt
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <PlanCard
                            key={plan.title}
                            {...plan}
                            onChoosePlan={() => handleChoosePlan(plan.title)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}