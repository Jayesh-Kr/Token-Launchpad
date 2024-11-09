import React, { useContext } from "react";
import "./tokendetails.css";
import { WalletContext } from "@solana/wallet-adapter-react";

const TokenDetails = ({ token, onBack }) => {
  const connected = useContext(WalletContext);
  console.log(token.tokenName);
  console.log(token);

  return (
    <div className="tokendetails_container">
      <h1>Token Details</h1>
      {connected.connected ? (
        <div className="tokendetails_card">
          {/* Photo , Symbol and Name */}
          <div className="upper_div">
            <div className="img">
              <img
                src={token.imageUrl}
                // width={100}
                alt={token.tokenName}
              />
            </div>
            <div className="token_symbol">
              <p>{token.tokenName}</p>
              <p>{token.tokenSymbol}</p>
            </div>
          </div>

          {/* Other details */}
          <div className="lower_div">
            <div className="details">
              <h3>Address</h3>
              <p>{token.mintAddress}</p>
            </div>
            <div className="details">
              <h3>Decimals</h3>
              <p>{token.decimals}</p>
            </div>
            <div className="details">
              <h3>Owner</h3>
              <p>{token.owner}</p>
            </div>
            <div className="details">
              <h3>Total Supply</h3>
              <p>{token.tokenAmount}</p>
            </div>
            <div className="details">
              <h3>ATA Address</h3>
              <p>{token.tokenAccountAddress}</p>
            </div>
            <div className="details">
              <h3>Metadata URI</h3>
              <a href={token.uri}>{token.uri}</a>
            </div>
          </div>

          <div className="back_btn" onClick={onBack}>
            Back
          </div>
        </div>
      ) : (
        <div className="connect_wallet">
          <p>Plz connect your wallet</p>
        </div>
      )}
    </div>
  );
};

export default TokenDetails;
