"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";

const queryClient = new QueryClient();
interface QueryProviderProps {
	children: React.ReactNode;
}

const config = getDefaultConfig({
	appName: "Insure AI",
	projectId: process.env.PROJECT_ID as string,
	chains: [sepolia],
	ssr: true,
});

export default function QueryProvider({ children }: QueryProviderProps) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
