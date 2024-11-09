import React from "react";
import "./footer.css";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_container-upper">
          <div className="f_con_l1">
            <h2>Token Launchpad</h2>
            <p>
              Launch and manage your
              <br /> Solana tokens with ease.
            </p>
          </div>
          <div className="f_con_l1">
            <h2>Quick Links</h2>
            <Link to="/">
              {" "}
              <p>Home</p>
            </Link>
            <Link to="/mytokens">
              {" "}
              <p>My Tokens</p>
            </Link>
            <Link to="/airdrop">
              {" "}
              <p>Airdrop</p>
            </Link>
          </div>
          <div className="f_con_l1">
            <h2>Resources</h2>
            <Link to="https://solana.com/" target="_blank">
              {" "}
              <p>Solana</p>
            </Link>
            <Link to="https://solana.com/docs" target="_blank">
              {" "}
              <p>Documentation</p>
            </Link>
            <Link
              to="https://github.com/anza-xyz/wallet-adapter/blob/master/APP.md"
              target="_blank"
            >
              {" "}
              <p>Anza-xyz/Wallet-Adapter</p>
            </Link>
          </div>
          <div className="f_con_l1">
            <h2>Connect</h2>
            <Link
              to="https://github.com/Jayesh-Kr/Token-Launchpad"
              target="_blank"
            >
              {" "}
              <img src={github} alt="GitHub" />
            </Link>
            <Link to="https://linkedin.com/in/jayeshkrishna" target="_blank">
              {" "}
              <img src={linkedin} alt="LinkedIn" />
            </Link>
          </div>
        </div>
        <hr />
        <div className="footer_container-lower">
          <p>&#169; 2024 Token Launchpad. All rights reserved.</p>
          <p>Build with ❤️ on Solana</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
