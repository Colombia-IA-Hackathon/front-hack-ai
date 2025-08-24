import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		MAP_BOX_API_KEY: process.env.MAP_BOX_API_KEY,
		AI_WEBHOOK_URL: process.env.AI_WEBHOOK_URL,
		PROJECT_ID: process.env.PROJECT_ID,
	},
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
