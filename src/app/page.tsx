"use client";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components";
import { DECENTRALIZED_BANK_ADDRESS, decentralizedBankAbi } from "@/config";
import { DecentralizedBank } from "@/type";
import { shortenAddress } from "@/utils";

export default function Home() {
  const [web3Provider, setWeb3Provider] = useState<ethers.BrowserProvider>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [bankBalance, setBankBalance] = useState(0);

  const connectWallet = async () => {
    const signer = await web3Provider!.getSigner();
    setSigner(signer);

    const address = await signer.getAddress();
    setAddress(address);
    console.log(`Connected to ${address}`);
  };

  const getWalletBalance = async () => {
    if (!address) return;
    const balance = await web3Provider!.getBalance(address);
    setBalance(Number(ethers.formatEther(balance)));
    console.log(`Get wallet balance success`);
  };

  const getDecentralizedBankContract = () => {
    return new ethers.Contract(
      DECENTRALIZED_BANK_ADDRESS,
      decentralizedBankAbi,
      signer
    ) as unknown as DecentralizedBank;
  };

  const getBankBalance = async () => {
    if (!address) return;

    const decentralizedBank = getDecentralizedBankContract();
    const balance = await decentralizedBank.getBalance();
    setBankBalance(Number(ethers.formatEther(balance)));

    console.log(`Get bank balance success`);
  };

  const depositBtn = async () => {
    const decentralizedBank = getDecentralizedBankContract();
    const tx = await decentralizedBank.deposit({
      value: ethers.parseEther("0.001"),
    });
    await tx.wait(1);
    getWalletBalance();
    getBankBalance();

    console.log(`Deposit success`);
  };

  const withdrawBtn = async () => {
    const decentralizedBank = getDecentralizedBankContract();
    const tx = await decentralizedBank.withdraw();
    await tx.wait(0);
    getWalletBalance();
    getBankBalance();

    console.log(`Widthdraw success`);
  };

  useEffect(() => {
    const requestConnect = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setWeb3Provider(provider);
      }
    };

    requestConnect();
  }, []);

  useEffect(() => {
    const getAccountInfo = async () => {
      if (web3Provider) {
        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          connectWallet();
        }
      }
    };

    getAccountInfo();
  }, [web3Provider]);

  useEffect(() => {
    getWalletBalance();
    getBankBalance();
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-7 md:p-24">
      {/* Header */}
      <div className="w-full flex justify-between">
        <div>
          <Image src="./logo.svg" width={100} height={20} alt="SVB Logo" />
        </div>
        <div>
          {web3Provider ? (
            !address ? (
              <Button variant="light" onClick={connectWallet}>
                Connect wallet
              </Button>
            ) : (
              <Button variant="light" disabled>
                Connected: {shortenAddress(address)}
              </Button>
            )
          ) : (
            <Button variant="light" className="hover:underline">
              <a href="https://google.com" target="_blank">
                Please install MetaMask
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col w-full md:w-1/2 max-w-md items-center space-y-10">
        <div className="font-fira-sans font-bold text-4xl md:text-5xl uppercase">
          Your account
        </div>

        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <div>Account balance:</div>
            <div>{bankBalance.toFixed(4)} ETH</div>
          </div>
          <div className="flex justify-between">
            <div>Wallet balance:</div>
            <div>{balance.toFixed(4)} ETH</div>
          </div>
        </div>

        <div className="flex justify-between w-full space-x-5">
          {!address ? (
            <div className="flex-1">
              <Button className="w-full" onClick={connectWallet}>
                Please connect wallet first
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1">
                <Button className="w-full" onClick={depositBtn}>
                  Deposit
                </Button>
              </div>
              <div className="flex-1">
                <Button
                  className="w-full"
                  variant="light"
                  onClick={withdrawBtn}
                >
                  Withdraw
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div>
        <div className="text-sm md:text-base">By DUY NGUYEN</div>
      </div>
    </main>
  );
}
