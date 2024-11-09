import React, { useContext, useEffect, useState } from "react";
import "./mytoken.css";

import useToken from "../../utils/useToken";
import TokenCard from "./TokenCard";
import TokenDetails from "./TokenDetails";
const MyTokens = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const { tokens, connected, loading } = useToken();

  const handleViewDetails = (token) => {
    setSelectedToken(token);
  };

  if (loading) {
    return (
      <div className="spinner_container">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      {selectedToken ? (
        <TokenDetails
          token={selectedToken}
          onBack={() => setSelectedToken(null)}
        />
      ) : (
        <div className="mytoken_container">
          <h1>My Created Tokens</h1>
          {connected.connected ? (
            <div className="mytoken_card_container">
              {tokens.map((element) => {
                return (
                  <TokenCard
                    key={element?.tokenName}
                    tokens={element}
                    onViewDetails={() => handleViewDetails(element)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="connect_wallet">
              <p>Plz connect your wallet</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyTokens;
