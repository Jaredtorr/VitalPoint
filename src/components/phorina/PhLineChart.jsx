import React from "react";

const WIDTH = 700;
const PADDING = 60;
const BAR_HEIGHT = 30;

const getColor = (ph) => {
  if (ph < 7) return "#f44336";      // Ácido - rojo
  if (ph === 7) return "#4caf50";    // Neutro - verde
  if (ph > 7) return "#3f51b5";      // Alcalino - azul
  return "#bdbdbd";
};

const PhLineChart = ({ data }) => {
  const maxPh = Math.max(...data.map(d => d.ph), 8.5);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 32 }}>
      {/* Gráfica de barras */}
      <div style={{ width: WIDTH }}>
        <svg width={WIDTH} height={PADDING + data.length * (BAR_HEIGHT + 10)}>
          {/* Eje X */}
          <line
            x1={PADDING}
            y1={PADDING - 10}
            x2={PADDING}
            y2={PADDING + data.length * (BAR_HEIGHT + 10) - 10}
            stroke="#aaa"
          />
          {/* Etiquetas y barras */}
          {data.map((d, i) => {
            const barWidth = ((d.ph / maxPh) * (WIDTH - 200));
            return (
              <g key={i}>
                {/* Etiqueta de hora */}
                <text
                  x={PADDING - 10}
                  y={PADDING + i * (BAR_HEIGHT + 10) + BAR_HEIGHT / 2 + 5}
                  fontSize="16"
                  textAnchor="end"
                  fill="#444"
                >
                  {d.hora}
                </text>
                {/* Barra */}
                <rect
                  x={PADDING}
                  y={PADDING + i * (BAR_HEIGHT + 10)}
                  width={barWidth}
                  height={BAR_HEIGHT}
                  fill={getColor(d.ph)}
                  rx={6}
                />
                {/* Valor de pH */}
                <text
                  x={PADDING + barWidth + 10}
                  y={PADDING + i * (BAR_HEIGHT + 10) + BAR_HEIGHT / 2 + 5}
                  fontSize="16"
                  textAnchor="start"
                  fill="#222"
                >
                  {d.ph}
                </text>
              </g>
            );
          })}
          {/* Eje Y (valores de pH) opcional */}
          {[...Array(6)].map((_, i) => {
            const phValue = 5 + i * 0.5;
            const x = PADDING + ((phValue / maxPh) * (WIDTH - 200));
            return (
              <g key={phValue}>
                <line
                  x1={x}
                  y1={PADDING - 10}
                  x2={x}
                  y2={PADDING + data.length * (BAR_HEIGHT + 10) - 10}
                  stroke="#eee"
                />
                <text
                  x={x}
                  y={PADDING - 20}
                  fontSize="12"
                  textAnchor="middle"
                  fill="#888"
                >
                  {phValue.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {/* Imagen de escala de pH */}
      <img
        src="phescala.jpeg"
        alt="Escala de pH"
        style={{ height: PADDING + data.length * (BAR_HEIGHT + 10) - 10, maxWidth: 500, objectFit: "contain", borderRadius: 12 }}
      />
    </div>
  );
};

export default PhLineChart;