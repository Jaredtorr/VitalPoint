import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./GraficaSugarOrine.css";

const data = [
  { tiempo: 0, glucosa: 85, panBlanco: 85, panIntegral: 85 },
  { tiempo: 15, glucosa: 120, panBlanco: 110, panIntegral: 105 },
  { tiempo: 30, glucosa: 150, panBlanco: 135, panIntegral: 125 },
  { tiempo: 45, glucosa: 160, panBlanco: 140, panIntegral: 130 },
  { tiempo: 60, glucosa: 145, panBlanco: 130, panIntegral: 120 },
  { tiempo: 90, glucosa: 110, panBlanco: 100, panIntegral: 95 },
  { tiempo: 120, glucosa: 90, panBlanco: 85, panIntegral: 85 }
];

const GraficaSugarOrine = () => {
  return (
    <div className="grafica-container">
      <h2 className="titulo-grafica">Curva de Glucosa Postprandial</h2>
      <ResponsiveContainer width="100%" height={420}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 40, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis
            dataKey="tiempo"
            tick={{ fontSize: 12 }}
            label={{
              value: "Tiempo (minutos)",
              position: "insideBottom",
              offset: -30,
              style: { textAnchor: "middle", fontSize: 14 }
            }}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: "Glucosa plasmática (mg/dL)",
              angle: -90,
              position: "insideLeft",
              offset: -10,
              style: { textAnchor: "middle", fontSize: 14 }
            }}
          />

          <Tooltip />
          
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{ paddingBottom: '20px', fontSize: '13px' }}
          />

          <Line type="monotone" dataKey="glucosa" name="Glucosa" stroke="#d61b8c" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="panBlanco" name="Pan Blanco" stroke="#ffcc00" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="panIntegral" name="Pan Integral" stroke="#3399cc" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficaSugarOrine;
