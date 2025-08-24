import { create } from "zustand";

interface ContractState {
	contractSend: boolean;
	setContractSend: (send: boolean) => void;
}

export const useContractStore = create<ContractState>((set) => ({
	contractSend: false,
	setContractSend: (send: boolean) => set({ contractSend: send }),
}));
