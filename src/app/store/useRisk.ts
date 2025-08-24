import { create } from "zustand";

interface RiskState {
	riskLevel: number;
	setRiskLevel: (level: number) => void;
}

export const useRiskStore = create<RiskState>((set) => ({
	riskLevel: 0,
	setRiskLevel: (level: number) => set({ riskLevel: level }),
}));
