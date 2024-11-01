import React from 'react'
import './landingpage.css';
import LandpageCard from './LandpageCard';

const LandingPage = () => {
  return (
    <section className='header_container'>
        <div className="welcome_text">
            <h1>Welcome to Token Launchpad</h1>
            <p>Your gateway to creating and managing tokens on the Solana blockchain</p>
        </div>
        <div className="website_topic">
            <LandpageCard heading={"Create Tokens"} text ={"Launch your own token on Solana with just a few clicks. Customize your token's properties and start building your community."} />
            <LandpageCard heading={"My Tokens"} text ={"View and manage your existing tokens on Solana. Track their performance and manage your portfolio."} />
            <LandpageCard heading={"Airdrop"} text ={"Create and manage airdrop campaigns for your tokens. Boost your token's visibility and community engagement."} />
            <LandpageCard heading={"Create Liquidity Pool"} text ={"Create and manage liquidity pools for your tokens. Boost your token's tradability and accessibility."} />
            <LandpageCard heading={"Token Swap"} text ={"Swap your tokens on Solana with ease. Connect your wallet and start swapping."} />
            
        </div>

    </section>
  )
}

export default LandingPage