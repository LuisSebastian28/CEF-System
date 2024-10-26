// store/portal/resources/resourcesThunks.js
import { fetchResourcesStart, fetchResourcesSuccess, fetchResourcesFailure } from './resourcesSlice';

export const fetchResources = () => async (dispatch) => {
  const folderId = '1Lqzal8iYTtyeHiV97vXzBGBTBV51aguc';
  const API_KEY = 'AIzaSyAluLKMMt6FEryHw5H2UzpLk9yPtMGSkGg';
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink,thumbnailLink)`;

  dispatch(fetchResourcesStart());

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.files) {
      dispatch(fetchResourcesSuccess(data.files));
    } else {
      dispatch(fetchResourcesSuccess([])); // No hay archivos
    }
  } catch (error) {
    dispatch(fetchResourcesFailure('Failed to fetch files'));
  }
};
