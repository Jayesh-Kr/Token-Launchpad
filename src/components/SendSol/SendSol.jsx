import React, { useContext, useState } from "react";
import "./sendsol.css";
import { notification } from "antd";
import {
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  PublicKey,
} from "@solana/web3.js";
import {
  useConnection,
  useWallet,
  WalletContext,
} from "@solana/wallet-adapter-react";
const SendSol = () => {
  const [toAddress, setToaddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const connected = useContext(WalletContext);

  const sentSolana = async () => {
    setLoading(true);
    try {
      console.log(publicKey.toBase58());
      if (!publicKey) {
        notification.error({
          message: "Wallet not connected",
          description: "Connect to the wallet for sending Solana",
          duration: 2,
        });
        return;
      }

      const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
      const {
        context: { slot: minContextSlot },
      } = await connection.getLatestBlockhashAndContext();

      await sendTransaction(transferTransaction, connection, {
        minContextSlot,
      });
      console.log("Solana send");
      setToaddress("");
      setAmount(0);
      notification.success({
        message: "SENT",
        description: "Solana has been sent successfully",
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: "Error Occurred",
        description: "Solana was not send. Try Again !",
        duration: 2,
      });
      console.log(error);
    } finally {
      setLoading(false);
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
          <h1>Send Solana</h1>
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
            <p>Sol Amount</p>
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
            onClick={sentSolana}
            disabled={!connected || loading}
            style={btnStyle}
          >
            Send SOL
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

export default SendSol;
