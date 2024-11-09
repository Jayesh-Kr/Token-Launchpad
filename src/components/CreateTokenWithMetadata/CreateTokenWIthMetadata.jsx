import { useContext, useState } from "react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  useConnection,
  useWallet,
  WalletContext,
} from "@solana/wallet-adapter-react";
import {
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import pinata from "../../helper/pinataWeb3";
import { notification } from "antd";

const CreateTokenWithMetadata = () => {
  const { connected } = useContext(WalletContext);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    supply: 0,
    decimal: 9,
  });
  const { connection } = useConnection();
  const wallet = useWallet();
  const generateToken = async () => {
    console.log(form);
    try {
      setLoading(true);
      const mintKeypair = Keypair.generate();
      const upload = await pinata.upload.file(file);
      console.log(upload);
      const imageURL = `https://orange-given-mink-808.mypinata.cloud/ipfs/${upload.IpfsHash}`;
      let first_metadata = {
        name: form.name,
        symbol: form.symbol,
        description:
          "This is an example fungible token for demonstration purposes.",
        image: imageURL,
      };
      let pinataRes = await pinata.upload.json(first_metadata);
      const uri = `https://orange-given-mink-808.mypinata.cloud/ipfs/${pinataRes.IpfsHash}`;

      const metadata = {
        mint: mintKeypair.publicKey,
        name: form.name,
        symbol: form.symbol,
        uri: uri,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      console.log(associatedToken.toBase58());

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          form.decimal,
          wallet.publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        }),
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          form.supply * Math.pow(10, form.decimal),
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);

      await wallet.sendTransaction(transaction, connection);

      console.log("Completed all the task");
      notification.success({
        message: "Success",
        description: "Token created Successfully",
        duration: 2,
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Failed",
        description: "An error occurred while creating the Token",
        duration: 2,
      });
    } finally {
      setLoading(false);
      setFile(null);
      setPreviewUrl(null);
      setForm({
        name: "",
        symbol: "",
        supply: 0,
        decimal: 9,
      });
    }
  };
  const formHandleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // --------------  Function for image ------------------------------------

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxSizeInBytes = 204800;
      if (selectedFile.size > maxSizeInBytes) {
        notification.error({
          message: "Filed Size Exceeded",
          description: "Upload file size less then 200KB",
          duration: 2,
        });
      } else {
        setFile(selectedFile);
        if (selectedFile) {
          const url = URL.createObjectURL(selectedFile);
          setPreviewUrl(url);
        }
      }
    }
  };

  // ----------- Disable btn css code ------------------------
  const btnStyle =
    loading && connected
      ? { opacity: 0.5, cursor: "not-allowed" }
      : { opacity: 1 };
  //-----------------------------------------------------------
  return (
    <div className="airdrop_container">
      <div className="airdrop_container_box">
        <h1>Create Token With Metadata</h1>
        {connected ? (
          <>
            <div className="send_sol">
              <p>Name</p>
              <input
                type="text"
                name="name"
                onChange={formHandleChange}
                value={form.name}
                autoComplete="off"
              />
            </div>
            <div className="send_sol">
              <p>Symbol</p>
              <input
                type="text"
                name="symbol"
                onChange={formHandleChange}
                value={form.symbol}
                autoComplete="off"
              />
            </div>
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
            <div className="send_sol">
              <p>Image</p>
              <input
                type="file"
                name="amount"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            {previewUrl && (
              <div className="send_sol">
                <h3>Image Preview:</h3>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            )}
            <button
              className="request_btn"
              disabled={!connected || loading}
              style={btnStyle}
              onClick={generateToken}
            >
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

export default CreateTokenWithMetadata;
