// store/portal/resources/resourcesThunks.js
import { FirebaseStorage } from '../../../firebase/firebaseConfig';
import { ref, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { 
  fetchResourcesStart, fetchResourcesSuccess, fetchFirebaseResourcesSuccess, 
  fetchResourcesFailure, uploadProgress, addResource, deleteResource 
} from './resourcesSlice';

export const fetchResources = () => async (dispatch) => {
  const folderId = '1Lqzal8iYTtyeHiV97vXzBGBTBV51aguc';
  const API_KEY = 'AIzaSyAluLKMMt6FEryHw5H2UzpLk9yPtMGSkGg';
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink,thumbnailLink)`;

  dispatch(fetchResourcesStart());

  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(fetchResourcesSuccess(data.files || []));
  } catch (error) {
    dispatch(fetchResourcesFailure('Failed to fetch files from Google Drive'));
  }
};

export const fetchFirebaseStorageResources = () => async (dispatch) => {
  dispatch(fetchResourcesStart());
  
  const storageRef = ref(FirebaseStorage, 'resources');

  try {
    const result = await listAll(storageRef);
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url,
          mimeType: itemRef.contentType || '',
        };
      })
    );
    dispatch(fetchFirebaseResourcesSuccess(files));
  } catch (error) {
    dispatch(fetchResourcesFailure('Failed to fetch files from Firebase Storage'));
  }
};

export const uploadResource = (file) => async (dispatch) => {
  const storageRef = ref(FirebaseStorage, `resources/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch(uploadProgress(progress));
    },
    (error) => {
      dispatch(fetchResourcesFailure('Failed to upload file'));
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      const uploadedFile = {
        name: file.name,
        url,
        mimeType: file.type,
      };
      dispatch(addResource(uploadedFile));
    }
  );
};

export const deleteFirebaseResource = (fileName) => async (dispatch) => {
  const storageRef = ref(FirebaseStorage, `resources/${fileName}`);
  
  try {
    await deleteObject(storageRef);
    dispatch(deleteResource(fileName));
  } catch (error) {
    dispatch(fetchResourcesFailure('Failed to delete file from Firebase Storage'));
  }
};
