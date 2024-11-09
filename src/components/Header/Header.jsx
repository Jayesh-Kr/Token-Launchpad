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
import danger from "../../assets/danger.png";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/">
            {" "}
            <div className="nav_links">Home</div>
          </NavLink>
          {connected && (
            <>
              <NavLink to="/airdrop">
                {" "}
                <div className="nav_links">Airdrop</div>
              </NavLink>
              <NavLink to="/sendsol">
                {" "}
                <div className="nav_links">Send Solana</div>
              </NavLink>
              <NavLink to="/createtoken">
                {" "}
                <div className="nav_links">Create Token</div>
              </NavLink>
              <NavLink to="/createtokenwithmetadata">
                {" "}
                <div className="nav_links">Create Token With Meta Data</div>
              </NavLink>
              <NavLink to="/mytokens">
                {" "}
                <div className="nav_links">My Tokens</div>
              </NavLink>
              <NavLink to="/sendtoken">
                {" "}
                <div className="nav_links">Send Token</div>
              </NavLink>
            </>
          )}
        </div>

        {/* <div className="nav_links logo">Token Launchpad</div> */}
        <div className="nav_links wallet_connect">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
