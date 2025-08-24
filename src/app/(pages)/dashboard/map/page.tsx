"use client";
import MapProvider from "@/app/components/mapbox";
import Chat from "@/app/components/chat";
import { unstable_ViewTransition as ViewTransition } from "react";
import { useMemo } from "react";

const MapView = () => {
	const initialViewState = useMemo(
		() => ({
			longitude: -74.2973,
			latitude: 4.5709,
			zoom: 1,
		}),
		[]
	);

	return (
		<div className='container mx-auto p-4 transition-all duration-300'>
			<div className='grid lg:grid-cols-2 grid-cols-1 gap-5 h-full'>
				<MapProvider initialViewState={initialViewState} />
				<ViewTransition name='chat-page'>
					<div className='h-[50vh] md:h-full transform transition-all duration-300'>
						<Chat />
					</div>
				</ViewTransition>
			</div>
		</div>
	);
};

export default MapView;
