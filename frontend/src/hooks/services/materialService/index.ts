import api from '../BaseApi';

// Get all materials
export const fetchMaterials = async () => {
  const response = await api.get('/materials');
  return response.data;
};

// Update material stock
export const updateMaterialStock = async (materialId : string, quantity : number) => {
  const response = await api.put(`/materials/${materialId}`, { quantity });
  return response.data;
};