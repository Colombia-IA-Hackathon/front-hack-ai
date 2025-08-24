"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { useGeo } from "@/app/store/useGeo";

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

export default function MapProvider({ initialViewState, onMapClick, children }: MapComponentProps) {
	const flyTo = (map: mapboxgl.Map | null, lng: number, lat: number, zoom: number = 14) => {
		if (map) {
			setCoordinates(lat, lng);
			// openChat();
			map.flyTo({ center: [lng, lat], zoom });
		}
	};
	// const addMarker = (map: mapboxgl.Map | null, lng: number, lat: number) => {
	// 	if (map) {
	// 		new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
	// 	}
	// };

	const { setCoordinates } = useGeo();
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

			// add animmation to roate globe
			antialias: true,
			pitchWithRotate: false,
			dragRotate: false,
			renderWorldCopies: false,
		});

		map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
		map.current.addControl(new mapboxgl.ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-right");

		map.current.on("load", () => {
			setLoaded(true);
		});

		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken as string,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mapboxgl: mapboxgl as any,
		});

		map.current.addControl(geocoder, "top-left");

		map.current.on("click", (e) => {
			flyTo(map.current, e.lngLat.lng, e.lngLat.lat);
			// Remove previous marker if exists
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if (map.current && (map.current as any)._lastMarker) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(map.current as any)._lastMarker.remove();
			}
			// Add new marker and store reference
			const marker = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.current!);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(map.current as any)._lastMarker = marker;
			if (onMapClick) {
				console.log("onMapClick defined");
				onMapClick({ lng: e.lngLat.lng, lat: e.lngLat.lat });
			}
		});

		return () => {
			if (map.current) {
				map.current.remove();
				map.current = null;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialViewState, onMapClick]);

	return (
		<div className='relative w-full h-full min-h-[300px]' style={{ minHeight: 300 }}>
			<div ref={mapContainerRef} className='absolute inset-0 w-full h-full rounded-lg shadow' style={{ minHeight: 300 }} />
			<MapContext.Provider value={{ map: map.current!, flyTo: (lng: number, lat: number, zoom = 14) => flyTo(map.current, lng, lat, zoom) }}>
				{children}
			</MapContext.Provider>
			{!loaded && (
				<div className='absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]'>
					<div className='flex flex-col items-center space-y-4'>
						<Image src='/insure-ai.png' alt='Loading...' width={50} height={50} />
						<div className='text-lg font-medium'>Loading map...</div>
					</div>
				</div>
			)}
		</div>
	);
}
