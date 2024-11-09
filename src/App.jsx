import React from "react";
import Header from "./components/Header/Header";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import useToken from "./utils/useToken";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import AirdropSol from "./components/Airdrop/AirdropSol";
import SendSol from "./components/SendSol/SendSol";
import CreateToken from "./components/CreateToken/CreateToken";
import CreateTokenWithMetadata from "./components/CreateTokenWithMetadata/CreateTokenWIthMetadata";
import MyTokens from "./components/MyTokens/MyTokens";
import SendToken from "./components/SendToken/SendToken";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import NotFound from "./components/NotFound/NotFound";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="airdrop" element={<AirdropSol />} />
        <Route path="sendsol" element={<SendSol />} />
        <Route path="sendtoken" element={<SendToken />} />
        <Route path="createtoken" element={<CreateToken />} />
        <Route
          path="createtokenwithmetadata"
          element={<CreateTokenWithMetadata />}
        />
        <Route path="mytokens" element={<MyTokens />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/U_4dFIbfw-H0KmScWmjDnR-EYjt5TMO-"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <RouterProvider router={router} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
