import React from "react";

const getColor = (temp) => {
  if (temp <= 37) return "#388e3c";
  if (temp <= 38) return "#fbc02d";
  return "#d32f2f";
};

const WIDTH = 800;
const HEIGHT = 350;
const PADDING = 60;

const TemperatureLineChart = ({ data }) => {
  console.log("Datos recibidos en la gráfica:", data);
  if (data.length === 0) return <div>Cargando datos...</div>;

  const minTemp = Math.floor(Math.min(...data.map(d => d.temperatura))) - 1;
  const maxTemp = Math.ceil(Math.max(...data.map(d => d.temperatura))) + 1;

  const stepX = data.length > 1 ? (WIDTH - 2 * PADDING) / (data.length - 1) : 0;
  const scaleY = (temp) =>
    HEIGHT - PADDING - ((temp - minTemp) / (maxTemp - minTemp)) * (HEIGHT - 2 * PADDING);

  const points = data.map((d, i) => ({
    x: PADDING + i * stepX,
    y: scaleY(d.temperatura),
    color: getColor(d.temperatura),
    label: d.hora,
    value: d.temperatura,
  }));

  const linePath = points.length > 1
    ? points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(" ")
    : "";

  return (
    <div style={{ width: WIDTH, margin: "40px auto" }}>
      <svg width={WIDTH} height={HEIGHT} style={{ background: "#fff", borderRadius: 12 }}>
        {/* Ejes */}
        <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke="#aaa" />
        <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="#aaa" />

        {/* Etiquetas de eje Y */}
        {[...Array(maxTemp - minTemp + 1)].map((_, i) => {
          const temp = minTemp + i;
          const y = scaleY(temp);
          return (
            <g key={temp}>
              <text x={PADDING - 15} y={y + 5} fontSize="16" textAnchor="end" fill="#444">
                {temp}°C
              </text>
              <line x1={PADDING - 8} y1={y} x2={PADDING} y2={y} stroke="#ccc" />
            </g>
          );
        })}

        {/* Etiquetas de eje X */}
        {points.map((p, i) =>
          i % 3 === 0 ? (
            <text
              key={i}
              x={p.x}
              y={HEIGHT - PADDING + 28}
              fontSize="16"
              textAnchor="middle"
              fill="#444"
            >
              {p.label}
            </text>
          ) : null
        )}

        {/* Línea de la gráfica */}
        {points.length > 1 && (
          <path d={linePath} fill="none" stroke="#8884d8" strokeWidth="3" />
        )}
        {/* Ya no se muestran puntos ni valores */}
      </svg>
    </div>
  );
};

export default TemperatureLineChart;