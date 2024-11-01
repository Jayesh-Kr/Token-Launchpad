import React from "react";
import Header from "./components/Header/Header";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import AirdropSol from "./components/Airdrop/AirdropSol";
const App = () => {
  return (
    <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Header />
          {/* <LandingPage/> */}
          <AirdropSol/>
          <Footer/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
