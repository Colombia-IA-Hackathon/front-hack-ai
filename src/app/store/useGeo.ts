import { create } from "zustand";

interface GeoState {
	latitude: number | null;
	longitude: number | null;
	setCoordinates: (lat: number, long: number) => void;
}

export const useGeo = create<GeoState>((set) => ({
	latitude: null,
	longitude: null,
	setCoordinates: (lat, long) => set({ latitude: lat, longitude: long }),
}));
