import React from "react";
import Header from "../../Components/Header/Header";
import TemperatureCircle from "../../components/Temperature/TemperatureCircle";
import TemperatureLineChart from "../../components/Temperature/TemperatureLineChart";
import "./TemperaturaCorporal.css";

const data = [
  { hora: "08:00", temperatura: 36.5 },
  { hora: "10:00", temperatura: 37.2 },
  { hora: "12:00", temperatura: 37.8 },
  { hora: "14:00", temperatura: 38.4 },
  { hora: "16:00", temperatura: 38.1 },
  { hora: "18:00", temperatura: 37.5 },
];

const TemperaturaCorporal = () => {
  const temperatura = 37.5;
  const maxima = 38.4;
  const minima = 35.2;

  return (
    <div className="temp-main">
      <Header />
      <div className="temp-content">
        <h2 className="temp-label">Temperatura Corporal</h2>
        <TemperatureCircle temperature={temperatura} />
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