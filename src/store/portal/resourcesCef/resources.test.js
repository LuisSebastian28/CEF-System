// resources.test.js
import {
    fetchResources,
    fetchFirebaseStorageResources,
    uploadResource,
    deleteFirebaseResource
  } from './resourcesThunks';
  
  import {
    fetchResourcesStart,
    fetchResourcesSuccess,
    fetchFirebaseResourcesSuccess,
    fetchResourcesFailure,
    uploadProgress,
    addResource,
    deleteResource
  } from './resourcesSlice';
  
  import { FirebaseStorage } from '../../../firebase/firebaseConfig';
  import { ref, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
  
  // Mock Firebase Storage methods
  jest.mock("../../../firebase/firebaseConfig", () => ({
    FirebaseStorage: jest.fn(),
  }));
  
  jest.mock("firebase/storage", () => ({
    ref: jest.fn(),
    listAll: jest.fn(),
    getDownloadURL: jest.fn(),
    uploadBytesResumable: jest.fn(),
    deleteObject: jest.fn(),
  }));
  
  describe('Resources Thunks', () => {
    const dispatch = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    // Test for fetchResources
    it('should fetch resources from Google Drive successfully', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ files: [{ id: '1', name: 'File 1' }, { id: '2', name: 'File 2' }] })
        })
      );
  
      await fetchResources()(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesStart());
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesSuccess([{ id: '1', name: 'File 1' }, { id: '2', name: 'File 2' }]));
    });
  
    it('should handle failure when fetching resources from Google Drive', async () => {
      global.fetch = jest.fn(() => Promise.reject("Failed to fetch"));
  
      await fetchResources()(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesStart());
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesFailure('Failed to fetch files from Google Drive'));
    });
  
    // Test for fetchFirebaseStorageResources
    it('should fetch resources from Firebase Storage successfully', async () => {
      const mockItems = [{ name: 'file1.jpg' }, { name: 'file2.png' }];
      listAll.mockResolvedValueOnce({ items: mockItems });
      getDownloadURL.mockResolvedValueOnce('https://example.com/file1.jpg').mockResolvedValueOnce('https://example.com/file2.png');
  
      await fetchFirebaseStorageResources()(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesStart());
      expect(dispatch).toHaveBeenCalledWith(fetchFirebaseResourcesSuccess([
        { name: 'file1.jpg', url: 'https://example.com/file1.jpg', mimeType: '' },
        { name: 'file2.png', url: 'https://example.com/file2.png', mimeType: '' }
      ]));
    });
  
    it('should handle failure when fetching resources from Firebase Storage', async () => {
      listAll.mockRejectedValueOnce(new Error('Failed to fetch'));
  
      await fetchFirebaseStorageResources()(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesStart());
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesFailure('Failed to fetch files from Firebase Storage'));
    });
  
    // Test for uploadResource
    it('should upload a resource to Firebase Storage successfully', async () => {
      const file = new File(['content'], 'file1.jpg', { type: 'image/jpeg' });
      const uploadTaskMock = {
        on: (event, progressCb, errorCb, successCb) => {
          if (event === 'state_changed') progressCb({ bytesTransferred: 50, totalBytes: 100 });
          successCb();
        },
        snapshot: { ref: { fullPath: 'resources/file1.jpg' } }
      };
  
      uploadBytesResumable.mockReturnValue(uploadTaskMock);
      getDownloadURL.mockResolvedValueOnce('https://example.com/file1.jpg');
  
      await uploadResource(file)(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(uploadProgress(50));
      expect(dispatch).toHaveBeenCalledWith(addResource({
        name: 'file1.jpg',
        url: 'https://example.com/file1.jpg',
        mimeType: 'image/jpeg'
      }));
    });
  
    it('should handle failure when uploading a resource', async () => {
      const file = new File(['content'], 'file1.jpg', { type: 'image/jpeg' });
      const uploadTaskMock = {
        on: (event, progressCb, errorCb) => {
          if (event === 'state_changed') errorCb(new Error('Failed to upload'));
        }
      };
  
      uploadBytesResumable.mockReturnValue(uploadTaskMock);
  
      await uploadResource(file)(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesFailure('Failed to upload file'));
    });
  
    // Test for deleteFirebaseResource
    it('should delete a resource from Firebase Storage successfully', async () => {
      deleteObject.mockResolvedValueOnce();
  
      await deleteFirebaseResource('file1.jpg')(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(deleteResource('file1.jpg'));
    });
  
    it('should handle failure when deleting a resource from Firebase Storage', async () => {
      const errorMessage = 'Failed to delete file from Firebase Storage';
      deleteObject.mockRejectedValueOnce(new Error(errorMessage));
  
      await deleteFirebaseResource('file1.jpg')(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith(fetchResourcesFailure(errorMessage));
    });
  });
  