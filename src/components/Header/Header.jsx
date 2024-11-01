import "./header.css";
import React, { useMemo } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useContext } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletContext } from "@solana/wallet-adapter-react";
import danger from "../../assets/danger.png"
const Header = () => {
  const { connected } = useContext(WalletContext);
  return (
    <nav>
        {!connected && (
            <div className="asktoconnect">
                <img src={danger} alt="Danger icon" className="icon_danger" />
                <p>Connect to your wallet</p>
                </div>
        )}
      <div className="navbar_links">
        <div className="nav_links_box">
          <div className="nav_links">Home</div>
        {connected && (
            <>
          <div className="nav_links">Create Token</div>
          <div className="nav_links">My Tokens</div>
          <div className="nav_links">Airdrop</div>
          <div className="nav_links">Create Pool</div>
          <div className="nav_links">Token Swap</div>
          </>
        )
        }
        </div>
        
        <div className="nav_links logo">Token Launchpad</div>
        <div className="nav_links wallet_connect">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
