import React, { useEffect, useState } from "react";
import "./airdropsol.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { notification } from "antd";


const AirdropSol = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    getUserBalance();
  }, [publicKey , balance]);

  const getUserBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  const requestAirdrop = async () => {
    try {
      setLoading(true);
      await connection.requestAirdrop(
        publicKey,
        amount * LAMPORTS_PER_SOL
      );
      getUserBalance();
      notification.success({
        message: "Airdrop Success",
        description: `${amount} SOL airdropped successfully to your wallet`,
        duration: 2,
      });
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

  return (
    <div className="airdrop_container">
      <div className="airdrop_container_box">
        <h1>Request SOL Airdrop</h1>
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
        <button className="request_btn" onClick={requestAirdrop}>
          {loading ? "Requesting..." : "Request Airdrop"}
        </button>
        <p>Max 2 SOL per hour can be requested.</p>
      </div>
    </div>
  );
};

export default AirdropSol;
