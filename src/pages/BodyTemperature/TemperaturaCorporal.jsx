import React, { useEffect, useState } from "react";
import { fetchTemperaturaCorporal } from "../../services/apiServices";
import { connectMQTTCounter, TOPICS } from "../../services/mqttServices";
import Header from "../../Components/Header/Header";
import TemperatureCircle from "../../components/Temperature/TemperatureCircle";
import TemperatureLineChart from "../../components/Temperature/TemperatureLineChart";
import "./TemperaturaCorporal.css";

const TemperaturaCorporal = () => {
  const [temperaturas, setTemperaturas] = useState([]);

  useEffect(() => {
    fetchTemperaturaCorporal(setTemperaturas);
  }, []);

  useEffect(() => {
    const disconnect = connectMQTTCounter(TOPICS.TEMPERATURA, (newData) => {
      setTemperaturas((prev) => [...prev, newData]);
    });

    return () => {
      disconnect();
    };
  }, []);

  // Todos los datos para la gráfica de línea
  const data = temperaturas.map((item) => ({
    hora: item.tiempo?.slice(11, 16) || new Date().toLocaleTimeString().slice(0, 5),
    temperatura: item.temp_objeto || item.temperatura || 0,
  }));

  // Solo el último dato para el círculo
  const temperaturaActual =
    data.length > 0 ? data[data.length - 1].temperatura : 0;

  // Máxima y mínima para mostrar en el texto
  const maxima = data.length > 0 ? Math.max(...data.map((d) => d.temperatura)) : 0;
  const minima = data.length > 0 ? Math.min(...data.map((d) => d.temperatura)) : 0;

  return (
    <div className="temp-main">
      <Header />
      <div className="temp-content">
        <h2 className="temp-label">Temperatura Corporal</h2>
        <TemperatureCircle temperature={temperaturaActual} />
        <h3 className="temp-label2">Temperatura diaria</h3>
        <p className="temp-range">
          Máxima {maxima}°C / Mínima {minima}°C
        </p>
        <TemperatureLineChart data={data} />
      </div>
    </div>
  );
};

export default TemperaturaCorporal;
