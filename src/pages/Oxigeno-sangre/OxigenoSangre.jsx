import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { fetchOxigenacion } from "../../services/apiServices";
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

  const data = oxigenoData.map(item => ({
    hora: item.tiempo?.slice(11, 16) || "--:--",
    red: Number(item.red) || 0
  }));

  const redValues = data.map(d => d.red);
  const maxRed = redValues.length ? Math.max(...redValues) : 1;
  const minRed = redValues.length ? Math.min(...redValues) : 0;

  // Configuración de la gráfica
  const anchoGrafica = 400;
  const altoGrafica = 180;
  const separacion = data.length > 0 ? anchoGrafica / data.length : 0;
  const baseY = 220;

  // Escalador para la altura de la barra
  const getBarHeight = (valor) => {
    if (maxRed === minRed) return 10;
    return ((valor - minRed) / (maxRed - minRed)) * altoGrafica;
  };

  return (
    <div className="oxigeno-sangre-container">
      <Header />
      <h1 className="title-stress">Saturación de oxígeno (SpO₂) - Barras</h1>
      <div className="grafica-oxigeno-box">
        <svg width="500" height="260" className="grafica-oxigeno">
          {/* Ejes */}
          <line x1="60" y1="220" x2="460" y2="220" stroke="#888" strokeWidth="2"/>
          <line x1="60" y1="40" x2="60" y2="220" stroke="#888" strokeWidth="2"/>

          {/* Etiquetas eje Y */}
          <text x="50" y={baseY - altoGrafica} fontSize="13" fill="#222" textAnchor="end">{maxRed}</text>
          <text x="50" y={baseY} fontSize="13" fill="#222" textAnchor="end">{minRed}</text>

          {/* Barras */}
          {data.map((d, i) => {
            const barHeight = getBarHeight(d.red);
            return (
              <g key={i}>
                <rect
                  x={60 + (i * separacion) + 2}
                  y={baseY - barHeight}
                  width={separacion - 4 > 0 ? separacion - 4 : 2}
                  height={barHeight}
                  fill="#d32f2f"
                  opacity="0.8"
                />
                {/* Valor de red arriba de la barra */}
                <text
                  x={60 + (i * separacion) + (separacion / 2)}
                  y={baseY - barHeight - 8}
                  fontSize="11"
                  fill="#d32f2f"
                  textAnchor="middle"
                >
                  {d.red}
                </text>
                {/* Hora debajo de la barra */}
                <text
                  x={60 + (i * separacion) + (separacion / 2)}
                  y={235}
                  fontSize="10"
                  fill="#222"
                  textAnchor="middle"
                >
                  {d.hora}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="oxigeno-datos">
        <div>
          <span className="oxigeno-label">Máximo</span>
          <div className="oxigeno-valor">{maxRed}</div>
        </div>
        <div>
          <span className="oxigeno-label">Mínimo</span>
          <div className="oxigeno-valor">{minRed}</div>
        </div>
      </div>
    </div>
  );
};

export default OxigenoSangre;
