import { AxiosResponse } from "axios";
import { axiosInstance } from "./config";
import { Recipe } from "@/types/menu";

class MenuService {
    async getListMenu(): Promise<Recipe[]> {
        const response: AxiosResponse<Recipe[]> = await axiosInstance.get("/recipes");
        return response.data;
    }

    async getListMenuUpcoming(): Promise<Recipe[]> {
        const response: AxiosResponse<Recipe[]> = await axiosInstance.get("/recipes/category/upcoming");
        return response.data;
    }

    async getListTrend(): Promise<Recipe[]> {
        const response: AxiosResponse<Recipe[]> = await axiosInstance.get("/recipes/random");
        return response.data;
    }
}

export default new MenuService();
