"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
	id: string;
	content: string;
	sender: "user" | "bot";
	timestamp: Date;
}

interface HistoryChatState {
	messages: Message[];
	addMessage: (message: Message) => void;
	addUserMessage: (content: string) => Message;
	addBotMessage: (content: string) => Message;
	clearMessages: () => void;
}

export const useHistoryChat = create<HistoryChatState>()(
	persist(
		(set, get) => ({
			messages: [],

			addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

			addUserMessage: (content) => {
				const message: Message = {
					id: Date.now().toString(),
					content,
					sender: "user",
					timestamp: new Date(),
				};
				get().addMessage(message);
				return message;
			},

			addBotMessage: (content) => {
				const message: Message = {
					id: Date.now().toString() + "-bot",
					content,
					sender: "bot",
					timestamp: new Date(),
				};
				get().addMessage(message);
				return message;
			},

			clearMessages: () => set({ messages: [] }),
		}),
		{
			name: "chat-history",
		}
	)
);
