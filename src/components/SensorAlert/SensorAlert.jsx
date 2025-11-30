import React, { useEffect, useState } from 'react';
import './SensorAlert.css';

const SensorAlert = ({ alerts = [], sensorStatus = {} }) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);

  useEffect(() => {
    // Mostrar alertas más recientes
    setVisibleAlerts(alerts.slice(0, 3));
  }, [alerts]);

  const getSensorName = (alerta) => {
    if (alerta.includes('MAX30102')) return 'Oxígeno';
    if (alerta.includes('MLX90614')) return 'Temperatura';
    if (alerta.includes('TCS34725')) return 'pH Orina';
    return 'Sensor';
  };

  const getStatusIcon = (isConnected) => {
    return isConnected ? '✅' : '❌';
  };

  return (
    <div className="sensor-alert-container">
      {/* Mostrar estado de sensores */}
      <div className="sensor-status-panel">
        <h4>Estado de Sensores</h4>
        <div className="sensor-status-grid">
          <div className={`status-item ${sensorStatus.max30102 ? 'connected' : 'disconnected'}`}>
            <span className="status-icon">{getStatusIcon(sensorStatus.max30102)}</span>
            <span className="status-text">Oxígeno (MAX30102)</span>
          </div>
          <div className={`status-item ${sensorStatus.mlx90614 ? 'connected' : 'disconnected'}`}>
            <span className="status-icon">{getStatusIcon(sensorStatus.mlx90614)}</span>
            <span className="status-text">Temperatura (MLX90614)</span>
          </div>
          <div className={`status-item ${sensorStatus.tcs34725 ? 'connected' : 'disconnected'}`}>
            <span className="status-icon">{getStatusIcon(sensorStatus.tcs34725)}</span>
            <span className="status-text">pH Orina (TCS34725)</span>
          </div>
        </div>
      </div>

      {/* Mostrar alertas */}
      {visibleAlerts.length > 0 && (
        <div className="alerts-list">
          <h4>Alertas Recientes</h4>
          {visibleAlerts.map((alert) => (
            <div key={alert.id} className={`alert-item alert-${alert.tipo}`}>
              <div className="alert-icon">
                {alert.tipo === 'error' ? '⚠️' : '✨'}
              </div>
              <div className="alert-content">
                <p className="alert-message">{alert.mensaje}</p>
                <p className="alert-time">
                  {alert.timestamp?.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SensorAlert;
