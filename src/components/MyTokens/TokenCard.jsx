import React from "react";
import copy from "../../assets/copy.png";
import { notification } from "antd";
const TokenCard = (props) => {
  const copytoclipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      notification.success({
        description: "Text copied to Clipboard",
        duration: 1,
      });
    } catch (error) {
      console.error("Failed to copy text:", error);
      notification.error({
        description: "Failed to copy text. Try again!",
        duration: 1,
      });
    }
  };
  return (
    <div className="mytoken_card">
      <div className="token_details">
        <div className="token_img">
          <img src={props.tokens?.imageUrl} alt={props.tokens?.tokenName} />
        </div>
        <div className="token_name">
          <p>{props.tokens?.tokenName}</p>
          <p>{props.tokens?.tokenSymbol}</p>
        </div>
      </div>
      <div className="mint_address">
        <p>{props.tokens?.mintAddress}</p>
        <div className="copy_to_clipboard">
          <img
            src={copy}
            alt="Copy_To_Clipboard"
            onClick={() => copytoclipboard(props.tokens?.mintAddress)}
          />
        </div>
      </div>
      <div className="btn_details" onClick={props.onViewDetails}>
        View Details
      </div>
    </div>
  );
};

export default TokenCard;
