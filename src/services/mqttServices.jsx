import mqtt from 'mqtt';

const MQTT_BROKER = 'ws://13.222.93.158:15675/ws';

export const TOPICS = {
    OXIGENACION: 'sensor.max30102',
    TEMPERATURA: 'sensor.mlx90614',
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
