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
      stress: item.stress,
    }));
    setData(formattedData);
  } catch (error) {
    console.error('Error al conectar con la API de temperatura corporal:', error);
    setData([]);
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
