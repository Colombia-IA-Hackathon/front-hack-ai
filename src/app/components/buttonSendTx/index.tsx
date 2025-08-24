import { useInsurance } from "@/hooks/insurance";
import { Hex } from "viem";
import { useWalletClient } from "wagmi";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const ButtonTX = () => {
	const { data: walletClient } = useWalletClient();
	const { createInsuranceClone: createInsuranceCloneHook } = useInsurance(walletClient);
	const { mutate: createInsuranceClone, isPending: isCreatingInsuranceClone } = createInsuranceCloneHook;
	const onCreateInsuranceClone = async () => {
		createInsuranceClone(undefined, {
			onSuccess: (hash: Hex) => {
				toast.success(`Transaction sent: ${hash}`);
				confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
			},
			onError: (error: unknown) => {
				toast.error(`Error: ${error}`);
			},
		});
	};

	return (
		<button onClick={onCreateInsuranceClone} disabled={isCreatingInsuranceClone} className='btn btn-secondary rounded-2xl'>
			{isCreatingInsuranceClone ? "Creating..." : "Crear Seguro"}
		</button>
	);
};

export default ButtonTX;
