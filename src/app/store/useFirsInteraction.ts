import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FirstInteractionState {
	hasInteracted: boolean;
	setHasInteracted: (value: boolean) => void;
}

export const useFirstInteraction = create<FirstInteractionState>()(
	persist(
		(set) => ({
			hasInteracted: false,
			setHasInteracted: (value: boolean) => set({ hasInteracted: value }),
		}),
		{
			name: "first-interaction",
		}
	)
);
