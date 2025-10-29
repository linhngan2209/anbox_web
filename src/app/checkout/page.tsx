'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, User, Phone, Mail, MessageSquare, CreditCard, CheckCircle, AlertCircle, Package, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import OrderService from '@/service/orderService';
import { useCart } from '@/contexts/cartContext';


interface DeliveryInfo {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
}

interface DeliveryDate {
    date: string;
    timeSlot: string;
}

const CheckoutPage = () => {
    const router = useRouter();
    const [orderData, setOrderData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { clearCart } = useCart();
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
    });

    const [deliveryDates, setDeliveryDates] = useState<DeliveryDate[]>([
        { date: '', timeSlot: '8:00 - 10:00' }
    ]);

    useEffect(() => {
        const savedOrder = localStorage.getItem('checkout_order');
        if (!savedOrder) {
            toast.error('Không tìm thấy đơn hàng. Vui lòng quay lại giỏ hàng.');
            router.push('/cart');
            return;
        }

        const order = JSON.parse(savedOrder);
        setOrderData(order);
        setIsLoading(false);
    }, [router]);

    if (isLoading || !orderData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    const { items: cartItems, subtotalDish, subtotalAppliance, discount, shippingFee, total, planName, totalMeals } = orderData;
    const dishItems = cartItems.filter((i: any) => i.type === 'dish');
    const applianceItems = cartItems.filter((i: any) => i.type === 'appliance');

    const getDeliveryDaysCount = () => {
        if (totalMeals === 7) {
            return 2;
        }
        return 1;
    };

    const handleAddDeliveryDate = () => {
        if (deliveryDates.length < getDeliveryDaysCount()) {
            setDeliveryDates([...deliveryDates, { date: '', timeSlot: '8:00 - 10:00' }]);
        }
    };

    const handleRemoveDeliveryDate = (index: number) => {
        if (deliveryDates.length > 1) {
            setDeliveryDates(deliveryDates.filter((_, i) => i !== index));
        }
    };

    const handleDeliveryDateChange = (index: number, field: keyof DeliveryDate, value: string) => {
        const newDates = [...deliveryDates];
        newDates[index][field] = value;
        setDeliveryDates(newDates);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.address) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        for (let i = 0; i < deliveryDates.length; i++) {
            if (!deliveryDates[i].date) {
                toast.error(`Vui lòng chọn ngày giao hàng lần ${i + 1}!`);
                return;
            }
        }

        const orderPayload = {
            deliveryInfo,
            deliveryDates,
            items: orderData.items,
            price: orderData.total,
            planName: orderData.planName,
            totalMeals: orderData.totalMeals,
            timestamp: Date.now()
        };

        try {
            const createdOrder = await OrderService.createOrder(orderPayload);
            toast.success('Đặt hàng thành công!');
            clearCart();
            localStorage.removeItem('checkout_order');
            localStorage.removeItem('weekly_menu_cart');
            localStorage.removeItem('weekly_menu_maxMeals');
            router.push(`/`);
        } catch (error) {
            toast.error('Đặt hàng thất bại. Vui lòng thử lại.');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/cart')}
                        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại giỏ hàng
                    </button>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Thanh Toán</h1>
                    <p className="text-gray-600">Vui lòng điền đầy đủ thông tin để hoàn tất đơn hàng</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-orange-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Thông Tin Nhận Hàng</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Họ và tên <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                value={deliveryInfo.fullName}
                                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                                                placeholder="Nguyễn Văn A"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                required
                                                value={deliveryInfo.phone}
                                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                                                placeholder="0123456789"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={deliveryInfo.email}
                                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Địa chỉ nhận hàng <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={deliveryInfo.address}
                                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                                            placeholder="Số nhà, tên đường, quận/huyện, thành phố..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Ghi chú (không bắt buộc)
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <textarea
                                            value={deliveryInfo.notes}
                                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                                            rows={3}
                                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                                            placeholder="Ghi chú về địa chỉ hoặc yêu cầu đặc biệt..."
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Thời Gian Nhận Hàng</h2>
                                        <p className="text-sm text-gray-600">
                                            {totalMeals === 7
                                                ? 'Gói 7 ngày - Giao 2 lần/tuần để đảm bảo độ tươi'
                                                : `Gói ${totalMeals} món - Giao 1 lần`}
                                        </p>
                                    </div>
                                </div>

                                {totalMeals === 7 && deliveryDates.length < 2 && (
                                    <button
                                        type="button"
                                        onClick={handleAddDeliveryDate}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-semibold"
                                    >
                                        + Thêm ngày giao
                                    </button>
                                )}
                            </div>

                            {/* Danh sách ngày giao */}
                            <div className="space-y-4">
                                {deliveryDates.map((delivery, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-gray-800">
                                                {totalMeals === 7 ? `Lần giao ${index + 1}` : 'Ngày giao hàng'}
                                            </h3>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveDeliveryDate(index)}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                >
                                                    Xóa
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ngày giao <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={delivery.date}
                                                    onChange={(e) => handleDeliveryDateChange(index, 'date', e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                                                />
                                            </div>

                                            {/* Khung giờ giao hàng */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Khung giờ giao <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    required
                                                    value={delivery.timeSlot}
                                                    onChange={(e) => handleDeliveryDateChange(index, 'timeSlot', e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                                                >
                                                    <option value="">Chọn khung giờ</option>
                                                    <option value="9:30-11:30">9:30–11:30 (Trưa)</option>
                                                    <option value="17:00-19:00">17:00–19:00 (Tối)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-blue-800">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Giao trưa 9:30–11:30 • Giao tối 17:00–19:00</li>
                                            <li>Đặt trước ít nhất 2 ngày (đơn sau cut-off chuyển sang slot kế tiếp)</li>
                                            <li>Meal Plan 7 ngày có thể tách giao 2 lần/tuần để giữ độ tươi</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Đơn Hàng</h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item: any, index: any) => (
                                    <div key={index} className="flex items-center gap-3 pb-4 border-b border-gray-200">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Package className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                {item.servings} người × {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-800">{item.price.toLocaleString()}đ</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price summary */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính</span>
                                    + <span>{(subtotalDish + subtotalAppliance).toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí giao hàng</span>
                                    <span>{shippingFee.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                                    <span>Tổng cộng</span>
                                    <span className="text-orange-600">{total.toLocaleString()}đ</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <CreditCard className="w-5 h-5 text-orange-600" />
                                    <h3 className="font-bold text-gray-800">Thanh Toán QR Code</h3>
                                </div>

                                <div className="bg-white p-2 rounded-lg mb-4 ">
                                    <div className="w-full aspect-square bg-gray-200 rounded-lg flex flex-col items-center justify-center h-[350px]">
                                        <img
                                            src="/Qr.png"
                                            alt="QR Code thanh toán"
                                            className="w-full h-full "
                                        />
                                    </div>


                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">
                                            <span className="font-semibold">Nội dung CK:</span> ANBOX [SĐT]
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">Chuyển đúng số tiền và nội dung</p>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">Đơn hàng xác nhận sau 5-10 phút</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Xác Nhận Đặt Hàng
                            </button>

                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-yellow-800">
                                        Vui lòng chuyển khoản sau khi đặt hàng. Đơn hàng sẽ được xử lý sau khi nhận được thanh toán.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;