"use client";
import { useInsurance } from "@/hooks/insurance";
import { Hex } from "viem";

export default function Home() {
  const { createInsuranceClone: createInsuranceCloneHook } = useInsurance();
  const { mutate: createInsuranceClone, isPending: isCreatingInsuranceClone } =
    createInsuranceCloneHook;

  const onCreateInsuranceClone = async () => {
    createInsuranceClone(undefined, {
      onSuccess: (hash: Hex) => {
        // Handle success
        console.log("hash:", hash);
      },
      onError: (error: unknown) => {
        // Handle error
        console.error("Error:", error);
      },
    });
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h2>hola mundo</h2>
      <button
        onClick={onCreateInsuranceClone}
        disabled={isCreatingInsuranceClone}
      >
        {isCreatingInsuranceClone ? "Creating..." : "Create Insurance Clone"}
      </button>
    </div>
  );
}
