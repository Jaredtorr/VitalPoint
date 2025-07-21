import React from "react";
import Header from "../../Components/Header/Header";
import "./Stress.css";

function Stress() {
  const porcentajeOriginal = 85;
  const porcentaje = Math.max(0, Math.min(100, porcentajeOriginal));

  // Definir color y mensaje según nivel
  let nivel = "Bajo";
  let color = "#4caf50";
  let mensaje = "¡Estás bien! Sigue así.";

  if (porcentaje >= 70) {
    nivel = "Alto";
    color = "#D32F2F";
    mensaje = "Estás a punto de explotar. Respira y controla tu estrés.";
  } else if (porcentaje >= 40) {
    nivel = "Moderado";
    color = "#FFA726";
    mensaje = "Nivel de estrés moderado. Mantente atento.";
  }

  // Ángulo desde la izquierda (180°) a la derecha (0°)
  const angleDeg = 180 - (porcentaje * 180) / 100;
  const angleRad = (angleDeg * Math.PI) / 180;

  return (
    <>
      <Header />
      <h1 className="title-stress">Nivel de Estrés</h1>

      <div className="gauge-container">
        <svg viewBox="0 0 200 120" className="gauge">
          {/* Gradiente */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#4caf50" />
              <stop offset="50%" stopColor="#FFA726" />
              <stop offset="100%" stopColor="#D32F2F" />
            </linearGradient>
          </defs>

          {/* Semicírculo de fondo */}
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Aguja */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos(angleRad)}
            y2={100 - 70 * Math.sin(angleRad)}
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            style={{ transition: "all 1s ease-out" }}
          />

          {/* Centro de aguja */}
          <circle cx="100" cy="100" r="8" fill={color} />

          {/* Marcas de porcentaje */}
          {[0, 20, 40, 60, 80, 100].map((val) => {
            const deg = 180 - (val * 180) / 100;
            const rad = (deg * Math.PI) / 180;
            const x1 = 100 + 80 * Math.cos(rad);
            const y1 = 100 - 80 * Math.sin(rad);
            const x2 = 100 + 70 * Math.cos(rad);
            const y2 = 100 - 70 * Math.sin(rad);
            return (
              <line
                key={val}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#666"
                strokeWidth="2"
              />
            );
          })}

          {/* Texto de porcentaje */}
          <text
            x="100"
            y="60"
            textAnchor="middle"
            fontSize="20"
            fill={color}
            fontWeight="bold"
          >
            {porcentaje}%
          </text>
        </svg>

        <div className="gauge-text">
          <p className="gauge-level" style={{ color }}>{nivel}</p>
          <p className="gauge-message">{mensaje}</p>
        </div>
      </div>
    </>
  );
}

export default Stress;
