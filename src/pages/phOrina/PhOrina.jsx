import React from "react";
import Header from "../../Components/Header/Header";
import PhLineChart from "../../components/phorina/PhLineChart";
import "./PhOrina.css";

const data = [
  { hora: "08:00", ph: 5.8 },
  { hora: "10:00", ph: 6.2 },
  { hora: "12:00", ph: 6.5 },
  { hora: "14:00", ph: 6.0 },
  { hora: "16:00", ph: 6.8 },
  { hora: "18:00", ph: 5.9 },
];

const phActual = data[data.length - 1].ph;
const promedio = (data.reduce((acc, d) => acc + d.ph, 0) / data.length).toFixed(2);
const rangoIdeal = "6.0 - 7.5";
const estado = phActual < 6 ? "Levemente ácido" : phActual > 7.5 ? "Alcalino" : "Normal";
const estadoColor = phActual < 6 ? "#a5d6a7" : phActual > 7.5 ? "#ef9a9a" : "#81c784";

const PhOrina = () => (
  <div className="temp-main">
    <Header />
    <div className="temp-content">
      <h2 className="temp-label">Orina o Ph</h2>
      <PhLineChart data={data} />
      <div className="ph-info">
        <p><b>Ph actual:</b> {phActual}</p>
        <p><b>Promedio del día:</b> {promedio}</p>
        <p><b>Rango ideal:</b> {rangoIdeal}</p>
        <div className="ph-estado" style={{ background: estadoColor }}>
          {estado}
        </div>
      </div>
    </div>
  </div>
);

export default PhOrina;