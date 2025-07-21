import React from "react";
import "./TemperatureCircle.css";

const TemperatureCircle = ({ temperature }) => {
  let borderColor = "#388e3c"; // verde por defecto

  if (temperature > 37.5) {
    borderColor = "#d32f2f"; // rojo
  } else if (temperature > 37) {
    borderColor = "#fbc02d"; // amarillo
  }

  return (
    <div className="circle-container">
      <svg width="220" height="220" viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="100" stroke={borderColor} strokeWidth="4" fill="none" />
        <circle cx="110" cy="110" r="85" stroke={borderColor} strokeWidth="3" fill="none" />
        <circle cx="110" cy="110" r="70" stroke={borderColor} strokeWidth="2" fill="none" />
        <text x="110" y="120" fontSize="36" textAnchor="middle" fill="#222" fontFamily="serif">
          {temperature.toFixed(1)}°C
        </text>
      </svg>
    </div>
  );
};

export default TemperatureCircle;
