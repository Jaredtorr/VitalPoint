import React from "react";

const WIDTH = 700;
const HEIGHT = 350;
const PADDING = 60;
const MIN_PH = 4.5;
const MAX_PH = 8.5;

const getColor = (ph) => {
  if (ph < 6) return "#fbc02d";      // Amarillo (ácido)
  if (ph <= 7.5) return "#388e3c";   // Verde (normal)
  return "#d32f2f";                  // Rojo (alcalino)
};

const PhLineChart = ({ data }) => {
  const stepX = (WIDTH - 2 * PADDING) / (data.length - 1);
  const scaleY = (ph) =>
    HEIGHT - PADDING - ((ph - MIN_PH) / (MAX_PH - MIN_PH)) * (HEIGHT - 2 * PADDING);

  const points = data.map((d, i) => ({
    x: PADDING + i * stepX,
    y: scaleY(d.ph),
    color: getColor(d.ph),
    label: d.hora,
    value: d.ph,
  }));

  const linePath = points
    .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
    .join(" ");

  return (
    <div style={{ width: WIDTH, margin: "0 auto" }}>
      <svg width={WIDTH} height={HEIGHT} style={{ background: "#fff", borderRadius: 8 }}>
        {/* Ejes */}
        <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke="#aaa" />
        <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="#aaa" />

        {/* Etiquetas de eje Y */}
        {[...Array(Math.round(MAX_PH - MIN_PH) + 1)].map((_, i) => {
          const ph = MIN_PH + i;
          const y = scaleY(ph);
          return (
            <g key={ph}>
              <text x={PADDING - 10} y={y + 5} fontSize="12" textAnchor="end" fill="#444">
                {ph.toFixed(1)}
              </text>
              <line x1={PADDING - 5} y1={y} x2={PADDING} y2={y} stroke="#ccc" />
            </g>
          );
        })}

        {/* Línea de la gráfica */}
        <path d={linePath} fill="none" stroke="#fbc02d" strokeWidth="2" />

        {/* Último punto destacado */}
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={6}
            fill={points[points.length - 1].color}
            stroke="#fff"
            strokeWidth="2"
          />
        )}
      </svg>
    </div>
  );
};

export default PhLineChart;