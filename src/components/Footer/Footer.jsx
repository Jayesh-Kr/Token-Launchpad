import React from 'react'
import './footer.css';
import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';
const Footer = () => {
  return (
    <footer>
        <div className="footer_container">
            
            <div className="footer_container-upper">
                <div className="f_con_l1">
                    <h2>Token Launchpad</h2>
                    <p>Launch and manage your<br/> Solana tokens with ease.</p>
                </div>
                <div className="f_con_l1">
                    <h2>Quick Links</h2>
                    <p>Home</p>
                    <p>My Tokens</p>
                    <p>Airdrop</p>
                </div>
                <div className="f_con_l1">
                    <h2>Resources</h2>
                    <p>Solana</p>
                    <p>Documentation</p>
                    <p>Anza-xyz/Wallet-Adapter</p>
                </div>
                <div className="f_con_l1">
                    <h2>Connect</h2>
                    <img src={github} alt="GitHub" />
                    <img src={linkedin} alt="LinkedIn" />
                </div>
            </div>
            <hr />
            <div className="footer_container-lower">
                <p>&#169; 2024 Token Launchpad. All rights reserved.</p>
                <p>Build with ❤️ on Solana</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer