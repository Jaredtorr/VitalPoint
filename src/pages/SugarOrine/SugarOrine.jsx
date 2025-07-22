import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from "recharts";
import Header from "../../Components/Header/Header";
import AzucarOrine from "../../assets/AzucarOrine.webp";
import "./SugarOrine.css";

const data = [
  { name: '0', porcentaje: 130 },
  { name: '25', porcentaje: 110 },
  { name: '50', porcentaje: 115 },
  { name: '75', porcentaje: 95 },
  { name: '100', porcentaje: 70 },
  { name: '125', porcentaje: 60 },
];

function SugarOrine() {
  const porcentaje = 85;

  return (
    <>
      <Header />
      <div className="contenido-azucar-orina">
        <h1 className="titulo-azucar">Azúcar en la Orina</h1>
        <img src={AzucarOrine} alt="Azúcar en la orina" className="imagen-azucar" />
      </div>

    
    

      <div className="grafica-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#333">
              <Label value="Concentración (%)" offset={-20} position="insideBottom" />
            </XAxis>
            <YAxis stroke="#333" label={{ value: 'Nivel', angle: -90, position: 'insideLeft', offset: 10 }} />
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
            <Line
              type="monotone"
              dataKey="porcentaje"
              stroke="#0077cc"
              strokeWidth={3}
              dot={{ r: 6, stroke: '#004466', strokeWidth: 2, fill: '#80bfff' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Número destacado */}
        <div className="numero-destacado">
          {porcentaje}%
          <div className="texto-porcentaje">Azúcar detectada</div>
        </div>
      </div>
    </>
  );
}

export default SugarOrine;
