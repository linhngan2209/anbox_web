import { AuthResponse, loginDto, registerDto } from "@/types/auth";
import { axiosInstance } from "./config";

class QuestionsService {

    async getListQuestions() {
        const response = await axiosInstance.get("/questions/get-list-questions");
        return response;
    }

    async getQuestionById(id: string) {
        const response = await axiosInstance.get(`questions/${id}/questions`);
        return response.data;
    }

    async getTopicById(id: string) {
        const response = await axiosInstance.get(`questions/question/${id}`);
        return response.data;
    }
}

export default new QuestionsService();
