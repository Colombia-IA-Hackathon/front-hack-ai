import axiosInstanceWebhook from "@/app/config/axios.config";
import { AIMessage } from "../types/ai.types";

export const pushAIService = async (message: AIMessage) => {
	const response = await axiosInstanceWebhook.post("", { data: message });
	return response.data;
};
