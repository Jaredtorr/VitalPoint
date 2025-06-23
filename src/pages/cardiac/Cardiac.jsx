import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import './Cardiac.css';
import Header from "../../Components/Header/Header";

function Cardiac() {
  const color = "#000000"; 
  const porcentaje = 75;  
  const frecuencia = 70; 

  // Datos para la gráfica ECG
  const ecgData = [
    { x: 0, y: 510 },
    { x: 1, y: 510 },
    { x: 2, y: 510 },
    { x: 3, y: 510 },
    { x: 4, y: 510 },
    { x: 5, y: 510 },
    { x: 6, y: 515 },
    { x: 7, y: 520 },
    { x: 8, y: 522 },
    { x: 9, y: 510 },
    { x: 10, y: 508 },
    { x: 11, y: 506 },
    { x: 12, y: 505 },
    { x: 13, y: 508 },
    { x: 14, y: 515 },
    { x: 15, y: 518 },
    { x: 16, y: 522 },
    { x: 17, y: 510 },
    { x: 18, y: 508 },
    { x: 19, y: 506 },
    { x: 20, y: 505 },
    { x: 21, y: 508 },
    { x: 22, y: 515 },
    { x: 23, y: 520 },
    { x: 24, y: 522 },
    { x: 25, y: 510 },
    { x: 26, y: 508 },
    { x: 27, y: 506 },
    { x: 28, y: 505 },
    { x: 29, y: 508 },
    { x: 30, y: 515 },
    { x: 31, y: 520 },
    { x: 32, y: 525 },
    { x: 33, y: 510 },
    { x: 34, y: 508 },
    { x: 35, y: 506 },
    { x: 36, y: 505 },
    { x: 37, y: 508 },
    { x: 38, y: 515 },
    { x: 39, y: 520 },
    { x: 40, y: 522 },
    { x: 41, y: 510 },
    { x: 42, y: 508 },
    { x: 43, y: 506 },
    { x: 44, y: 505 },
    { x: 45, y: 508 },
    { x: 46, y: 515 },
    { x: 47, y: 520 },
    { x: 48, y: 522 },
    { x: 49, y: 515 },
    { x: 50, y: 520 }
  ];

  return (
    <>
      <Header />

      <h1 className="title-cardiac">Ritmo Cardíaco</h1>

      <div className="alert-cardiac">
        <div className="cardiac-content">
          <div className="cardiac-text">
            <h2 className="subtitle-cardiac">
              Midiendo la frecuencia cardíaca <br /> No te muevas
            </h2>
          </div>

          <div className="circle-container">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-path"
                stroke={color}
                strokeDasharray={`${porcentaje}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage-text">{porcentaje}%</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Sección de la gráfica ECG */}
      <div className="ecg-section">
        <div className="ecg-container">
          <h3 className="ecg-title">Pulso Cardíaco</h3>
          
          <div className="ecg-chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={ecgData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <XAxis 
                  dataKey="x" 
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 12 }}
                  domain={[0, 50]}
                />
                <YAxis 
                  domain={[495, 535]}
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 12 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#bfbf00" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#FF5722" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/*<div className="ecg-stats">
            <div className="stat-item">
              <span className="stat-label">BPM:</span>
              <span className="stat-value">72</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Estado:</span>
              <span className="stat-value status-normal">Normal</span>
            </div>
          </div>*/}
        </div>
      </div>

      <div className="frecuencia-container">
        <h1 className="title-frecuencia">Frecuencia Cardiaca</h1>
        <h1 className="number-frecuencia">{ frecuencia }</h1>
      </div>

    </>
  );
}

export default Cardiac;