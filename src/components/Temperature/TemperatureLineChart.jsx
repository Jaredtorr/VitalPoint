import React from "react";

const getColor = (temp) => {
  if (temp <= 37) return "#388e3c";      // Verde
  if (temp <= 38) return "#fbc02d";      // Amarillo
  return "#d32f2f";                      // Rojo
};

const WIDTH = 800;
const HEIGHT = 350;
const PADDING = 60;
const MIN_TEMP = 35;
const MAX_TEMP = 40;

const TemperatureLineChart = ({ data }) => {
  const stepX = (WIDTH - 2 * PADDING) / (data.length - 1);
  const scaleY = (temp) =>
    HEIGHT - PADDING - ((temp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * (HEIGHT - 2 * PADDING);

  const points = data.map((d, i) => ({
    x: PADDING + i * stepX,
    y: scaleY(d.temperatura),
    color: getColor(d.temperatura),
    label: d.hora,
    value: d.temperatura,
  }));

  const linePath = points
    .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
    .join(" ");

  return (
    <div style={{ width: WIDTH, margin: "40px auto" }}>
      <svg width={WIDTH} height={HEIGHT} style={{ background: "#fff", borderRadius: 12 }}>
        {/* Ejes */}
        <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke="#aaa" />
        <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="#aaa" />

        {/* Etiquetas de eje Y */}
        {[...Array(MAX_TEMP - MIN_TEMP + 1)].map((_, i) => {
          const temp = MIN_TEMP + i;
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
        {points.map((p, i) => (
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
        ))}

        {/* Línea de la gráfica */}
        <path d={linePath} fill="none" stroke="#8884d8" strokeWidth="3" />

        {/* Puntos */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={12} fill={p.color} stroke="#fff" strokeWidth="3" />
        ))}
      </svg>
    </div>
  );
};

export default TemperatureLineChart;