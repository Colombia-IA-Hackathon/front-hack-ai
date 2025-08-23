"use client";
import MapProvider from "@/app/components/mapbox";
import { useState } from "react";
import Chat from "@/app/components/chat";

const MapView = () => {
	const [isOpenChat, setIsOpenChat] = useState(false);

	return (
		<div className='container mx-auto'>
			<div className='grid grid-cols-2 gap-5'>
				<MapProvider
					initialViewState={{
						longitude: -74.006,
						latitude: 40.7128,
						zoom: 10,
					}}
					onMapClick={({ lng, lat }) => {
						setIsOpenChat(true);
						console.log("Latitud:", lat, "Longitud:", lng);
					}}
				/>

				<div className=''>{isOpenChat && <Chat />}</div>
			</div>
		</div>
	);
};
export default MapView;
