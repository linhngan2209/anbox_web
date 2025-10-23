import { AuthResponse, loginDto, registerDto } from "@/types/auth";
import { axiosInstance } from "./config";

class BlogService {
    async getListBlogs() {
        const response = await axiosInstance.get("/blogs/get-list-blogs");
        return response.data;
    }

    async getBlogById(id: string) {
        const response = await axiosInstance.get(`/blogs/get-by-id/${id}`);
        return response.data;
    }
}

export default new BlogService();
