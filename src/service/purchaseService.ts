import { AuthResponse, loginDto, registerDto } from "@/types/auth";
import { axiosInstance } from "./config";

class PurchaseService {
    
    async createPurchase(itemId: string, type: string) {
        const response = await axiosInstance.post(`/purchases/create`, { itemId, type });
        return response.data;
    }

    async isCheckPurchase(itemId: string) {
        const response = await axiosInstance.get(`/purchases/check-purchase/${itemId}`);
        return response.data;
    }

    async getItemQuiz(itemId: string) {
        const response = await axiosInstance.get(`/purchases/purchase-quiz/${itemId}`);
        return response.data;
    }

    async updateScore(itemId: string, score: number) {
        const res = await axiosInstance.put(`/purchases/update-score/${itemId}`, {score})
    }
}

export default new PurchaseService();
