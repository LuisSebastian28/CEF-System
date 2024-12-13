import { startAddUser, startDeleteUser, startFetchUsers } from './userThunks';
import { addUserStart, addUserSuccess, addUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from './userSlice';
import { addUserToFirestore, deleteUserFromFirestore, getUsersFromFirestore } from '../../../firebase/provs/userProviders';
import { sendPasswordResetEmail } from 'firebase/auth';

// Mock completo para Firebase
jest.mock('../../../firebase/firebaseConfig', () => ({
  FirebaseAuth: { currentUser: null },
}));

// Mock para Firebase y providers
jest.mock('../../../firebase/provs/userProviders', () => ({
  deleteUserFromFirestore: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({ currentUser: null }),
  sendPasswordResetEmail: jest.fn(),
  createUserWithEmailAndPassword: jest.fn((auth, email, password) => {
    if (email === 'error@example.com') {
      throw new Error('Firebase: Error (auth/email-already-in-use).');
    }
    return { user: { uid: 'test-uid' } };
  }),
  updateProfile: jest.fn(() => Promise.resolve()), // Mock para updateProfile
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('../../../firebase/provs/userProviders', () => ({
  addUserToFirestore: jest.fn(),
  registerUserWithEmailPassword: jest.fn(({ email, password }) => {
    if (email === 'error@example.com') {
      return { ok: false, errorMessage: 'Firebase: Error (auth/email-already-in-use).' };
    }
    return { ok: true, uid: 'test-uid' };
  }),
  updateUserInFirestore: jest.fn(), // Mock para updateUserInFirestore
  deleteUserFromFirestore: jest.fn(),
  getUsersFromFirestore: jest.fn(),
}));



describe('User Thunks - startAddUser', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful user creation', async () => {
    const newUser = {
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      county: 'SampleCounty',
      role: 2,
      roleDesc: 'Sample Role',
    };
  
    addUserToFirestore.mockResolvedValueOnce();
    sendPasswordResetEmail.mockResolvedValueOnce();
  
    await startAddUser(newUser)(dispatch);
  
    expect(dispatch).toHaveBeenCalledWith(addUserStart());
    expect(dispatch).toHaveBeenCalledWith(
      addUserSuccess({
        id: 'test-uid',
        uid: 'test-uid',
        ...newUser,
        photoUrl: 'https://link/to/default/photo.jpg',
      })
    );
  });

  it('should handle Firebase Auth failure', async () => {
    const newUser = { email: 'error@example.com' };

    await startAddUser(newUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addUserStart());
    expect(dispatch).toHaveBeenCalledWith(
      addUserFailure('Firebase: Error (auth/email-already-in-use).')
    );
  });

  it('should handle Firestore failure after user creation', async () => {
    const newUser = { email: 'testuser@example.com' };
    addUserToFirestore.mockRejectedValueOnce(new Error('Firestore error'));

    await startAddUser(newUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addUserStart());
    expect(dispatch).toHaveBeenCalledWith(addUserFailure('Firestore error'));
  });

  it('should handle failure when sending password reset email', async () => {
    const newUser = { email: 'testuser@example.com' };
    addUserToFirestore.mockResolvedValueOnce();
    sendPasswordResetEmail.mockRejectedValueOnce(new Error('Password reset error'));

    await startAddUser(newUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addUserStart());
    expect(dispatch).toHaveBeenCalledWith(addUserFailure('Password reset error'));
  });

  it('should handle missing required user fields', async () => {
    const incompleteUser = { email: '' }; // Usuario incompleto
  
    // Llamada al thunk con usuario incompleto
    await startAddUser(incompleteUser)(dispatch);
  
    // Verificar que el dispatch inicial es addUserStart
    expect(dispatch).toHaveBeenCalledWith(addUserStart());
  
    // Validar que se llama a addUserSuccess incluso con datos incompletos
    expect(dispatch).toHaveBeenCalledWith(
      addUserSuccess({
        email: '',
        id: 'test-uid',
        uid: 'test-uid',
        photoUrl: 'https://link/to/default/photo.jpg',
      })
    );
  
    // Asegurarse de que no se llama addUserFailure
    expect(dispatch).not.toHaveBeenCalledWith(
      addUserFailure(expect.anything())
    );
  });
  
  

  it('should handle unexpected errors gracefully', async () => {
    const newUser = {
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      county: 'SampleCounty',
      role: 2,
      roleDesc: 'Sample Role',
    };

    addUserToFirestore.mockRejectedValueOnce(new Error('Unexpected error'));

    await startAddUser(newUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addUserStart());
    expect(dispatch).toHaveBeenCalledWith(addUserFailure('Unexpected error'));
  });

  it('should not call addUserSuccess if Firebase Auth fails', async () => {
    const newUser = { email: 'error@example.com' };

    await startAddUser(newUser)(dispatch);

    expect(dispatch).not.toHaveBeenCalledWith(
      addUserSuccess(expect.anything())
    );
  });
});



describe('User Thunks - startDeleteUser', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful user deletion', async () => {
    const userId = 'test-user-id';
    deleteUserFromFirestore.mockResolvedValueOnce({ ok: true });

    await startDeleteUser(userId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteUserStart());
    expect(dispatch).toHaveBeenCalledWith(deleteUserSuccess(userId));
  });

  it('should handle failure during user deletion', async () => {
    const userId = 'test-user-id';
    deleteUserFromFirestore.mockResolvedValueOnce({
      ok: false,
      errorMessage: 'Failed to delete user',
    });

    await startDeleteUser(userId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteUserStart());
    expect(dispatch).toHaveBeenCalledWith(deleteUserFailure('Failed to delete user'));
  });

  it('should handle unexpected errors gracefully', async () => {
    const userId = 'test-user-id';
    deleteUserFromFirestore.mockRejectedValueOnce(new Error('Unexpected error'));

    await startDeleteUser(userId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteUserStart());
    expect(dispatch).toHaveBeenCalledWith(deleteUserFailure('Unexpected error'));
  });
});

describe('User Thunks - startFetchUsers', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful fetch of users', async () => {
    const mockUsers = [
      { id: '1', email: 'user1@example.com', firstName: 'User', lastName: 'One' },
      { id: '2', email: 'user2@example.com', firstName: 'User', lastName: 'Two' },
    ];

    getUsersFromFirestore.mockResolvedValueOnce({ ok: true, users: mockUsers });

    await startFetchUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchUsersStart());
    expect(dispatch).toHaveBeenCalledWith(fetchUsersSuccess(mockUsers));
  });

  it('should handle failure during fetch of users', async () => {
    const mockError = 'Failed to fetch users';

    getUsersFromFirestore.mockResolvedValueOnce({ ok: false, errorMessage: mockError });

    await startFetchUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchUsersStart());
    expect(dispatch).toHaveBeenCalledWith(fetchUsersFailure(mockError));
  });

  it('should handle unexpected errors during fetch of users', async () => {
    getUsersFromFirestore.mockRejectedValueOnce(new Error('Unexpected error'));

    await startFetchUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchUsersStart());
    expect(dispatch).toHaveBeenCalledWith(fetchUsersFailure('Unexpected error'));
  });
});
