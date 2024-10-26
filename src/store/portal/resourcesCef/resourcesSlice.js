// store/portal/resources/resourcesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],
  loading: false,
  error: null,
};

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    fetchResourcesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchResourcesSuccess(state, action) {
      state.files = action.payload;
      state.loading = false;
    },
    fetchResourcesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchResourcesStart,
  fetchResourcesSuccess,
  fetchResourcesFailure,
} = resourcesSlice.actions;

export default resourcesSlice;
