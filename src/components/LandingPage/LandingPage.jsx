import React from "react";
import "./landingpage.css";
import LandpageCard from "./LandpageCard";

const LandingPage = () => {
  return (
    <section className="header_container">
      <div className="welcome_text">
        <h1>Welcome to Token Launchpad</h1>
        <p>
          Your gateway to creating and managing tokens on the Solana blockchain
        </p>
      </div>
      <div className="website_topic">
        <LandpageCard
          heading={"Airdrop"}
          text={"Effortlessly airdrop Solana in your account."}
          target={"airdrop"}
        />
        <LandpageCard
          heading={"Send Solana"}
          text={"Send Solana quickly and easily to any wallet on the network."}
          target={"sendsol"}
        />
        <LandpageCard
          heading={"Create Tokens"}
          text={"Launch your custom token on Solana with just a few clicks."}
          target={"createtoken"}
        />
        <LandpageCard
          heading={"Create Token with Meta Data"}
          text={
            "Create a custom token with metadata, including properties like name, symbol, and supply."
          }
          target={"createtokenwithmetadata"}
        />
        <LandpageCard
          heading={"View Your Tokens"}
          text={
            "View and manage your tokens on Solana, track performance, and organize your portfolio."
          }
          target={"mytokens"}
        />
        <LandpageCard
          heading={"Send Token"}
          text={"Send tokens securely and track the status of your transfers."}
          target={"sendtoken"}
        />
      </div>
    </section>
  );
};

export default LandingPage;
