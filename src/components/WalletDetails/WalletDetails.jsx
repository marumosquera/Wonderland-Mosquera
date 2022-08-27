import React from "react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { balance, allowance } from "../../contract/wonderland";

export const WalletDetails = () => {
  const [tokenBalance, setTokenBalance] = useState("");
  const {address} = useAccount()
    const token = "DAI";
  useEffect(() => {
    contractInfo();
  });

  const contractInfo = async () => {
    balance(address, token)
      .then((res) => {
        setTokenBalance(res);
        console.log(tokenBalance)
      })
      .catch((e) => {
        console.log(e);
      });

  };

  return <div>
    <p> Current balance in your wallet: {tokenBalance} </p>

  </div>;
};
