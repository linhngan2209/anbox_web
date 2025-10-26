"use client";
import React from "react";

const steps = [
    {
        title: "Bước 1: Chọn gói ăn hoặc món bạn yêu thích",
        description:
            "Truy cập website → Chọn gói 1 ngày / 3 ngày / 7 ngày hoặc từng món lẻ theo nhu cầu.",
        img: "/laptop_work.jpg",
    },
    {
        title: "Bước 2: Chọn khẩu phần & số lượng",
        description:
            "Mỗi món đều có tùy chọn khẩu phần 1 - 2 - 4 người, đã được định lượng sẵn để bạn nấu vừa đủ, không lãng phí.",
        img: "/select_menu.jpg",
    },
    {
        title: "Bước 3: Thêm vào giỏ hàng",
        description:
            "Kiểm tra lại danh sách món và số lượng trước khi thanh toán. Bạn có thể thay đổi tùy ý ngay trong giỏ hàng.",
        img: "/add_cart.jpg",
    },
    {
        title: "Bước 4: Nhập thông tin giao hàng",
        description:
            "Điền họ tên, số điện thoại, địa chỉ nhận hàng và chọn thời gian giao phù hợp.",
        img: "/address.jpg",
    },
    {
        title: "Bước 5: Thanh toán & xác nhận",
        description: "Bạn phải thanh toán online mới có thể được xác nhận đặt hàng.",
        img: "/address.jpg",
    },
    {
        title: "Bước 6: Nhận hộp nguyên liệu tại nhà",
        description:
            "Đội ngũ ĂnBox sẽ giao đến tận nơi, đúng thời gian bạn đã chọn. Chỉ cần mở hộp, làm theo công thức hướng dẫn và thưởng thức bữa ăn trọn vị! 🍴",
        img: "/recieve.jpg",
    },
];

export default function HowItWorksPage() {
    return (
        <div className="bg-[#FFF8F2] text-gray-800">
            <div
                className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/box_baner.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-5xl font-bold mb-4">Cách hoạt động</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Hộp nguyên liệu nấu ăn trọn gói với công thức chuẩn đầu bếp – giao tận
                        nơi, giúp bạn nấu nhanh món ngon tại nhà chỉ trong 15 phút.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "" : "md:flex-row-reverse"
                            }`}
                    >
                        <div className="w-full md:w-1/2">
                            <img
                                src={step.img}
                                alt={step.title}
                                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        <div className="md:w-1/2 space-y-4">
                            <h2 className="text-2xl font-semibold text-orange-600">
                                {step.title}
                            </h2>
                            <p className="text-gray-700">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
