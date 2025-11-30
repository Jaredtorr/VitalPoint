import React from "react";

const getColor = (temp) => {
  if (temp <= 37) return "#388e3c";
  if (temp <= 38) return "#fbc02d";
  return "#d32f2f";
};

// Base coordinates used for the SVG viewBox. The SVG will scale responsively.
const BASE_WIDTH = 800;
const BASE_HEIGHT = 350;
const PADDING = 60;

const TemperatureLineChart = ({ data }) => {
  if (!data || data.length === 0) return <div>Cargando datos...</div>;

  const minTempRaw = Math.min(...data.map(d => d.temperatura));
  const maxTempRaw = Math.max(...data.map(d => d.temperatura));
  const minTemp = Math.floor(minTempRaw) - 1;
  let maxTemp = Math.ceil(maxTempRaw) + 1;
  if (maxTemp === minTemp) maxTemp = minTemp + 1; // evitar división por cero

  const stepX = data.length > 1 ? (BASE_WIDTH - 2 * PADDING) / (data.length - 1) : 0;
  const scaleY = (temp) =>
    BASE_HEIGHT - PADDING - ((temp - minTemp) / (maxTemp - minTemp)) * (BASE_HEIGHT - 2 * PADDING);

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

  // Control dinámico de densidad de etiquetas en eje X para evitar solapamientos.
  // Estimamos cuántas etiquetas caben (aprox. una cada 70px en el ancho base).
  const approxLabelSpacingPx = 70;
  const maxLabels = Math.max(2, Math.floor((BASE_WIDTH - 2 * PADDING) / approxLabelSpacingPx));
  const labelStep = Math.ceil(data.length / maxLabels);
  const xLabelFontSize = 12;
  const yLabelFontSize = 12;

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: "24px auto" }}>
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ background: "#fff", borderRadius: 12 }}
      >
        {/* Ejes */}
        <line x1={PADDING} y1={BASE_HEIGHT - PADDING} x2={BASE_WIDTH - PADDING} y2={BASE_HEIGHT - PADDING} stroke="#aaa" />
        <line x1={PADDING} y1={PADDING} x2={PADDING} y2={BASE_HEIGHT - PADDING} stroke="#aaa" />

        {/* Etiquetas de eje Y */}
        {[...Array(maxTemp - minTemp + 1)].map((_, i) => {
          const temp = minTemp + i;
          const y = scaleY(temp);
          return (
            <g key={temp}>
              <text x={PADDING - 15} y={y + 5} fontSize={yLabelFontSize} textAnchor="end" fill="#444">
                {temp}°C
              </text>
              <line x1={PADDING - 8} y1={y} x2={PADDING} y2={y} stroke="#eee" />
            </g>
          );
        })}

        {/* Etiquetas de eje X (muestreo dinámico) */}
        {points.map((p, i) =>
          i % labelStep === 0 ? (
            <text
              key={i}
              x={p.x}
              y={BASE_HEIGHT - PADDING + 24}
              fontSize={xLabelFontSize}
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
      </svg>
    </div>
  );
};

export default TemperatureLineChart;