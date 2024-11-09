import {
  useConnection,
  useWallet,
  WalletContext,
} from "@solana/wallet-adapter-react";
import React, { useContext, useState } from "react";
import { notification } from "antd";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
const CreateToken = () => {
  const { connected } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    supply: 0,
    decimal: 9,
  });
  const { connection } = useConnection();
  const wallet = useWallet();
  const generateToken = async () => {
    console.log(form);
    try {
      setLoading(true);
      // ---------------------- Creating MINT ----------------------------------------------
      const mintKeypair = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(
          mintKeypair.publicKey,
          form.decimal,
          wallet.publicKey,
          wallet.publicKey,
          TOKEN_PROGRAM_ID
        )
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);
      await wallet.sendTransaction(transaction, connection);
      const mint = mintKeypair.publicKey;

      notification.success({
        message: "Success",
        description: "Mint created Successfully",
        duration: 2,
      });

      // ------------------------- Creating Associated Token Account ---------------------------------------
      const associatedToken = getAssociatedTokenAddressSync(
        mint,
        wallet.publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction2, connection);

      notification.success({
        message: "Success",
        description: "Associated Token Account created Successfully",
        duration: 2,
      });

      // -------------------- minting token to ata ------------------------------
      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mint,
          associatedToken,
          wallet.publicKey,
          form.supply * Math.pow(10, form.decimal),
          [],
          TOKEN_PROGRAM_ID
        )
      );
      await wallet.sendTransaction(transaction3, connection);
      notification.success({
        message: "Success",
        description: `${form.supply} - Tokens Minted to ATA`,
        duration: 2,
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Failed",
        description: "An error occured while generating token",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  const formHandleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const btnStyle =
    loading && connected
      ? { opacity: 0.5, cursor: "not-allowed" }
      : { opacity: 1 };
  return (
    <div className="airdrop_container">
      <div className="airdrop_container_box">
        <h1>Create Token</h1>
        {console.log(connected)}
        {connected ? (
          <>
            <div className="send_sol">
              <p>Token Supply</p>
              <input
                type="number"
                name="supply"
                onChange={formHandleChange}
                value={form.supply}
                autoComplete="off"
              />
            </div>
            <div className="send_sol">
              <p>Decimal</p>
              <input
                type="number"
                max={9}
                name="decimal"
                onChange={formHandleChange}
                value={form.decimal}
                autoComplete="off"
              />
            </div>
            <button
              className="request_btn"
              disabled={!connected || loading}
              style={btnStyle}
              onClick={generateToken}
            >
              {" "}
              {loading ? "Generating" : "Generate Token"}
            </button>
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

export default CreateToken;
