import React, { useContext, useState } from "react";
import { notification, Select } from "antd";
import { Transaction, PublicKey } from "@solana/web3.js";
import {
  useConnection,
  useWallet,
  WalletContext,
} from "@solana/wallet-adapter-react";
import useToken from "../../utils/useToken";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

const SendToken = () => {
  const [loading, setLoading] = useState(false);
  const [toAddress, setToaddress] = useState("");
  const [mint, setMint] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const connected = useContext(WalletContext);
  const [decimals, setDecimals] = useState(9);
  const { tokens } = useToken();

  const handleMintSelect = (value) => {
    setMint(value);
    const selectedToken = tokens.find((token) => token.mintAddress === value);
    if (selectedToken) {
      setDecimals(selectedToken.decimals);
    }
  };

  const sentToken = async () => {
    try {
      setLoading(true);
      // Getting senders' ATA address
      const associatedToken = getAssociatedTokenAddressSync(
        new PublicKey(mint),
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const account = await getAccount(
        connection,
        associatedToken,
        [],
        TOKEN_2022_PROGRAM_ID
      );
      console.log(account);
      console.log(account.address.toBase58());
      console.log(account.mint.toBase58());
      console.log(account.owner.toBase58());

      console.log("Now receivers account");
      // Getting receivers' ATA address
      const associatedToken2 = getAssociatedTokenAddressSync(
        new PublicKey(mint),
        new PublicKey(toAddress),
        false,
        TOKEN_2022_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
      console.log("Associated 2 : ", associatedToken2.toBase58());
      var account2 = "";
      console.log("Looking if receiver has ATA or not ...");
      try {
        account2 = await getAccount(
          connection,
          associatedToken2,
          [],
          TOKEN_2022_PROGRAM_ID
        );
        console.log(account2);
        console.log(account2.address.toBase58());
        console.log(account2.mint.toBase58());
        console.log(account2.owner.toBase58());
      } catch (error) {
        try {
          console.log("Creating users ATA ...");
          notification.warning({
            message: "Creating Receivers ATA",
            description: "Do you want to create receivers ATA ?",
            duration: 2,
          });
          const transaction = new Transaction().add(
            createAssociatedTokenAccountInstruction(
              publicKey, // payer
              associatedToken2,
              new PublicKey(toAddress), // owner
              new PublicKey(mint), // mint
              TOKEN_2022_PROGRAM_ID,
              ASSOCIATED_TOKEN_PROGRAM_ID
            )
          );

          await sendTransaction(transaction, connection);
          notification.success({
            message: "Success",
            description: "Receivers ATA created Successfully",
            duration: 2,
          });
          console.log("ATA created successfully .... ");

          // Again getting account of receiver
          account2 = await getAccount(
            connection,
            associatedToken2,
            [],
            TOKEN_2022_PROGRAM_ID
          );
        } catch (error) {
          console.log(error);
        }
      }

      // Sending Token
      // console.log(account2);
      if (!account2 || !account2.address) {
        throw new Error("Receiver account not found");
      }
      const transaction = new Transaction().add(
        createTransferInstruction(
          new PublicKey(account.address),
          new PublicKey(account2.address),
          new PublicKey(account.owner),
          amount * Math.pow(10, decimals),
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      await sendTransaction(transaction, connection);
      console.log("Token send successfully");
      notification.success({
        message: "Success",
        description: "Token Send Successfully",
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: "Error Occurred",
        description: "Token was not send. Try Again !",
        duration: 2,
      });
      console.log(error);
    } finally {
      setLoading(false);
      setAmount(0);
      setMint(undefined);
      setToaddress("");
    }
  };

  const btnStyle =
    loading && connected
      ? { opacity: 0.5, cursor: "not-allowed" }
      : { opacity: 1 };

  return (
    <div className="airdrop_container">
      {connected.connected ? (
        <div className="airdrop_container_box">
          <h1>Send Token</h1>
          <div className="send_sol">
            <p>Receipt Address</p>
            <input
              type="text"
              name="amount"
              value={toAddress}
              onChange={(e) => setToaddress(e.target.value)}
            />
          </div>
          <div className="send_sol">
            <p>Select Token</p>
            <Select
              className="dropdown"
              placeholder="Select a token "
              onChange={handleMintSelect}
              value={mint || undefined}
            >
              {" "}
              Select a mint address
              {tokens.map((token) => (
                <Select.Option
                  key={token.mintAddress}
                  value={token.mintAddress}
                >
                  {token.tokenName} ({token.tokenSymbol})
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="send_sol">
            <p>Token Amount</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step={0.1}
              name="amount"
            />
          </div>
          <button
            className="request_btn"
            disabled={!connected || loading}
            style={btnStyle}
            onClick={sentToken}
          >
            {loading ? "Sending..." : "Send Token"}
          </button>
        </div>
      ) : (
        <div className="connect_wallet">
          <p>Plz connect your wallet</p>
        </div>
      )}
    </div>
  );
};

export default SendToken;
