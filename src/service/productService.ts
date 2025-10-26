import { AuthResponse, loginDto, registerDto } from "@/types/auth";
import { axiosInstance } from "./config";

class ProductService {

    async getListProduct() {
        const response = await axiosInstance.get(`/products`);
        return response.data;
    }
}

export default new ProductService();
