const BASE_API_URL = 'http://44.196.90.31:8080'; 

export async function fetchTemperaturaCorporal(setData) {
    try {
        const response = await fetch(`${BASE_API_URL}/bodyTemperature`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de temperatura corporal');
        }

        const data = await response.json();
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
        setData([]);
    }
}

export async function fetchOxigenacion(setData) {
    try {
        const response = await fetch(`${BASE_API_URL}/bloodOxygenation`); 
        if (!response.ok) {
            throw new Error('Error al obtener los datos de oxigenación');
        }

        const data = await response.json();
        const formattedData = data.map(item => ({
            id: item.id,
            esp32_id: item.esp32ID,
            tiempo: item.tiempo,
            ir: item.ir,
            red: item.red,
            spo2: item.spo2,
        }));
        setData(formattedData);
    } catch (error) {
        console.error('Error al conectar con la API de oxigenación:', error);
        setData([]);
    }
}

export async function fetchpH(setData) {
    try {
        const response = await fetch(`${BASE_API_URL}/urinepH`); 
        if (!response.ok) {
            throw new Error('Error al obtener los datos de pH');
        }

        const data = await response.json();
        const formattedData = data.map(item => ({
            id: item.id,
            esp32_id: item.esp32ID,
            tiempo: item.tiempo,
            ph: item.ph,
        }));
        setData(formattedData);
    } catch (error) {
        console.error('Error al conectar con la API de pH:', error);
        setData([]);
    }
}

export async function fetchStress(setData) {
    try {
        const response = await fetch(`${BASE_API_URL}/stress`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de estrés');
        }

        const data = await response.json();
        const formattedData = data.map(item => ({
            id: item.id,
            esp32_id: item.esp32ID,
            tiempo: item.tiempo,
            estres: item.estres,
        }));
        setData(formattedData);
    } catch (error) {
        console.error('Error al conectar con la API de estrés:', error);
        setData([]);
    }
}