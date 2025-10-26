"use client";
import React from "react";

export default function PolicyPage() {
    return (
        <div className="bg-[#FFF8F2] text-gray-800 px-6 py-16">
            <div className="max-w-5xl mx-auto space-y-12">
                <h1 className="text-5xl font-bold text-orange-600 text-center mb-8">
                    Chính Sách Bán Hàng
                </h1>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        1) Phạm vi & đối tượng
                    </h2>
                    <p>
                        Phục vụ trước tại <strong>nội thành Hà Nội</strong> (Dự kiến mở rộng
                        sang các khu vực miền Bắc vào năm 2026).
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        2) Đặt hàng & thời hạn chốt đơn
                    </h2>
                    <p>
                        Để đảm bảo các nguyên liệu luôn tươi mới và được chuẩn bị đúng thời
                        gian, khách hàng vui lòng đặt hàng trước theo quy định sau:
                    </p>

                    <p className="font-medium">Bữa lẻ theo ngày:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Giao trưa: đặt trước 10h, cách ngày giao 2 ngày.</li>
                        <li>Giao tối: đặt trước 18h, cách ngày giao 2 ngày.</li>
                    </ul>

                    <p>
                        <strong>Meal Plan:</strong> chọn ngày bắt đầu trước tối thiểu 2
                        ngày.
                    </p>
                    <p>
                        Các đơn đặt sau thời gian cut-off sẽ tự động được chuyển sang slot
                        giao kế tiếp.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        3) Lịch giao hàng & phí vận chuyển
                    </h2>
                    <p>ĂnBox hiện có hai khung giờ giao cố định:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Giao trưa: 9h30 – 11h30</li>
                        <li>Giao tối: 17h00 – 19h00</li>
                    </ul>
                    <p>
                        Phí vận chuyển được tính theo khu vực và trọng lượng đơn hàng, hệ
                        thống sẽ hiển thị rõ tại trang thanh toán. Các đơn đạt ngưỡng giá
                        trị nhất định sẽ được miễn phí giao hàng.
                    </p>
                    <p>
                        Đối với gói Meal Plan, khách có thể lựa chọn tách giao 2 lần/tuần
                        để bảo đảm độ tươi ngon của nguyên liệu.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        4) Bảo quản & hạn dùng
                    </h2>
                    <p>Các sản phẩm ĂnBox được chia thành hai loại:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Hàng chilled (bảo quản mát):</strong> dùng tốt nhất trong
                            72 – 96 giờ.
                        </li>
                        <li>
                            <strong>Hàng frozen (đông lạnh):</strong> sử dụng theo hạn dùng in
                            trên nhãn.
                        </li>
                    </ul>
                    <p>
                        Khách hàng cần bảo quản đúng theo hướng dẫn trên bao bì và không tái
                        đông sản phẩm sau khi rã đông để đảm bảo chất lượng món ăn.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        5) Đổi/hoàn tiền
                    </h2>
                    <p>ĂnBox hỗ trợ đổi hoặc hoàn tiền trong các trường hợp:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Bao bì bị rách, vỡ; sản phẩm rã đông, biến chất khi nhận.
                        </li>
                        <li>Thiếu thành phần hoặc giao sai món (SKU).</li>
                    </ul>
                    <p>
                        Khách hàng vui lòng phản hồi trong vòng 24 giờ kể từ khi nhận hàng
                        và gửi kèm ảnh hoặc video lúc mở hộp để ĂnBox xác minh.
                    </p>
                    <p>
                        Chính sách không áp dụng nếu sản phẩm được bảo quản sai hướng dẫn
                        hoặc đã quá hạn sử dụng.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        6) Hủy/đổi lịch
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Bữa lẻ:</strong> có thể hủy hoặc đổi slot trước 8 giờ so
                            với thời gian giao dự kiến.
                        </li>
                        <li>
                            <strong>Meal Plan:</strong> khách có thể đổi ngày hoặc skip theo
                            quy định của từng gói. Sau khi gói đã được kích hoạt, ĂnBox không
                            hỗ trợ hủy trừ trường hợp bất khả kháng.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        7) Thanh toán
                    </h2>
                    <p>
                        ĂnBox chấp nhận các phương thức thanh toán linh hoạt:{" "}
                        <strong>
                            Chuyển khoản ngân hàng, thẻ nội địa/quốc tế, ví điện tử (VNPay,
                            Momo, ZaloPay)
                        </strong>
                        .
                    </p>
                    <p>
                        Khách hàng có nhu cầu xuất hóa đơn VAT vui lòng cung cấp thông tin
                        trước khi chốt đơn để ĂnBox hỗ trợ xuất hóa đơn đúng quy định.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-orange-600 mb-2">
                        8) Dị ứng & lưu ý sức khỏe
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Công bố allergen trên trang sản phẩm (gluten, hải sản, hạt cây,
                            sữa…).
                        </li>
                        <li>
                            Khách có yêu cầu kiêng kỵ (không ớt, ít dầu, ăn chay, low-carb…)
                            vui lòng chọn tùy biến khi đặt.
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
