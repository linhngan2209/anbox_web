import { AuthResponse, loginDto, registerDto } from "@/types/auth";
import { axiosInstance } from "./config";

class AuthService {
  async login(data: loginDto) {
    const response = await axiosInstance.post("/auth/login", data);
    return response;
  }

  async register(data: registerDto) {
    const response = await axiosInstance.post("/auth/register", data);
    return response;
  }
}

export default new AuthService();
