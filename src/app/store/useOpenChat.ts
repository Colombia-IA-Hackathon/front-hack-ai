import { create } from "zustand";

interface OpenChatState {
	isOpen: boolean;
	openChat: () => void;
	closeChat: () => void;
	toggleChat: () => void;
}

export const useOpenChat = create<OpenChatState>((set) => ({
	isOpen: false,
	openChat: () => set({ isOpen: true }),
	closeChat: () => set({ isOpen: false }),
	toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
}));
