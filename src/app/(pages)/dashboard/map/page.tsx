"use client";
import MapProvider from "@/app/components/mapbox";
import { useState } from "react";
import Chat from "@/app/components/chat";

const MapView = () => {
	const [isOpenChat, setIsOpenChat] = useState(false);

	return (
		<div className='container mx-auto p-4 h-[calc(100vh-80px)]'>
			<div className={`grid ${isOpenChat ? "md:grid-cols-2" : "grid-cols-1"} gap-5 h-full`}>
				<MapProvider
					initialViewState={{
						longitude: -74.2973,
						latitude: 4.5709,
						zoom: 5,
					}}
					onMapClick={({ lng, lat }) => {
						setIsOpenChat(true);
						console.log("Latitud:", lat, "Longitud:", lng);
					}}
					// className="h-[50vh] md:h-full"
				/>

				{isOpenChat && (
					<div className='h-[50vh] md:h-full'>
						<Chat />
					</div>
				)}
			</div>
		</div>
	);
};
export default MapView;
