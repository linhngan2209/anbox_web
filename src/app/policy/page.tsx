"use client";
import React from "react";

export default function PolicyPage() {
    return (
        <div className="bg-[#FFF8F2] text-gray-800 px-6 py-16">
            <div className="max-w-5xl mx-auto space-y-12">
                <h1 className="text-5xl font-bold text-orange-600 text-center mb-8">
                    Chính Sách Bán Hàng
                </h1>

                {/* 1. Phạm vi & đối tượng */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        1) Phạm vi & đối tượng
                    </h2>
                    <p>- Phục vụ trước tại nội thành Hà Nội/Hồ Chí Minh (mở rộng theo từng quý).</p>
                    <p>- Sản phẩm bảo quản mát (chilled 0–4°C) hoặc đông lạnh (frozen ≤ −18°C), kèm hướng dẫn nấu.</p>
                </section>

                {/* 2. Đặt hàng & thời hạn chốt đơn */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        2) Đặt hàng & thời hạn chốt đơn (cut-off)
                    </h2>
                    <p>- Bữa lẻ theo ngày:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Giao trưa: đặt trước 10h 2 ngày.</li>
                        <li>Giao tối: đặt trước 18h 2 ngày.</li>
                    </ul>
                    <p>- Meal Plan: chọn ngày bắt đầu trước tối thiểu 2 ngày.</p>
                    <p>- Mọi đơn sau giờ cut-off sẽ được chuyển sang slot kế tiếp.</p>
                </section>

                {/* 3. Lịch giao hàng & phí vận chuyển */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        3) Lịch giao hàng & phí vận chuyển
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Slot giao: 9:30-11:30 (trưa), 17:00–19:00 (tối).</li>
                        <li>Phí ship theo khu vực/trọng lượng; miễn phí nếu đạt ngưỡng giá trị đơn (hiển thị ở trang thanh toán).</li>
                        <li>Có thể tách giao 2 lần/tuần cho Meal Plan để bảo đảm độ tươi (không phụ phí khi đạt ngưỡng).</li>
                    </ul>
                </section>

                {/* 4. Bảo quản & hạn dùng */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        4) Bảo quản & hạn dùng
                    </h2>
                    <p>- Hàng chilled: dùng trong 72-96 giờ; frozen: theo HSD in trên nhãn.</p>
                    <p>- Bảo quản theo hướng dẫn trên bao bì; không tái đông sau khi rã đông.</p>
                </section>

                {/* 5. Đổi/hoàn tiền */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        5) Đổi/hoàn tiền (Freshness Guarantee)
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Hoàn/đổi khi: rách vỡ bao bì, rã đông/biến chất khi nhận, thiếu thành phần, giao sai SKU.</li>
                        <li>Thời gian phản hồi: trong 24 giờ kèm ảnh/video lúc mở hộp.</li>
                        <li>Không áp dụng với trường hợp bảo quản sai hướng dẫn hoặc quá hạn sử dụng.</li>
                    </ul>
                </section>

                {/* 6. Hủy/đổi lịch */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        6) Hủy/đổi lịch
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Bữa lẻ: cho phép hủy/đổi trước slot 8 giờ.</li>
                        <li>Meal Plan: cho phép đổi ngày/skip (chi tiết ở mục từng gói); không hủy khi gói đã kích hoạt trừ lý do bất khả kháng.</li>
                    </ul>
                </section>

                {/* 7. Thanh toán */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        7) Thanh toán
                    </h2>
                    <p>- COD, Chuyển khoản, Thẻ/Ví điện tử (VNPay/Momo/ZaloPay).</p>
                    <p>- Xuất hóa đơn VAT theo yêu cầu (cung cấp thông tin trước khi chốt đơn).</p>
                </section>

                {/* 8. Khuyến mãi & mã giảm giá */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        8) Khuyến mãi & mã giảm giá
                    </h2>
                    <p>- Mỗi đơn áp dụng 1 mã; không cộng dồn trừ khi nêu rõ.</p>
                    <p>- Khuyến mãi Meal Plan khác khuyến mãi bữa lẻ; ưu tiên theo chương trình có lợi nhất cho khách.</p>
                </section>

                {/* 9. Dị ứng & lưu ý sức khỏe */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        9) Dị ứng & lưu ý sức khỏe
                    </h2>
                    <p>- Công bố allergen trên trang sản phẩm (gluten, hải sản, hạt cây, sữa…).</p>
                    <p>- Khách có yêu cầu kiêng kỵ (không ớt, ít dầu, ăn chay, low-carb…) vui lòng chọn tùy biến khi đặt.</p>
                </section>

                {/* 10. Bao bì & môi trường */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        10) Bao bì & môi trường
                    </h2>
                    <p>- Bao bì an toàn thực phẩm, có thể tái chế; thu hồi đá gel/thùng cách nhiệt theo yêu cầu khi giao lần sau.</p>
                </section>
            </div>
        </div>
    );
}
