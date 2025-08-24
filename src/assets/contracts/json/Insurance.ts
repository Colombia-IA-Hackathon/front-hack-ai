export const Insurance = {
  address: "0x65120d3D90eF117834e6ed09C7848EA8C075Fa61",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_implementation",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "FailedDeployment",
      type: "error",
    },
    {
      inputs: [],
      name: "ImplementationNotSet",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "InsufficientBalance",
      type: "error",
    },
    {
      inputs: [],
      name: "ZeroAddress",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "deployer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "nonce",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "clone",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "implementation",
          type: "address",
        },
      ],
      name: "InsuranceCloneCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "oldImpl",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newImpl",
          type: "address",
        },
      ],
      name: "InsuranceImplementationUpdated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "deployer",
          type: "address",
        },
      ],
      name: "clonesByDeployer",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "createInsuranceClone",
      outputs: [
        {
          internalType: "address",
          name: "clone",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "usedNonce",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "insuranceImplementation",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "nonces",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "deployer",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "nonce_",
          type: "uint256",
        },
      ],
      name: "predictClone",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "predictNextCloneForSender",
      outputs: [
        {
          internalType: "address",
          name: "predicted",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "nextNonce",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_implementation",
          type: "address",
        },
      ],
      name: "setInsuranceImplementation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
