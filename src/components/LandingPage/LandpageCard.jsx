import React from 'react'

const LandpageCard = ({heading,text}) => {
  return (
    <div className="website_topic_box">
                <h2>{heading}</h2>
                <p>{text}</p>
                <div className="btn">Get Started</div>
            </div>
  )
}

export default LandpageCard