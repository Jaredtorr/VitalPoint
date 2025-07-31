import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

const StatsDisplay = ({ data }) => {
  // Validación de datos
  if (!data || !Array.isArray(data.intervalos) || !Array.isArray(data.frecRelativa)) {
    console.log('Datos recibidos:', data);
    return <div>Esperando datos válidos...</div>;
  }

  // Preparar datos para la gráfica
  const frecuenciaData = data.intervalos.map((intervalo, index) => ({
    name: intervalo.toString(),
    frecuencia: Number(data.frecRelativa[index]) || 0
  })).filter(item => !isNaN(item.frecuencia));

  return (
    <div className="stats-display">
      <div className="chart-container">
        <h3>Distribución de Frecuencias</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={frecuenciaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              interval={0}
              fontSize={12}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="frecuencia" 
              fill="#FF4444" 
              stroke="#000"
              name="Frecuencia"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsDisplay;