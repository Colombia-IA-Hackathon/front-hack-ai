"use client";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type Hex } from "viem";
import { Insurance } from ".";
import { ContractError, ServiceResult } from "@/models/api.model";

export function useCreateInsuranceClone(
  insurance: Insurance
): UseMutationResult<Hex, ContractError, void> {
  return useMutation<Hex, ContractError, void>({
    mutationFn: async (): Promise<Hex> => {
      const result: ServiceResult<Hex> =
        await insurance.createInsuranceClone(/* _vars */);
      if (!result.success) throw result.error;
      return result.data!; // Hex string of the transaction hash
    },
  });
}
