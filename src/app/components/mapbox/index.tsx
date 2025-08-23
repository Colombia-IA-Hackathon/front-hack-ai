"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Extend context to expose flyTo helper
import { MapContext } from "./mapbox-context";

mapboxgl.accessToken = process.env.MAP_BOX_API_KEY!;

type MapComponentProps = {
	initialViewState: {
		longitude: number;
		latitude: number;
		zoom: number;
	};
	onMapClick?: (lngLat: { lng: number; lat: number }) => void;
	children?: React.ReactNode;
};

const flyTo = (map: mapboxgl.Map | null, lng: number, lat: number, zoom: number = 1) => {
	if (map) {
		map.flyTo({ center: [lng, lat], zoom });
	}
};

export default function MapProvider({ initialViewState, onMapClick, children }: MapComponentProps) {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!mapContainerRef.current || map.current) return;

		map.current = new mapboxgl.Map({
			projection: "globe",
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/standard",
			center: [initialViewState.longitude, initialViewState.latitude],
			zoom: initialViewState.zoom,
			attributionControl: false,
			logoPosition: "bottom-right",
		});

		// Add navigation and scale controls always
		map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
		map.current.addControl(new mapboxgl.ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-right");

		map.current.on("load", () => {
			setLoaded(true);
		});

		// Always allow click to flyTo and call onMapClick
		map.current.on("click", (e) => {
			flyTo(map.current, e.lngLat.lng, e.lngLat.lat);
			if (onMapClick) {
				onMapClick({ lng: e.lngLat.lng, lat: e.lngLat.lat });
			}
		});

		return () => {
			if (map.current) {
				map.current.remove();
				map.current = null;
			}
		};
	}, [initialViewState, onMapClick]);

	return (
		<div className='relative w-full h-[400px]'>
			<div ref={mapContainerRef} className='absolute inset-0 w-full h-full rounded-lg shadow' />
			<MapContext.Provider value={{ map: map.current!, flyTo: (lng: number, lat: number, zoom = 14) => flyTo(map.current, lng, lat, zoom) }}>
				{children}
			</MapContext.Provider>
			{!loaded && (
				<div className='absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]'>
					<div className='text-lg font-medium'>Loading map...</div>
				</div>
			)}
		</div>
	);
}
