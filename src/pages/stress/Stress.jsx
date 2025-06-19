import React from "react";
import Header from "../../Components/Header/Header";
import "./Stress.css";

function Stress() {
  const porcentaje = 87;

  // Clasificación y color según porcentaje
  let nivel = "Bajo";
  let color = "#4caf50"; // verde
  let mensaje = "¡Estás bien! Sigue así.";

  if (porcentaje >= 70) {
    nivel = "Alto";
    color = "#D32F2F"; // rojo
    mensaje = "Estás a punto de explotar. Respira y controla tu estrés.";
  } else if (porcentaje >= 40) {
    nivel = "Moderado";
    color = "#FFA726"; // naranja
    mensaje = "Nivel de estrés moderado. Mantente atento.";
  }

  // Conversión de porcentaje a grados para la aguja
  // 0% = -90 grados (izquierda), 100% = 90 grados (derecha)
  const angle = (porcentaje * 180) / 100 - 90;

  return (
    <>
      <Header />
      <h1 className="title-stress">Nivel de Estrés</h1>

      <div className="gauge-container">
        <svg
          viewBox="0 0 200 120"
          width="100%"
          height="auto"
          className="gauge"
        >
          {/* Fondo semicircular con gradiente de colores */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#4caf50" />
              <stop offset="50%" stopColor="#FFA726" />
              <stop offset="100%" stopColor="#D32F2F" />
            </linearGradient>
          </defs>

          {/* Semicírculo base */}
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
            x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
            y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            style={{ transition: "all 1s ease-out" }}
          />

          {/* Centro de aguja (círculo) */}
          <circle cx="100" cy="100" r="8" fill={color} />

          {/* Marcas (ticks) cada 20% */}
          {[0, 20, 40, 60, 80, 100].map((val) => {
            const tickAngle = (val * 180) / 100 - 90;
            const x1 = 100 + 80 * Math.cos((tickAngle * Math.PI) / 180);
            const y1 = 100 + 80 * Math.sin((tickAngle * Math.PI) / 180);
            const x2 = 100 + 70 * Math.cos((tickAngle * Math.PI) / 180);
            const y2 = 100 + 70 * Math.sin((tickAngle * Math.PI) / 180);
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

          {/* Texto % en semicirculo */}
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

        {/* Texto fuera de la gráfica */}
        <div className="gauge-text">
          <p className="gauge-level" style={{ color }}>
            {nivel}
          </p>
          <p className="gauge-message">{mensaje}</p>
        </div>
      </div>
    </>
  );
}

export default Stress;
