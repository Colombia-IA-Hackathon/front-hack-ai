"use client";
import { type Hex, type WalletClient } from "viem";

import { BaseContract } from "../base-contract";

import { Insurance as InsuranceContract } from "../../../../assets/contracts/json/Insurance";
import { parseContractError } from "../../../../config/contract.config";
import { ServiceResult } from "@/models/api.model";

export class Insurance extends BaseContract {
  constructor(walletClient?: WalletClient) {
    super(InsuranceContract, walletClient);
  }

  // =========================
  //        WRITE METHODS
  // =========================

  async createInsuranceClone(): Promise<ServiceResult<Hex>> {
    try {
      const publicClient = this.getPublicClient();
      const contract = this.getWriteContract();
      const hash = await contract.write.createInsuranceClone([]);

      await publicClient.waitForTransactionReceipt({ hash });

      return { success: true, data: hash };
    } catch (error) {
      const parsedError = parseContractError(error, "createInsuranceClone");
      console.error("❌", parsedError);
      return { success: false, error: parsedError };
    }
  }
}
