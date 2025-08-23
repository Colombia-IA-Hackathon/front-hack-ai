"use client";
import MapProvider from "@/app/components/mapbox";

const Home = () => {
	return (
		<div className='container mx-auto p-6'>
			<div className='grid grid-cols-12 gap-5'>
				{/* Map - Large section */}
				<div className='col-span-7 row-span-2 bg-white rounded-2xl shadow-sm overflow-hidden h-[450px] border border-gray-100'>
					<MapProvider
						initialViewState={{
							longitude: -74.006,
							latitude: 40.7128,
							zoom: 10,
						}}
						onMapClick={({ lng, lat }) => {
							console.log("Latitud:", lat, "Longitud:", lng);
						}}
					/>
				</div>

				{/* Medium section 1 */}
				<div className='col-span-5 bg-blue-50 rounded-2xl shadow-sm p-5 border border-blue-100'>
					<h2 className='text-lg font-semibold'>Location Data</h2>
					<p className='text-gray-600 mt-2'>View and analyze location information</p>
				</div>

				{/* Medium section 2 */}
				<div className='col-span-5 bg-green-50 rounded-2xl shadow-sm p-5 border border-green-100'>
					<h2 className='text-lg font-semibold'>Statistics</h2>
					<p className='text-gray-600 mt-2'>Key metrics and statistics</p>
				</div>

				{/* Small section 1 */}
				<div className='col-span-4 bg-purple-50 rounded-2xl shadow-sm p-5 border border-purple-100'>
					<h2 className='text-lg font-semibold'>Recent</h2>
					<p className='text-gray-600 mt-2'>Latest updates</p>
				</div>

				{/* Small section 2 */}
				<div className='col-span-4 bg-amber-50 rounded-2xl shadow-sm p-5 border border-amber-100'>
					<h2 className='text-lg font-semibold'>Alerts</h2>
					<p className='text-gray-600 mt-2'>Important notifications</p>
				</div>

				{/* Small section 3 */}
				<div className='col-span-4 bg-pink-50 rounded-2xl shadow-sm p-5 border border-pink-100'>
					<h2 className='text-lg font-semibold'>Actions</h2>
					<p className='text-gray-600 mt-2'>Quick actions</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
