import React from "react";

const Button = ({ children, ...props }) => (
  <button
    style={{
      padding: "10px 24px",
      background: "#16324f",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      fontSize: 16,
      cursor: "pointer",
      marginTop: 12
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button;