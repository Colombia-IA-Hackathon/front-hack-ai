import { useMutation } from "@tanstack/react-query";
import { pushAIService } from "@/app/services/ai.service";
import { AIMessage } from "@/app/types/ai.types";
export function useChatAI() {
	return useMutation({
		mutationFn: (newPrompt: AIMessage) => pushAIService(newPrompt),
	});
}
