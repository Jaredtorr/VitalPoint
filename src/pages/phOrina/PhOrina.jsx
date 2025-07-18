import React, { useEffect, useState } from "react";
import { fetchpH } from "../../services/apiServices";
import Header from "../../Components/Header/Header";
import PhLineChart from "../../components/phorina/PhLineChart";
import "./PhOrina.css";

const PhOrina = () => {
  const [phData, setPhData] = useState([]);

  useEffect(() => {
    fetchpH(setPhData);
    const interval = setInterval(() => {
      fetchpH(setPhData);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mapea y toma solo los 8 datos más recientes
  const data = Array.isArray(phData)
    ? phData.map((item) => ({
        hora: item.tiempo?.slice(11, 16) || "--:--",
        ph: Number(item.ph) ?? 0,
      })).slice(-8)
    : [];

  if (!Array.isArray(phData) || phData === null) {
    // Si la API falla, muestra un mensaje y no intentes graficar
    return (
      <div className="temp-main">
        <Header />
        <div className="temp-content">
          <h2 className="temp-label">pH de Orina</h2>
          <div style={{ color: "red", margin: "2rem" }}>
            No se pudo conectar con la API de pH.<br />
            Intenta más tarde.
          </div>
        </div>
      </div>
    );
  }

  const phActual = data.length > 0 ? data[data.length - 1].ph : 0;
  const promedio = data.length > 0
    ? (data.reduce((acc, d) => acc + d.ph, 0) / data.length).toFixed(2)
    : 0;
  const rangoIdeal = "6.0 - 7.5";
  const estado =
    phActual < 6
      ? "Levemente ácido"
      : phActual > 7.5
      ? "Alcalino"
      : "Normal";
  const estadoColor =
    phActual < 6
      ? "#a5d6a7"
      : phActual > 7.5
      ? "#ef9a9a"
      : "#81c784";

  return (
    <div className="temp-main">
      <Header />
      <div className="temp-content">
        <h2 className="temp-label">pH de Orina</h2>
        <PhLineChart data={data} />
        <div className="ph-info">
          <p>
            <b>Ph actual:</b> {phActual}
          </p>
          <p>
            <b>Promedio del día:</b> {promedio}
          </p>
          <p>
            <b>Rango ideal:</b> {rangoIdeal}
          </p>
          <div className="ph-estado" style={{ background: estadoColor }}>
            {estado}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhOrina;