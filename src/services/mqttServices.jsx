import mqtt from 'mqtt';

const MQTT_BROKER = 'ws://13.222.93.158:15675/ws';

export const TOPICS = {
    OXIGENACION: 'sensor.max30102',
    TEMPERATURA: 'sensor.mlx90614',
    ALERTAS: 'sensor.alertas',
};

// Conexión general para recibir datos de un topic
export function connectMQTTCounter(topic, setData) {
    const client = mqtt.connect(MQTT_BROKER, {
        username: 'Raul',
        password: '02140510'
    });

    client.on('connect', () => {
        console.log(`✅ Conectado a MQTT - Topic: ${topic}`);
        client.subscribe(topic);
    });

    client.on('message', (receivedTopic, message) => {
        if (receivedTopic === topic) {
            try {
                const data = JSON.parse(message.toString());
                setData(prev => [...prev, data]);
            } catch (error) {
                console.error('❌ Error al parsear mensaje:', error);
            }
        }
    });

    return () => client.end(); // Para desconectar cuando se desmonte el componente
}

// Conexión para monitorear alertas de sensores desconectados
export function connectSensorAlerts(setAlerts, setSensorStatus) {
    const client = mqtt.connect(MQTT_BROKER, {
        username: 'Raul',
        password: '02140510'
    });

    client.on('connect', () => {
        console.log('✅ Conectado a alertas de sensores');
        // Escuchar alertas que vienen por Serial desde ESP32
        client.subscribe('sensor.alertas');
    });

    client.on('message', (topic, message) => {
        try {
            const data = JSON.parse(message.toString());
            
            // Si es una alerta de sensor (sensor, estado)
            if (data.sensor && data.estado) {
                console.log('🚨 Alerta recibida:', data);
                
                const sensorNames = {
                    'MAX30102': 'Oxígeno (MAX30102)',
                    'MLX90614': 'Temperatura (MLX90614)',
                    'TCS34725': 'pH Orina (TCS34725)'
                };
                
                const mensaje = data.estado === 'desconectado' 
                    ? `❌ ${sensorNames[data.sensor]} desconectado`
                    : `✅ ${sensorNames[data.sensor]} reconectado`;
                
                setAlerts(prev => [{
                    id: Date.now(),
                    mensaje: mensaje,
                    timestamp: new Date(),
                    tipo: data.estado === 'desconectado' ? 'error' : 'success',
                    sensor: data.sensor
                }, ...prev].slice(0, 10)); // Mantener últimas 10 alertas
                
                // Actualizar estado del sensor específico
                setSensorStatus(prevStatus => ({
                    ...prevStatus,
                    [data.sensor === 'MAX30102' ? 'max30102' : 
                      data.sensor === 'MLX90614' ? 'mlx90614' : 'tcs34725']: 
                    data.estado === 'conectado'
                }));
            }
        } catch (error) {
            console.error('❌ Error al procesar mensaje de alerta:', error);
        }
    });

    return () => client.end();
}

