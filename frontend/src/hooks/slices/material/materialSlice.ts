import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMaterials, updateMaterialStock } from '../../services/materialService';

// Fetch all materials
export const fetchAllMaterials = createAsyncThunk('materials/fetchAll', async () => {
  const data = await fetchMaterials();
  return data;
});

// Update material stock
export const updateStock = createAsyncThunk('materials/updateStock', async ({ materialId, quantity }) => {
  const data = await updateMaterialStock(materialId, quantity);
  return data;
});

const materialSlice = createSlice({
  name: 'materials',
  initialState: { materials: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMaterials.fulfilled, (state, action) => {
        state.materials = action.payload;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        const index = state.materials.findIndex((material) => material._id === action.payload._id);
        if (index !== -1) {
          state.materials[index] = action.payload;
        }
      });
  },
});

export default materialSlice.reducer;