import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createWorkstation, fetchWorkstations } from '../../services/workStationService';

// Fetch all workstations
export const fetchAllWorkstations = createAsyncThunk('workstations/fetchAll', async () => {
  const data = await fetchWorkstations();
  return data;
});

// Create a workstation
export const addWorkstation = createAsyncThunk('workstations/create', async (workstationData) => {
  const data = await createWorkstation(workstationData);
  return data;
});

const workstationSlice = createSlice({
  name: 'workstations',
  initialState: { workstations: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWorkstations.fulfilled, (state, action) => {
        state.workstations = action.payload;
      })
      .addCase(addWorkstation.fulfilled, (state, action) => {
        state.workstations.push(action.payload);
      });
  },
});

export default workstationSlice.reducer;