'use client';

import React, { useState, useEffect } from 'react';
import {
    Package,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Clock,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    XCircle,
    Loader2,
    AlertCircle,
    User,
    FileText,
    ShoppingBag
} from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import OrderService from '@/service/orderService';

interface Order {
    _id: string;
    orderId: string;
    userId: string;
    deliveryInfo: {
        fullName: string;
        phone: string;
        email: string;
        address: string;
        notes: string;
    };
    deliveryDates: Array<{
        date: string;
        timeSlot: string;
    }>;
    items: Array<{
        itemId: string;
        name: string;
        category: string;
        url: string;
        quantity: number;
        servings: string;
        type: string;
        price: number;
    }>;
    price: number;
    planName: string;
    status: string;
    paymentStatus: string;
    createdAt: string;
}

const OrderHistoryPage = () => {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để xem đơn hàng');
            router.push('/login');
            return;
        }

        fetchOrders();
    }, [isAuthenticated, router]);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const res = await OrderService.getOrdersByUser();
            setOrders(res);
        } catch (error) {
            toast.error('Không thể tải danh sách đơn hàng');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleOrderExpand = (orderId: string) => {
        const newExpanded = new Set(expandedOrders);
        if (newExpanded.has(orderId)) {
            newExpanded.delete(orderId);
        } else {
            newExpanded.add(orderId);
        }
        setExpandedOrders(newExpanded);
    };

    const getStatusInfo = (status: string) => {
        const statusMap: Record<string, { label: string; color: string; icon: any; bgColor: string }> = {
            pending_payment: {
                label: 'Chờ thanh toán',
                color: 'text-yellow-700',
                bgColor: 'bg-yellow-100',
                icon: Clock
            },
            confirmed: {
                label: 'Đã xác nhận',
                color: 'text-blue-700',
                bgColor: 'bg-blue-100',
                icon: CheckCircle
            },
            preparing: {
                label: 'Đang chuẩn bị',
                color: 'text-purple-700',
                bgColor: 'bg-purple-100',
                icon: Package
            },
            delivering: {
                label: 'Đang giao hàng',
                color: 'text-orange-700',
                bgColor: 'bg-orange-100',
                icon: Package
            },
            completed: {
                label: 'Hoàn thành',
                color: 'text-green-700',
                bgColor: 'bg-green-100',
                icon: CheckCircle
            },
            cancelled: {
                label: 'Đã hủy',
                color: 'text-red-700',
                bgColor: 'bg-red-100',
                icon: XCircle
            }
        };
        return statusMap[status] || statusMap.pending_payment;
    };

    const getPaymentStatusInfo = (status: string) => {
        return status === 'paid'
            ? { label: 'Đã thanh toán', color: 'text-green-600', icon: CheckCircle }
            : { label: 'Chưa thanh toán', color: 'text-red-600', icon: AlertCircle };
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        if (filter === 'pending') return order.status === 'pending_payment' || order.status === 'confirmed';
        if (filter === 'completed') return order.status === 'completed';
        if (filter === 'cancelled') return order.status === 'cancelled';
        return true;
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Đang tải đơn hàng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <ShoppingBag className="w-8 h-8 text-orange-600" />
                        <h1 className="text-4xl font-bold text-gray-800">Lịch Sử Đơn Hàng</h1>
                    </div>
                    <p className="text-gray-600">Quản lý và theo dõi tất cả đơn hàng của bạn</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex gap-2 overflow-x-auto">
                    {[
                        { key: 'all', label: 'Tất cả', count: orders.length },
                        { key: 'pending', label: 'Đang xử lý', count: orders.filter(o => ['pending_payment', 'confirmed', 'preparing'].includes(o.status)).length },
                        { key: 'completed', label: 'Hoàn thành', count: orders.filter(o => o.status === 'completed').length },
                        { key: 'cancelled', label: 'Đã hủy', count: orders.filter(o => o.status === 'cancelled').length }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key as any)}
                            className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-semibold transition-all ${filter === tab.key
                                ? 'bg-orange-600 text-white shadow-lg'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Chưa có đơn hàng</h3>
                        <p className="text-gray-600 mb-6">
                            {filter === 'all'
                                ? 'Bạn chưa có đơn hàng nào. Hãy đặt món ngay!'
                                : `Không có đơn hàng ${filter === 'pending' ? 'đang xử lý' : filter === 'completed' ? 'hoàn thành' : 'đã hủy'}`
                            }
                        </p>
                        <button
                            onClick={() => router.push('/menu')}
                            className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                        >
                            Khám phá thực đơn
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => {
                            const isExpanded = expandedOrders.has(order.orderId);
                            const statusInfo = getStatusInfo(order.status);
                            const paymentInfo = getPaymentStatusInfo(order.paymentStatus);
                            const StatusIcon = statusInfo.icon;
                            const PaymentIcon = paymentInfo.icon;

                            return (
                                <div
                                    key={order._id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-orange-200 transition-all"
                                >
                                    <div
                                        className="p-6 cursor-pointer"
                                        onClick={() => toggleOrderExpand(order.orderId)}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-800">
                                                        {order.orderId}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.bgColor} ${statusInfo.color} flex items-center gap-1`}>
                                                        <StatusIcon className="w-4 h-4" />
                                                        {statusInfo.label}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(order.createdAt)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Package className="w-4 h-4" />
                                                        {order.items.length} món
                                                    </div>
                                                    <div className={`flex items-center gap-1 ${paymentInfo.color} font-medium`}>
                                                        <PaymentIcon className="w-4 h-4" />
                                                        {paymentInfo.label}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-orange-600 mb-2">
                                                    {order.price.toLocaleString('vi-VN')}đ
                                                </p>
                                                <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                                                    {isExpanded ? (
                                                        <>Ẩn chi tiết <ChevronUp className="w-5 h-5" /></>
                                                    ) : (
                                                        <>Xem chi tiết <ChevronDown className="w-5 h-5" /></>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {order.planName && (
                                            <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg text-orange-700 font-semibold text-sm">
                                                <FileText className="w-4 h-4" />
                                                {order.planName}
                                            </div>
                                        )}
                                    </div>

                                    {isExpanded && (
                                        <div className="border-t border-gray-200 bg-gray-50">
                                            <div className="p-6 space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="bg-white rounded-xl p-4">
                                                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                            <User className="w-5 h-5 text-orange-600" />
                                                            Thông tin nhận hàng
                                                        </h4>
                                                        <div className="space-y-2 text-sm">
                                                            <p className="text-gray-700">
                                                                <span className="font-semibold">Người nhận:</span> {order.deliveryInfo.fullName}
                                                            </p>
                                                            <p className="text-gray-700 flex items-center gap-2">
                                                                <Phone className="w-4 h-4" />
                                                                {order.deliveryInfo.phone}
                                                            </p>
                                                            {order.deliveryInfo.email && (
                                                                <p className="text-gray-700 flex items-center gap-2">
                                                                    <Mail className="w-4 h-4" />
                                                                    {order.deliveryInfo.email}
                                                                </p>
                                                            )}
                                                            <p className="text-gray-700 flex items-start gap-2">
                                                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                                {order.deliveryInfo.address}
                                                            </p>
                                                            {order.deliveryInfo.notes && (
                                                                <p className="text-gray-600 italic mt-2 p-2 bg-yellow-50 rounded">
                                                                    💬 {order.deliveryInfo.notes}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="bg-white rounded-xl p-4">
                                                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                            <Calendar className="w-5 h-5 text-green-600" />
                                                            Lịch giao hàng
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {order.deliveryDates.map((delivery, idx) => (
                                                                <div key={idx} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                                                                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                                        {idx + 1}
                                                                    </div>
                                                                    <div className="text-sm">
                                                                        <p className="font-semibold text-gray-800">
                                                                            {new Date(delivery.date).toLocaleDateString('vi-VN', {
                                                                                weekday: 'long',
                                                                                day: '2-digit',
                                                                                month: '2-digit',
                                                                                year: 'numeric'
                                                                            })}
                                                                        </p>
                                                                        <p className="text-gray-600 flex items-center gap-1">
                                                                            <Clock className="w-3 h-3" />
                                                                            {delivery.timeSlot}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-xl p-4">
                                                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                        <Package className="w-5 h-5 text-orange-600" />
                                                        Món ăn đã đặt ({order.items.length})
                                                    </h4>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                                                                <img
                                                                    src={item.url}
                                                                    alt={item.name}
                                                                    className="w-20 h-20 object-cover rounded-lg"
                                                                />
                                                                <div className="flex-1">
                                                                    <h5 className="font-semibold text-gray-800 mb-1">
                                                                        {item.name}
                                                                    </h5>
                                                                    <p className="text-sm text-gray-600">
                                                                        {item.servings} người • {item.quantity}x
                                                                    </p>
                                                                    <p className="text-sm font-semibold text-orange-600 mt-1">
                                                                        {item.price.toLocaleString('vi-VN')}đ
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;