import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
  Cell,
} from "recharts";
import Header from "../../Components/Header/Header";
import AzucarOrine from "../../assets/AzucarOrine.webp";
import "./SugarOrine.css";
import { fetchSugar } from "../../services/apiServices";

const niveles = ["Normal", "Moderado", "Alto"]; // orden de categorías Y

// Mapa para colores según nivel
const colorPorNivel = {
  Normal: "#4caf50", // verde
  Moderado: "#ff9800", // naranja
  Alto: "#f44336", // rojo
};

function SugarOrine() {
  const [data, setData] = useState([]);
  const [ultimoNivel, setUltimoNivel] = useState(null);

  useEffect(() => {
    fetchSugar((datos) => {
      const datosOrdenados = [...datos].sort(
        (a, b) => new Date(a.tiempo) - new Date(b.tiempo)
      );

      // Mapear para ScatterChart:
      // eje X: tiempo en timestamp
      // eje Y: índice de la categoría en 'niveles'
      const dataFormateada = datosOrdenados.map((item) => ({
        tiempo: new Date(item.tiempo).getTime(),
        tiempoLabel: new Date(item.tiempo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        nivel: item.glucosa,
        y: niveles.indexOf(item.glucosa), // posición numérica en Y
      }));

      setData(dataFormateada);

      if (datosOrdenados.length > 0) {
        setUltimoNivel(datosOrdenados[datosOrdenados.length - 1].glucosa);
      }
    });
  }, []);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatYAxis = (tick) => niveles[tick] || "";

  return (
    <>
      <Header />
      <div className="contenido-azucar-orina">
        <h1 className="titulo-azucar">Azúcar en la Orina</h1>
        <img src={AzucarOrine} alt="Azúcar en la orina" className="imagen-azucar" />
      </div>

      <div className="grafica-container" style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 30, left: 30, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="tiempo"
              name="Tiempo"
              tickFormatter={formatXAxis}
              type="number"
              domain={["auto", "auto"]}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            >
              <Label value="Tiempo" offset={50} position="insideBottom" />
            </XAxis>
            <YAxis
              dataKey="y"
              name="Nivel de Glucosa"
              type="number"
              domain={[0, niveles.length - 1]}
              tickFormatter={formatYAxis}
              allowDecimals={false}
              label={{ value: "Nivel", angle: -90, position: "insideLeft", offset: 10 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name, props) => {
                if (name === "y") return niveles[value] || "";
                return value;
              }}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Scatter name="Glucosa" data={data} >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorPorNivel[entry.nivel] || "#8884d8"} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {ultimoNivel && (
          <div className="numero-destacado" style={{ marginTop: "1rem" }}>
            <span style={{ color: colorPorNivel[ultimoNivel], fontWeight: "bold" }}>
              {ultimoNivel}
            </span>
            <div className="texto-porcentaje">Último nivel detectado</div>
          </div>
        )}
      </div>
    </>
  );
}

export default SugarOrine;
