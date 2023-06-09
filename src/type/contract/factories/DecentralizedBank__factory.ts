/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
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
    return new Interface(_abi) as DecentralizedBankInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): DecentralizedBank {
    return new Contract(address, _abi, runner) as unknown as DecentralizedBank;
  }
}
