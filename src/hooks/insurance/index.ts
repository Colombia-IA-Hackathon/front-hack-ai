"use client";
import { type WalletClient } from "viem";
import { Insurance } from "@/services/blockchain/contracts/insurance";
import { useCreateInsuranceClone } from "@/services/blockchain/contracts/insurance/useCreateInsuranceClone";

export function useInsurance(walletClient?: WalletClient) {
  const insurance = new Insurance();

  if (walletClient) {
    insurance.setWalletClient(walletClient);
  }

  const createInsuranceClone = useCreateInsuranceClone(insurance);

  return { createInsuranceClone };
}
