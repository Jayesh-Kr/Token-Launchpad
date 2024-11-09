import React from "react";
import { useNavigate } from "react-router-dom";
const LandpageCard = ({ heading, text, target }) => {
  const navigate = useNavigate();
  return (
    <div className="website_topic_box">
      <h2>{heading}</h2>
      <p>{text}</p>
      <div className="btn" onClick={() => navigate(`/${target}`)}>
        Get Started
      </div>
    </div>
  );
};

export default LandpageCard;
