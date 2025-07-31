import React, { useEffect, useState, useCallback } from "react";
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
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const datos = await fetchSugar();
      if (datos.length > 0) {
        const datosOrdenados = datos.sort(
          (a, b) => new Date(b.tiempo) - new Date(a.tiempo)
        );

        const dataFormateada = datosOrdenados.map((item) => ({
          tiempo: new Date(item.tiempo).getTime(),
          tiempoLabel: new Date(item.tiempo).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          nivel: item.glucosa,
          y: niveles.indexOf(item.glucosa),
        }));

        setData(dataFormateada);
        setUltimoNivel(datosOrdenados[0].glucosa);
        setLastUpdate(new Date().toLocaleTimeString());
      }
      setIsLoading(false);
    } catch (err) {
      setError('Error al cargar los datos');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(interval);
  }, [fetchData]);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatYAxis = (tick) => niveles[tick] || "";

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="loading">Cargando datos...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="error-message">{error}</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="contenido-azucar-orina">
        <h1 className="titulo-azucar">Azúcar en la Orina</h1>
        <img src={AzucarOrine} alt="Azúcar en la orina" className="imagen-azucar" />
      </div>

      <div className="grafica-container" style={{ width: "100%", height: 350 }}>
        {data.length === 0 ? (
          <div className="no-data">No hay datos disponibles</div>
        ) : (
          <>
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
              <div className="estado-actual">
                <div className="numero-destacado" style={{ marginTop: "1rem" }}>
                  <span style={{ color: colorPorNivel[ultimoNivel], fontWeight: "bold" }}>
                    {ultimoNivel}
                  </span>
                  <div className="texto-porcentaje">Último nivel detectado</div>
                </div>
                {lastUpdate && (
                  <div className="ultima-actualizacion">
                    Última actualización: {lastUpdate}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SugarOrine;
