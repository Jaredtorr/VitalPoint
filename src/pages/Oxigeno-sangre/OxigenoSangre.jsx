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
  ResponsiveContainer
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

  // Preparar datos para la gráfica
  const dataChart = oxigenoData.map((item, index) => ({
    tiempo: item.tiempo ? item.tiempo.slice(11, 16) : `#${index + 1}`,
    spo2: Number(item.spo2) || 0,
  }));

  return (
    <div className="oxigeno-sangre-container">
      <Header />
      <h1 className="title-stress">Saturación de oxígeno (SpO₂)</h1>
      <div style={{ width: "95%", height: 400, margin: "0 auto" }}>
        <ResponsiveContainer>
          <LineChart
            data={dataChart}
            margin={{ top: 30, right: 30, left: 10, bottom: 30 }}
          >
            <CartesianGrid stroke="#bdefff" strokeDasharray="3 3" />
            <XAxis 
              dataKey="tiempo"
              label={{ value: "Hora", position: "insideBottom", offset: -10 }}
              tick={{ fontSize: 12 }}
              interval={Math.ceil(dataChart.length / 10) - 1}
            />
            <YAxis 
              label={{ value: "SpO₂ (%)", angle: -90, position: "insideLeft", fontSize: 14 }}
              tick={{ fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="spo2"
              stroke="#1976d2"
              strokeWidth={3}
              dot={{ r: 6, fill: "#ff9800", stroke: "#1976d2", strokeWidth: 2 }}
              activeDot={{ r: 8, fill: "#fbc02d", stroke: "#1976d2", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="oxigeno-datos" style={{display: "flex", justifyContent: "center", gap: "80px", marginTop: "30px"}}>
        <div>
          <span className="oxigeno-label">Máximo</span>
          <div className="oxigeno-valor">{Math.max(...dataChart.map(item => item.spo2))}</div>
        </div>
        <div>
          <span className="oxigeno-label">Mínimo</span>
          <div className="oxigeno-valor">{Math.min(...dataChart.map(item => item.spo2))}</div>
        </div>
        <div>
          <span className="oxigeno-label">Promedio</span>
          <div className="oxigeno-valor">{(dataChart.reduce((sum, item) => sum + item.spo2, 0) / (dataChart.length || 1)).toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};

export default OxigenoSangre;