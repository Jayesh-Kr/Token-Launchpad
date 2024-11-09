import React from "react";

function NotFound() {
  const notfoundStyle = {
    color: "white",
    fontFamily: "DM Sans",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    letterSpacing: "1.2px",
    fontSize: "36px",
    fontWeight: "600",
  };
  return <div style={notfoundStyle}>404 | Page Not Found</div>;
}

export default NotFound;
