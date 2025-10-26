import { plans } from "@/data/plans";
import { PlanCard } from "./PlanCard";

interface MealPlansProps {
    onChoosePlan?: (planName: string) => void;
}

export default function MealPlans({ onChoosePlan }: MealPlansProps) {

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