import React, { useContext, useEffect, useState } from "react";
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import {
  useConnection,
  useWallet,
  WalletContext,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const useToken = () => {
  const [tokens, setTokens] = useState([]);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const connected = useContext(WalletContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected) return;
    getAccounts();
  }, [connected]);

  let getAccounts = async () => {
    setLoading(true);
    try {
      if (publicKey) {
        const splTokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { programId: TOKEN_2022_PROGRAM_ID }
        );
        const processedAccounts = splTokenAccounts.value.map(
          async (account) => {
            const tokenAccountAddress = account.pubkey.toBase58();
            const tokenAmount =
              account.account.data.parsed.info.tokenAmount.uiAmount;
            const mintAddress = account.account.data.parsed.info.mint;
            const decimals =
              account.account.data.parsed.info.tokenAmount.decimals;
            const owner = account.account.data.parsed.info.owner;
            const tokenMetadata = await getTokenMetadata(
              connection,
              new PublicKey(mintAddress)
            );
            const uriDetails = await fetch(tokenMetadata.uri);
            const metadata = await uriDetails.json();
            return {
              tokenAccountAddress,
              tokenAmount,
              mintAddress,
              tokenName: tokenMetadata.name,
              tokenSymbol: tokenMetadata.symbol,
              imageUrl: metadata.image,
              decimals,
              uri: tokenMetadata.uri,
              owner,
            };
          }
        );
        const tokens = await Promise.all(processedAccounts);
        // console.log(tokens);
        setTokens(tokens);
      }
    } catch (error) {
      console.error("Error fetching tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    getAccounts,
    publicKey,
    connected,
    connection,
    tokens,
    setTokens,
  };
};

export default useToken;
