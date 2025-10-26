import { axiosInstance } from "./config";

class OrderService {
    async createOrder(orderData: any) {
        const response = await axiosInstance.post(`/orders/create-order`, orderData);
        return response.data;
    }

    async getOrdersByUser() {
        const response = await axiosInstance.get(`/orders/orders-by-user`,);
        return response.data;
    }

    async getOrderById(orderId: string) {
        const response = await axiosInstance.get(`/orders/${orderId}`);
        return response.data;
    }

    async updateOrder(orderId: string, updateData: any) {
        const response = await axiosInstance.patch(`/orders/${orderId}`, updateData);
        return response.data;
    }

    async deleteOrder(orderId: string) {
        const response = await axiosInstance.delete(`/orders/${orderId}`);
        return response.data;
    }
}

export default new OrderService();
