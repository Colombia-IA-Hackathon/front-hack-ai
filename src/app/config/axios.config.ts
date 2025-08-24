import axios from "axios";

const axiosInstanceWebhook = axios.create({
	baseURL: process.env.AI_WEBHOOK_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
export default axiosInstanceWebhook;
