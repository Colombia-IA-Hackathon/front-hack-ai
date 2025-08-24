"use client";
// import { useInsurance } from "@/hooks/insurance";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { Hex } from "viem";
// import { useWalletClient } from "wagmi";

export default function Home() {
	const { address, isConnected } = useAccount();
	const router = useRouter();
	// const { data: walletClient } = useWalletClient();
	// const { createInsuranceClone: createInsuranceCloneHook } = useInsurance(walletClient);
	// const { mutate: createInsuranceClone, isPending: isCreatingInsuranceClone } = createInsuranceCloneHook;

	// const onCreateInsuranceClone = async () => {
	// 	createInsuranceClone(undefined, {
	// 		onSuccess: (hash: Hex) => {
	// 			console.log("hash:", hash);
	// 		},
	// 		onError: (error: unknown) => {
	// 			// Handle error
	// 			console.error("Error:", error);
	// 		},
	// 	});
	// };

	useEffect(() => {
		if (isConnected) {
			router.push("/dashboard/map");
		}
	}, [isConnected, router]);

	return (
		<div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
			<h2>Insure AI</h2>
			{/* <button onClick={onCreateInsuranceClone} disabled={isCreatingInsuranceClone}>
				{isCreatingInsuranceClone ? "Creating..." : "Create Insurance Clone"}
			</button> */}
			<ConnectButton />;
		</div>
	);
}
