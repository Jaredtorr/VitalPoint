import React, { useEffect, useState } from 'react';
import { 
  fetchTemperaturaStats, 
  fetchOxygenStats, 
  fetchUrinePhStats,
  fetchStressCorrelation,
  fetchSugarOrineStats // Nueva importación
} from '../../services/apiServices';
import Header from '../../Components/Header/Header';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ErrorBar,
  ScatterChart, Scatter
} from 'recharts';
import './Estadisticas.css';

const Estadisticas = () => {
  const [tempStatsData, setTempStatsData] = useState(null);
  const [oxygenStatsData, setOxygenStatsData] = useState(null);
  const [urinePhStats, setUrinePhStats] = useState(null);
  const [stressCorrelation, setStressCorrelation] = useState(null);
  const [sugarOrineStats, setSugarOrineStats] = useState(null); // Nuevo estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(true);

  // Niveles predefinidos de SpO2
  const nivelesSpO2 = [
    "Normal (95-100%)",
    "Leve (90-94%)",
    "Moderado (85-89%)",
    "Severo (<85%)"
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        // Primero cargamos temperatura, oxigenación y azúcar en orina
        await Promise.all([
          fetchTemperaturaStats(setTempStatsData),
          fetchOxygenStats(setOxygenStatsData),
          fetchSugarOrineStats(setSugarOrineStats) // Nueva llamada
        ]);
        
        // Luego cargamos ANOVA
        const urineData = await fetchUrinePhStats();
        console.log('Datos ANOVA detallados:', {
          grupos: urineData?.grupos_horarios,
          estadisticoF: urineData?.estadistico_f,
          valorP: urineData?.valor_p
        });
        
        setUrinePhStats(urineData);

        // Cargar datos de correlación
        const correlationData = await fetchStressCorrelation();
        console.log('Datos de correlación recibidos:', correlationData);
        if (correlationData?.correlationData?.length > 0) {
          setStressCorrelation(correlationData);
        } else {
          console.warn('No hay datos de correlación disponibles');
        }
      } catch (err) {
        console.error("Error en loadStats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    if (stressCorrelation?.correlationData) {
      console.log('Niveles de estrés únicos:', 
        [...new Set(stressCorrelation.correlationData.map(d => d.stress))]
      );
    }
  }, [stressCorrelation]);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tempStatsData || !oxygenStatsData) return <div>No hay datos disponibles para temperatura y oxigenación</div>;

  // Validación específica para ANOVA
  const tieneDataANOVA = urinePhStats && 
                         urinePhStats.grupos_horarios && 
                         urinePhStats.grupos_horarios.length > 0;

  const tempFrecuenciaData = tempStatsData ? [
    { nombre: "Media", valor: tempStatsData.media },
    { nombre: "Mediana", valor: tempStatsData.mediana },
    { nombre: "Moda", valor: tempStatsData.moda },
    { nombre: "Desv. Est.", valor: tempStatsData.desviacion_estandar },
    { nombre: "Mínimo", valor: tempStatsData.minimo },
    { nombre: "Máximo", valor: tempStatsData.maximo }
  ] : [];

  const oxygenFrecuenciaData = oxygenStatsData ? [
    { nombre: "Media", valor: oxygenStatsData.media },
    { nombre: "Mediana", valor: oxygenStatsData.mediana },
    { nombre: "Moda", valor: oxygenStatsData.moda },
    { nombre: "Desv. Est.", valor: oxygenStatsData.desviacion_estandar },
    { nombre: "Mínimo", valor: oxygenStatsData.minimo },
    { nombre: "Máximo", valor: oxygenStatsData.maximo }
  ] : [];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

  return (
    <>
      <Header />
      <div className="estadisticas-page">
        <button 
          className="toggle-button"
          onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
        >
          {mostrarEstadisticas ? 'Ocultar Estadísticas' : 'Mostrar Estadísticas'}
        </button>

        {mostrarEstadisticas && (
          <>
            {/* Sección de Datos */}
            <div className="stats-data-section">
              <div className="stats-group">
                <h2>Estadísticas de Temperatura</h2>
                <div className="stats-cards">
                  <div className="stat-card">
                    <h3>Medidas de Tendencia Central</h3>
                    <p>Media: {tempStatsData?.media?.toFixed(2)}°C</p>
                    <p>Mediana: {tempStatsData?.mediana?.toFixed(2)}°C</p>
                    <p>Moda: {tempStatsData?.moda?.toFixed(2)}°C</p>
                  </div>
                  <div className="stat-card">
                    <h3>Medidas de Dispersión</h3>
                    <p>Desviación Estándar: {tempStatsData?.desviacion_estandar?.toFixed(2)}</p>
                    <p>Mínimo: {tempStatsData?.minimo?.toFixed(2)}°C</p>
                    <p>Máximo: {tempStatsData?.maximo?.toFixed(2)}°C</p>
                  </div>
                </div>
              </div>

              <div className="stats-group">
                <h2>Estadísticas de Oxigenación</h2>
                <div className="stats-cards">
                  <div className="stat-card">
                    <h3>Medidas de Tendencia Central</h3>
                    <p>Media: {oxygenStatsData?.media?.toFixed(2)}%</p>
                    <p>Mediana: {oxygenStatsData?.mediana?.toFixed(2)}%</p>
                    <p>Moda: {oxygenStatsData?.moda?.toFixed(2)}%</p>
                  </div>
                  <div className="stat-card">
                    <h3>Niveles de SpO2</h3>
                    {nivelesSpO2.map((nivel, index) => (
                      <p key={nivel}>{nivel}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Gráficas */}
            <div className="charts-section">
              <h2>Gráficas</h2>
              <div className="charts-grid">
                {/* Gráfica de temperatura */}
                <div className="chart-container">
                  <h3>Estadísticas de Temperatura</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={tempFrecuenciaData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="nombre" 
                        angle={-20}
                        textAnchor="end"
                        height={60}
                        interval={0}
                        fontSize={12}
                      />
                      <YAxis label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="valor" fill="#FF0000" name="Temperatura" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Histograma y Ojiva de SpO2 */}
                <div className="chart-container">
                  <h3>Distribución de Frecuencias SpO2</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={oxygenStatsData.clasesIntervalos?.map((intervalo, index) => ({
                      intervalo,
                      frecuencia: oxygenStatsData.frecuencias[index]
                    })) || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="intervalo" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                      />
                      <YAxis label={{ value: 'Frecuencia', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="frecuencia" fill="#2196F3" name="Frecuencia" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfica de ojiva */}
                <div className="chart-container">
                  <h3>Ojiva de SpO2</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={oxygenStatsData.clasesIntervalos?.map((intervalo, index) => ({
                      intervalo,
                      porcentajeAcumulado: oxygenStatsData.porcentajeAcum[index]
                    })) || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="intervalo" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                      />
                      <YAxis 
                        label={{ value: 'Porcentaje Acumulado (%)', angle: -90, position: 'insideLeft' }}
                        domain={[0, 100]}
                      />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone"
                        dataKey="porcentajeAcumulado"
                        stroke="#2196F3"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="% Acumulado"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfica de pastel para distribución de niveles de SpO2 */}
                <div className="chart-container">
                  <h3>Distribución de Niveles de SpO2</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={oxygenStatsData.nivelesSpO2}
                        dataKey="porcentaje"
                        nameKey="nivel"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        fill="#8884d8"
                        paddingAngle={5}
                        label={({name, percent}) => `${name}: ${percent.toFixed(1)}%`}
                      >
                        {oxygenStatsData.nivelesSpO2?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Sección de Análisis de pH Urinario */}
            <div className="charts-section">
              <h2>Análisis de pH Urinario</h2>
              {!tieneDataANOVA ? (
                <div className="no-data-message">
                  No hay suficientes datos para realizar el análisis ANOVA
                </div>
              ) : (
                <div className="charts-grid">
                  {/* Gráfica de cajas (Boxplot) para pH por período */}
                  <div className="chart-container">
                    <h3>Distribución de pH por Período</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={urinePhStats?.grupos_horarios || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periodo" />
                        <YAxis 
                          label={{ value: 'pH', angle: -90, position: 'insideLeft' }}
                          domain={[0, 14]}
                          ticks={[0, 2, 4, 6, 8, 10, 12, 14]}
                        />
                        <Tooltip 
                          formatter={(value) => value.toFixed(2)}
                        />
                        <Legend />
                        <Bar 
                          dataKey="media" 
                          fill="#8884d8" 
                          name="pH Promedio"
                        >
                          {/* Corregir las barras de error para que tengan keys únicas */}
                          {urinePhStats?.grupos_horarios?.map((entry, index) => (
                            <ErrorBar 
                              // Cambiar la key para que sea única
                              key={`error-bar-${entry.periodo}-${index}-${Math.random()}`}
                              dataKey="desviacion_estandar"
                              width={4}
                              strokeWidth={2}
                              stroke="#000000"
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Tabla de resultados ANOVA */}
                  <div className="chart-container anova-results">
                    <h3>Resultados del Análisis ANOVA</h3>
                    <table className="anova-table">
                      <tbody>
                        <tr>
                          <td>Estadístico F:</td>
                          <td>{urinePhStats?.estadisticoF?.toFixed(4)}</td>
                        </tr>
                        <tr>
                          <td>Valor P:</td>
                          <td>{urinePhStats?.valorP?.toFixed(4)}</td>
                        </tr>
                        <tr>
                          <td>Significancia Estadística:</td>
                          <td className={urinePhStats?.significanciaEstadistica ? 'significant' : 'not-significant'}>
                            {urinePhStats?.significanciaEstadistica ? 'Significativo' : 'No Significativo'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="anova-interpretation">
                      {urinePhStats?.significanciaEstadistica 
                        ? 'Hay diferencias significativas en el pH entre los diferentes períodos del día.'
                        : 'No hay diferencias significativas en el pH entre los diferentes períodos del día.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Nueva sección: Análisis ANOVA de pH por Período */}
            <div className="chart-container">
              <h3>Análisis ANOVA de pH por Período</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={urinePhStats?.grupos_horarios || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="periodo"
                    label={{ value: 'Períodos del día', position: 'bottom' }}
                  />
                  <YAxis 
                    label={{ value: 'pH', angle: -90, position: 'insideLeft' }}
                    domain={[0, 14]}
                    ticks={[0, 2, 4, 6, 8, 10, 12, 14]}
                  />
                  <Tooltip 
                    formatter={(value) => value.toFixed(2)}
                  />
                  <Legend />
                  <Line 
                    type="monotone"
                    dataKey="media"
                    stroke="#8884d8"
                    name="pH Promedio"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                  />
                  {/* Bandas de desviación estándar */}
                  <Line 
                    type="monotone"
                    dataKey={(data) => data.media + data.desviacion_estandar}
                    stroke="#82ca9d"
                    strokeDasharray="3 3"
                    name="Límite Superior"
                    dot={false}
                  />
                  <Line 
                    type="monotone"
                    dataKey={(data) => data.media - data.desviacion_estandar}
                    stroke="#82ca9d"
                    strokeDasharray="3 3"
                    name="Límite Inferior"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="anova-results">
                <p>F = {urinePhStats?.estadisticoF?.toFixed(4)} | p = {urinePhStats?.valorP?.toFixed(4)}</p>
              </div>
            </div>

            {/* Sección de Análisis de Correlación de Estrés */}
            <div className="charts-section">
              <h2>Análisis de Correlación de Estrés</h2>
              {stressCorrelation?.correlationData?.length > 0 ? (
                <div className="chart-container">
                  <h3>Correlación entre Temperatura, Oxigenación y Nivel de Estrés</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid />
                      <XAxis 
                        type="number" 
                        dataKey="temperatura" 
                        name="Temperatura" 
                        unit="°C"
                        domain={['dataMin - 1', 'dataMax + 1']} // Dominio dinámico
                        label={{ value: 'Temperatura (°C)', position: 'bottom' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="oxigenacion" 
                        name="Oxigenación" 
                        unit="%" 
                        domain={['dataMin - 2', 'dataMax + 2']} // Dominio dinámico
                        label={{ value: 'Oxigenación (%)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value, name) => [`${value}${name === 'temperatura' ? '°C' : '%'}`, name]}
                      />
                      <Legend />
                      {['Bajo', 'Medio', 'Alto'].map((nivel, index) => (
                        <Scatter
                          key={`scatter-${nivel}`}
                          name={`Estrés ${nivel}`}
                          data={stressCorrelation.correlationData.filter(d => 
                            d.stress?.toLowerCase().trim() === nivel.toLowerCase()
                          )}
                          fill={['#00C49F', '#FFBB28', '#FF8042'][index]}
                        />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                  <div className="correlation-legend">
                    <p>Cada punto representa una medición, donde:</p>
                    <ul>
                      <li><span style={{color: '#00C49F'}}>●</span> Estrés Bajo: Condiciones normales</li>
                      <li><span style={{color: '#FFBB28'}}>●</span> Estrés Medio: Atención requerida</li>
                      <li><span style={{color: '#FF8042'}}>●</span> Estrés Alto: Intervención necesaria</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="no-data-message">
                  No hay datos suficientes para mostrar la correlación
                </div>
              )}
            </div>

            {/* Sección de Estadísticas de Azúcar en Orina */}
            <div className="charts-section">
              <h2>Estadísticas de Azúcar en Orina</h2>
              {sugarOrineStats?.frecuenciaData?.length > 0 ? (
                <div className="chart-container">
                  <h3>Distribución de Niveles de Glucosa</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      layout="vertical"
                      data={sugarOrineStats.frecuenciaData}
                      margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="valor" 
                        type="category"
                        label={{ value: 'Nivel de Glucosa', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value} muestras`, 'Frecuencia']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="frecuencia" 
                        fill="#8884d8" 
                        name="Frecuencia"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="stats-summary">
                    <div className="stat-card">
                      <h4>Distribución de Niveles</h4>
                      <p>Normal: {sugarOrineStats.normal?.toFixed(2)}%</p>
                      <p>Moderado: {sugarOrineStats.moderado?.toFixed(2)}%</p>
                      <p>Alto: {sugarOrineStats.alto?.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-data-message">
                  No hay suficientes datos para mostrar estadísticas de azúcar en orina
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Estadisticas;