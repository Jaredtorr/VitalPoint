const BASE_API_URL = 'http://44.196.90.31:8080';

async function handleResponse(response, endpoint) {
  try {
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Error HTTP ${response.status} (${response.statusText}) en ${endpoint}: ${text}`
      );
    }

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`La respuesta de ${endpoint} no es JSON válida.`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(`La respuesta de ${endpoint} no es un array.`);
    }

    return data;
  } catch (error) {
    console.error(`[${endpoint}] Error al procesar la respuesta:`, error);
    throw error;
  }
}

// Temperatura corporal
export async function fetchTemperaturaCorporal(setData) {
  try {
    const response = await fetch(`${BASE_API_URL}/bodyTemperature`);
    const data = await handleResponse(response, 'bodyTemperature');
    const formattedData = data.map(item => ({
      id: item.id,
      esp32_id: item.esp32ID,
      tiempo: item.tiempo,
      temp_objeto: item.temp_objeto,
    }));
    setData(formattedData);
  } catch (error) {
    console.error('Error al conectar con la API de temperatura corporal:', error);
    setData([]);
  }
}

// Temperatura corporal stats
export async function fetchTemperaturaStats(setData) {
  try {
    const response = await fetch(`${BASE_API_URL}/bodyTemperature/stats`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    throw error;
  }
}

// Oxigenación
export async function fetchOxigenacion(setData) {
  try {
    const response = await fetch(`${BASE_API_URL}/bloodOxygenation`);
    const data = await handleResponse(response, 'bloodOxygenation');
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

// Oxigenación stats
export async function fetchOxygenStats(setData) {
  try {
    const response = await fetch(`${BASE_API_URL}/bloodOxygenation/stats`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error("Error al obtener estadísticas de oxigenación:", error);
    throw error;
  }
}

// pH urinario
export async function fetchpH(setData) {
  try {
    const response = await fetch(`${BASE_API_URL}/urinepH`);
    const data = await handleResponse(response, 'urinepH');
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

// Estadísticas de pH urinario
export const fetchUrinePhStats = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/urinepH/stats`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener estadísticas de pH:', error);
    throw error;
  }
};

// Estrés
export async function fetchStress(setData) {
  try {
    const response = await fetch(`${BASE_API_URL}/stress`);
    const data = await handleResponse(response, 'stress');
    const formattedData = data.map(item => ({
      id: item.id,
      esp32_id: item.esp32ID,
      tiempo: item.tiempo,
      estres: item.stress,
    }));
    setData(formattedData);
  } catch (error) {
    console.error('Error al conectar con la API de estrés:', error);
    setData([]);
  }
}

// Sugar
export async function fetchSugar() {
  try {
    const response = await fetch(`${BASE_API_URL}/sugar`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.map(item => ({
      id: item.id,
      esp32_id: item.esp32ID,
      tiempo: item.tiempo,
      glucosa: item.glucosa,
    }));
  } catch (error) {
    console.error('Error al conectar con la API de azúcar en orina:', error);
    return [];
  }
}

// Sugar-Orine stats
export async function fetchSugarOrineStats(setData) {
  try {
    const response = await fetch(`${BASE_API_URL}/sugar/stats`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error("Error al obtener estadísticas de azúcar en orina:", error);
    throw error;
  }
}

// Datos de correlación de estrés
export const fetchStressCorrelation = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/stress/correlation`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    
    // Validar la estructura de datos
    if (!data || typeof data !== 'object') {
      console.error('Datos recibidos:', data);
      return { correlationData: [] };
    }

    // Si los datos vienen en una propiedad específica
    const correlationData = data.correlationData || [data];

    // Asegurar que es un array y mapear los datos
    const formattedData = (Array.isArray(correlationData) ? correlationData : [correlationData])
      .map(item => ({
        temperatura: Number(item.temperatura || 0),
        oxigenacion: Number(item.oxigenacion || 0),
        stress: item.stress || 'Desconocido'
      }))
      .filter(item => item.temperatura > 0 && item.oxigenacion > 0);

    return {
      correlationData: formattedData
    };
  } catch (error) {
    console.error('Error al obtener datos de correlación:', error);
    return { correlationData: [] };
  }
}

// Crear usuario
export async function createUser(userData) {
    try {
        const response = await fetch(`${BASE_API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}