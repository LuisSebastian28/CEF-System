// store/portal/resources/resourcesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  driveFiles: [],
  firebaseFiles: [],
  loading: false,
  error: null,
  uploadProgress: 0,  // Progreso de carga
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
      state.driveFiles = action.payload;
      state.loading = false;
    },
    fetchFirebaseResourcesSuccess(state, action) {
      state.firebaseFiles = action.payload;
      state.loading = false;
    },
    uploadProgress(state, action) {
      state.uploadProgress = action.payload;
    },
    addResource(state, action) {
      state.firebaseFiles.push(action.payload);
      state.uploadProgress = 0;
    },
    deleteResource(state, action) {
      state.firebaseFiles = state.firebaseFiles.filter((file) => file.name !== action.payload);
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
  fetchFirebaseResourcesSuccess,
  fetchResourcesFailure,
  uploadProgress,
  addResource,
  deleteResource,
} = resourcesSlice.actions;

export default resourcesSlice;
