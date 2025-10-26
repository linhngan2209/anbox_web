"use client";
import React from "react";

export default function MealPlansPage() {
    const mealPlans = [
        {
            title: "Bữa lẻ theo ngày",
            description: "Đặt món theo bữa",
            details: [
                "Phù hợp: gia đình bận rộn cần 1–2 bữa nhanh/ngày, thử món trước khi vào Meal Plan.",
                "Bao gồm: 1 bộ nguyên liệu + công thức chi tiết (2–4 khẩu phần tuỳ chọn).",
                "Thời gian nấu: 10–25 phút; 2–3 bước chính.",
                "Giao hàng: theo slot trưa/tối trong ngày; có lựa chọn chilled hoặc frozen (tuỳ món).",
                "Tuỳ biến: chọn khẩu vị (ít cay/ít dầu), thay đổi loại tinh bột/rau tương đương khi có sẵn.",
                "Giá & ưu đãi: giá niêm yết/1 bữa; miễn phí ship nếu đạt ngưỡng.",
                "Trường hợp nên chọn: khi lịch tuần chưa cố định, cần linh hoạt tối đa."
            ]
        },
        {
            title: "Meal Plan 3 ngày",
            description:
                "Phù hợp: thử nghiệm lối sống “nấu nhanh – ăn lành”, lên lịch trước cho 3 ngày trong 1 tuần.",
            details: [
                "Cấu hình gói (mặc định, có thể đổi):",
                "3 bữa × 2 hoặc 4 khẩu phần.",
                "Menu chọn từ 10–15 món/tuần.",
                "Có thể nhận 1 lần (đầy đủ cho 3 bữa) hoặc chia 2 lần/tuần (tươi hơn).",
                "Chọn 3 ngày bất kỳ trong 7 ngày tính từ ngày bắt đầu.",
                "Cho phép đổi ngày/skip tối đa 1 lần/tuần (báo trước 24 giờ).",
                "Quyền lợi thêm: hướng dẫn dinh dưỡng/topping gợi ý; ưu tiên hỗ trợ khi có thiếu hụt nguyên liệu.",
                "Trường hợp nên chọn: muốn hình thành thói quen nấu nhưng chưa sẵn sàng cam kết dài hơn."
            ]
        },
        {
            title: "Meal Plan 7 ngày",
            description:
                "Phù hợp: gia đình muốn lập kế hoạch ăn cả tuần (bữa tối chủ đạo), tối ưu chi phí và thời gian mua sắm.",
            details: [
                "Cấu hình gói (mặc định, có thể đổi):",
                "7 bữa × 2 hoặc 4 khẩu phần.",
                "Thực đơn luân phiên 20–25 món/tuần, có lộ trình giảm dầu/muối, gợi ý khẩu phần.",
                "Khuyến nghị nhận 2 lần/tuần (ví dụ T2 & T5) để tối ưu độ tươi.",
                "Chọn 7 ngày trong 10 ngày (cho phép dồn/giãn trong khung này).",
                "Đổi ngày/skip tối đa 2 lần/tuần (báo trước 24 giờ).",
                "Quyền lợi thêm: planner tuần (PDF/in-web), mẹo meal-prep, gợi ý thay thế nguyên liệu tương đương.",
                "Trường hợp nên chọn: tối ưu chi phí/khẩu phần, duy trì thói quen nấu, kiểm soát dinh dưỡng gia đình."
            ]
        }
    ];

    return (
        <div className="bg-[#FFF8F2] text-gray-800 px-6 py-16">
            <div className="max-w-5xl mx-auto space-y-16">
                <h1 className="text-5xl font-bold text-orange-600 text-center mb-8">
                    Gói Ăn (Meal Plans)
                </h1>

                {mealPlans.map((plan, index) => (
                    <section
                        key={index}
                        className="bg-white p-8 rounded-2xl shadow-lg space-y-4 hover:shadow-xl transition-shadow"
                    >
                        <h2 className="text-3xl font-semibold text-orange-600">
                            {plan.title}
                        </h2>
                        <p className="text-gray-700 italic">{plan.description}</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {plan.details.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
}
