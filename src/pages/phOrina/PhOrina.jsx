import React, { useEffect, useState } from "react";
import { fetchpH } from "../../services/apiServices";
import Header from "../../Components/Header/Header";
import SensorAlert from "../../components/SensorAlert/SensorAlert";
import { connectSensorAlerts } from "../../services/mqttServices";
import PhLineChart from "../../components/phorina/PhLineChart";
import "./PhOrina.css";

const getPhEstado = (ph) => {
  if (ph < 7) return { texto: "Ácido", color: "#f44336" }; // Rojo
  if (ph === 7) return { texto: "Neutro", color: "#4caf50" }; // Verde
  if (ph > 7) return { texto: "Alcalino", color: "#3f51b5" }; // Azul
  return { texto: "Sin datos", color: "#bdbdbd" };
};

const PhOrina = () => {
  const [phData, setPhData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [sensorStatus, setSensorStatus] = useState({
    max30102: true,
    mlx90614: true,
    tcs34725: true
  });

  useEffect(() => {
    fetchpH(setPhData);
    const interval = setInterval(() => {
      fetchpH(setPhData);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = connectSensorAlerts(setAlerts, setSensorStatus);
    return () => unsubscribe();
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
        <SensorAlert alerts={alerts} sensorStatus={sensorStatus} />
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
  const rangoIdeal = "Ácido (0-6.9), Neutro (7), Alcalino (8-14)";
  const { texto: estado, color: estadoColor } = getPhEstado(phActual);

  return (
    <div className="temp-main">
      <Header />
      <SensorAlert alerts={alerts} sensorStatus={sensorStatus} />
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
            <b>Rango según escala:</b> {rangoIdeal}
          </p>
          <div className="ph-estado" style={{ background: estadoColor, color: "#fff", fontWeight: "bold", borderRadius: 8, padding: "10px 0", marginTop: 10 }}>
            {estado}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhOrina;