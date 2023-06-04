/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  DecentralizedBank,
  DecentralizedBankInterface,
} from "../DecentralizedBank";

const _abi = [
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
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
] as const;

export class DecentralizedBank__factory {
  static readonly abi = _abi;
  static createInterface(): DecentralizedBankInterface {
    return new utils.Interface(_abi) as DecentralizedBankInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DecentralizedBank {
    return new Contract(address, _abi, signerOrProvider) as DecentralizedBank;
  }
}