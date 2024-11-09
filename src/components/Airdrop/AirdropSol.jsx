import React, { useContext, useEffect, useState } from "react";
import "./airdropsol.css";
import {
  useConnection,
  useWallet,
  WalletContext,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { notification } from "antd";

const AirdropSol = () => {
  const { publicKey } = useWallet();
  // const { connection } = useConnection();
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const [lastAirdropTime, setLastAirdropTime] = useState(0);
  const connected = useContext(WalletContext);
  const connection = new Connection(clusterApiUrl("devnet"));
  useEffect(() => {
    const storedTime = localStorage.getItem("lastAirdropTime");
    if (storedTime) {
      setLastAirdropTime(parseInt(storedTime));
    }
    getUserBalance();
  }, [publicKey, balance]);

  const getUserBalance = async () => {
    if (publicKey) {
      console.log("User balance called");
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  const requestAirdrop = async () => {
    console.log("Request Airdrop fnc called");
    try {
      if (!publicKey) {
        notification.error({
          message: "Wallet not Connected",
          description: "Please connect your wallet to airdrop the solana",
          duration: 2,
        });
        return;
      }
      const currentTime = Date.now();
      const hoursSinceLastAirdrop =
        (currentTime - lastAirdropTime) / (1000 * 60 * 60);
      if (hoursSinceLastAirdrop < 1) {
        notification.warning({
          message: "Airdrop limit reached",
          description: "You can only request an airdrop once per hour.",
        });
        return;
      }
      setLoading(true);
      await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
      getUserBalance();
      notification.success({
        message: "Airdrop Success",
        description: `${amount} SOL airdropped successfully to your wallet`,
        duration: 2,
      });
      setLastAirdropTime(currentTime);
      localStorage.setItem("lastAirdropTime", currentTime.toString());
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Airdrop Failed",
        description: `There was an error in airdropping SOL. Plz try again!`,
        duration: 2,
      });
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
      <div className="airdrop_container_box">
        <h1>Request SOL Airdrop</h1>
        {connected.connected ? (
          <>
            <div className="sol_amount">
              <p>Amount (max 2 SOL) :</p>
              <input
                type="number"
                id="amt_sol"
                min={0.1}
                max={2}
                step={0.1}
                value={amount}
                onChange={(e) => setAmount(Math.min(2, e.target.value))}
              />
            </div>
            <div className="sol_balance">SOL Balance : {balance}</div>
            <button
              className="request_btn"
              onClick={requestAirdrop}
              disabled={!connected || loading}
              style={btnStyle}
            >
              {loading ? "Requesting..." : "Request Airdrop"}
            </button>
            <p>Max 2 SOL per hour can be requested.</p>
          </>
        ) : (
          <div className="connect_wallet">
            <p>Plz connect your wallet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirdropSol;
