import React from "react";
import { ConnectWallet } from "../../components/ConnectWallet/RainbowKit.config";
import "./NavBar.css";

export const NavBar = () => {

  return (
    <nav>
        <div className="flex justify-center my-8" >
             <ConnectWallet />
        </div>
     
    </nav>
  );
};
