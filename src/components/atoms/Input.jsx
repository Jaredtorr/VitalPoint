import React from "react";

const Input = ({ label, type, name, value, onChange, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", width: "100%" }}
      {...props}
    />
  </div>
);

export default Input;