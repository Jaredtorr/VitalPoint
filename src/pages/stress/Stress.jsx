import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import "./Stress.css";
import { fetchStress } from "../../services/apiServices";

function Stress() {
  const [nivel, setNivel] = useState("Desconocido");
  const [color, setColor] = useState("#4caf50");
  const [mensaje, setMensaje] = useState("Cargando...");
  const [angulo, setAngulo] = useState(Math.PI);

  useEffect(() => {
    const fetchData = () => {
      fetchStress((data) => {
        if (data.length > 0) {
          const ultimo = data[data.length - 1];
          const nivelApi = ultimo.estres?.toLowerCase();

          switch (nivelApi) {
            case "alto":
              setNivel("Alto");
              setColor("#D32F2F");
              setMensaje("Estás a punto de explotar. Respira y controla tu estrés.");
              setAngulo((180 - 85 * 180 / 100) * Math.PI / 180);
              break;
            case "medio":
              setNivel("Medio");
              setColor("#FFA726");
              setMensaje("Nivel de estrés medio. Mantente atento.");
              setAngulo((180 - 50 * 180 / 100) * Math.PI / 180);
              break;
            case "bajo":
              setNivel("Bajo");
              setColor("#4caf50");
              setMensaje("¡Estás bien! Sigue así.");
              setAngulo((180 - 20 * 180 / 100) * Math.PI / 180);
              break;
            default:
              console.warn("Nivel de estrés no reconocido:", nivelApi);
              setNivel("Desconocido");
              setColor("#9e9e9e");
              setMensaje("No se pudo interpretar el nivel de estrés.");
              setAngulo(Math.PI);
              break;
          }
        } else {
          console.warn("No se encontraron datos de estrés.");
        }
      });
    };

    fetchData(); // Primera llamada inmediata
    const intervalId = setInterval(fetchData, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, []);

  return (
    <>
      <Header />
      <h1 className="title-stress">Nivel de Estrés</h1>

      <div className="gauge-container">
        <svg viewBox="0 0 200 120" className="gauge">
          <defs>
            <linearGradient id="gradient" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#4caf50" />
              <stop offset="50%" stopColor="#FFA726" />
              <stop offset="100%" stopColor="#D32F2F" />
            </linearGradient>
          </defs>

          <path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {!isNaN(angulo) && (
            <line
              x1="100"
              y1="100"
              x2={100 + 70 * Math.cos(angulo)}
              y2={100 - 70 * Math.sin(angulo)}
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              style={{ transition: "all 0.5s ease-out" }}
            />
          )}

          <circle cx="100" cy="100" r="8" fill={color} />

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

          <text
            x="100"
            y="60"
            textAnchor="middle"
            fontSize="20"
            fill={color}
            fontWeight="bold"
          >
            {nivel}
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
