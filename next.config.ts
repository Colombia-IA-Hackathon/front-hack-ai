import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		MAP_BOX_API_KEY: process.env.MAP_BOX_API_KEY,
	},
};

export default nextConfig;
