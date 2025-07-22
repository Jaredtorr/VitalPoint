import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { fetchOxigenacion } from "../../services/apiServices";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import "./Oxigeno-sangre.css";

const OxigenoSangre = () => {
  const [oxigenoData, setOxigenoData] = useState([]);

  useEffect(() => {
    fetchOxigenacion(setOxigenoData);
    const interval = setInterval(() => {
      fetchOxigenacion(setOxigenoData);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const dataChart = oxigenoData
    .filter(item => typeof item.spo2 === "number" && item.spo2 > 0)
    .slice(-200) // Solo los últimos 200 datos
    .map((item, index) => ({
      tiempo: item.tiempo ? item.tiempo.slice(11, 16) : `#${index + 1}`,
      spo2: item.spo2,
    }));

  const spo2Validos = dataChart.map(item => item.spo2);
  const spo2Actual = spo2Validos.length ? spo2Validos[spo2Validos.length - 1] : 0;

  return (
    <div className="oxigeno-sangre-container">
      <Header />
      <h2 style={{ textAlign: "center", margin: "30px 0 10px 0", fontWeight: "bold" }}>
        Saturación de oxígeno en sangre
      </h2>
      <div style={{textAlign: "center", fontSize: "2.5rem", fontWeight: "bold", color: "#1976d2", marginBottom: "10px"}}>
        SpO₂ actual: {spo2Actual}%
      </div>
      <div style={{ width: "95%", height: 400, margin: "0 auto", background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px #ccc" }}>
        <ResponsiveContainer>
          <LineChart
            data={dataChart}
            margin={{ top: 30, right: 30, left: 10, bottom: 30 }}
          >
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis 
              dataKey="tiempo"
              label={{ value: "Hora", position: "insideBottomRight", offset: 0, fontSize: 16, fontWeight: "bold" }}
              tick={{ fontSize: 13 }}
            />
            <YAxis 
              label={{ value: "SpO₂ (%)", angle: -90, position: "insideLeft", fontSize: 16, fontWeight: "bold" }}
              tick={{ fontSize: 13 }}
              domain={[50, 100]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="spo2"
              stroke="#1976d2"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 10, fill: "#1976d2", stroke: "#fff", strokeWidth: 2 }}
            />
            {/* Línea de referencia en 95% */}
            <ReferenceLine y={95} stroke="#ff5252" strokeDasharray="5 5" label="Límite normal" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="oxigeno-datos" style={{display: "flex", justifyContent: "center", gap: "80px", marginTop: "30px"}}>
        <div>
          <span className="oxigeno-label">Máximo</span>
          <div className="oxigeno-valor">{spo2Validos.length ? Math.max(...spo2Validos) : 0}</div>
        </div>
        <div>
          <span className="oxigeno-label">Mínimo</span>
          <div className="oxigeno-valor">{spo2Validos.length ? Math.min(...spo2Validos) : 0}</div>
        </div>
        <div>
          <span className="oxigeno-label">Promedio</span>
          <div className="oxigeno-valor">
            {spo2Validos.length ? (spo2Validos.reduce((sum, val) => sum + val, 0) / spo2Validos.length).toFixed(1) : 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OxigenoSangre;