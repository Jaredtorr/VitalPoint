import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { fetchOxigenacion } from "../../services/apiServices";
import "./Oxigeno-sangre.css";

// Escalador dinámico para los valores reales de IR
const getYScaler = (data, minY = 220, maxY = 40) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  if (max === min) return () => minY;
  return value => minY - ((value - min) * (minY - maxY)) / (max - min);
};

const OxigenoSangre = () => {
  const [oxigenoData, setOxigenoData] = useState([]);

  useEffect(() => {
    fetchOxigenacion(setOxigenoData);
  }, []);

  const spo2Data = oxigenoData.map(item => item.ir);

  const maximo = spo2Data.length ? Math.max(...spo2Data) : 0;
  const minimo = spo2Data.length ? Math.min(...spo2Data) : 0;
  const promedio = spo2Data.length ? (spo2Data.reduce((a, b) => a + b, 0) / spo2Data.length).toFixed(1) : 0;

  // Escalador para Y según los datos reales
  const spo2ToY = getYScaler(spo2Data);

  return (
    <div className="oxigeno-sangre-container">
      <Header />
      <h1 className="title-stress">Saturación de oxígeno (SpO₂)</h1>
      <div className="grafica-oxigeno-box">
        <svg width="500" height="260" className="grafica-oxigeno">
          <line x1="60" y1="220" x2="460" y2="220" stroke="#888" strokeWidth="2"/>
          <line x1="60" y1="40" x2="60" y2="220" stroke="#888" strokeWidth="2"/>
          {/* Etiquetas eje Y dinámicas */}
          <text x="50" y={spo2ToY(maximo)} fontSize="13" fill="#222" textAnchor="end">{maximo}</text>
          <text x="50" y={spo2ToY(minimo)} fontSize="13" fill="#222" textAnchor="end">{minimo}</text>
          <text x="50" y={spo2ToY(promedio)} fontSize="13" fill="#222" textAnchor="end">{promedio}</text>
          {/* Etiquetas eje X */}
          <text x="60" y="240" fontSize="13" fill="#222" textAnchor="middle">0s</text>
          <text x="260" y="240" fontSize="13" fill="#222" textAnchor="middle">Tiempo</text>
          <text x="460" y="240" fontSize="13" fill="#222" textAnchor="middle">{spo2Data.length - 1}s</text>
          {/* Línea de datos */}
          <polyline
            fill="none"
            stroke="#1976d2"
            strokeWidth="3"
            points={spo2Data.map((v, i) => `${60 + (i * 20)},${spo2ToY(v)}`).join(" ")}
          />
          {/* Máximo */}
          <circle
            cx={60 + (spo2Data.indexOf(maximo) * 20)}
            cy={spo2ToY(maximo)}
            r="7"
            fill="#4caf50"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x={60 + (spo2Data.indexOf(maximo) * 20) + 12}
            y={spo2ToY(maximo) - 10}
            fontSize="13"
            fill="#4caf50"
          >Máx: {maximo}</text>
          {/* Mínimo */}
          <circle
            cx={60 + (spo2Data.indexOf(minimo) * 20)}
            cy={spo2ToY(minimo)}
            r="7"
            fill="#d32f2f"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x={60 + (spo2Data.indexOf(minimo) * 20) + 12}
            y={spo2ToY(minimo) + 20}
            fontSize="13"
            fill="#d32f2f"
          >Mín: {minimo}</text>
          {/* Promedio */}
          <circle
            cx={60 + (Math.floor(spo2Data.length / 2) * 20)}
            cy={spo2ToY(promedio)}
            r="7"
            fill="#1976d2"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x={60 + (Math.floor(spo2Data.length / 2) * 20) + 12}
            y={spo2ToY(promedio) - 10}
            fontSize="13"
            fill="#1976d2"
          >Prom: {promedio}</text>
        </svg>
      </div>
      <div className="oxigeno-datos">
        <div>
          <span className="oxigeno-label">Máximo</span>
          <div className="oxigeno-valor">{maximo}</div>
        </div>
        <div>
          <span className="oxigeno-label">Mínimo</span>
          <div className="oxigeno-valor">{minimo}</div>
        </div>
        <div>
          <span className="oxigeno-label">Promedio</span>
          <div className="oxigeno-valor">{promedio}</div>
        </div>
      </div>
    </div>
  );
};

export default OxigenoSangre;