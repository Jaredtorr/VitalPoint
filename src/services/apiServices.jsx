const BASE_API_URL = 'http://44.196.90.31:8080'; 

export async function fetchTemperaturaCorporal(setData) {
    try {
        const response = await fetch(`${BASE_API_URL}/bodyTemperature`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de temperatura corporal');
        }

        const data = await response.json();
        // Transformar los datos al formato esperado por la tabla
        const formattedData = data.map(item => ({
            id: item.id,
            esp32_id: item.esp32ID,
            tiempo: item.tiempo,
            temp_ambiente: item.temp_ambiente,
            temp_objeto: item.temp_objeto,
        }));
        setData(formattedData);
    } catch (error) {
        console.error('Error al conectar con la API de temperatura corporal:', error);
        setData([]); // En caso de error, establecer array vacío
    }
}

export async function fetchOxigenacion(setData) {
    try {
        const response = await fetch(`${BASE_API_URL}/bloodOxygenation`); 
        if (!response.ok) {
            throw new Error('Error al obtener los datos de oxigenación');
        }

        const data = await response.json();
        // Transformar los datos al formato esperado por la tabla
        const formattedData = data.map(item => ({
            id: item.id,
            esp32_id: item.esp32ID,
            tiempo: item.tiempo,
            ir: item.ir,
            red: item.red,
        }));
        setData(formattedData);
    } catch (error) {
        console.error('Error al conectar con la API de oxigenación:', error);
        setData([]); // En caso de error, establecer array vacío
    }
}