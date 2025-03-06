import api from '../BaseApi';

// Create a workstation
export const createWorkstation = async (workstationData) => {
  const response = await api.post('/workstations', workstationData);
  return response.data;
};

// Get all workstations
export const fetchWorkstations = async () => {
  const response = await api.get('/workstations');
  return response.data;
};