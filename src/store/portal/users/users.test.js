import { startAddUser } from './userThunks';
import { addUserStart, addUserFailure } from './userSlice';
import { registerUserWithEmailPassword, addUserToFirestore } from '../../../firebase/provs/userProviders';


// Configuración de timeout global para Jest
jest.setTimeout(10000);

// Polyfill para clearImmediate
global.clearImmediate = global.clearImmediate || function (immediateId) {
  return clearTimeout(immediateId);
};

// Mock de los módulos necesarios
jest.mock('../../../firebase/provs/userProviders', () => ({
  addUserToFirestore: jest.fn(),
  registerUserWithEmailPassword: jest.fn(),
}));

jest.mock("firebase/auth", () => {
  const originalModule = jest.requireActual("firebase/auth");
  return {
    ...originalModule,
    sendPasswordResetEmail: jest.fn(),
  };
});

describe('User Thunks - startAddUser - Exception Cases', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle failure when user already exists in Firebase Auth', async () => {
    const existingUser = {
      email: "sebassalazar@cefepa.net",
      firstName: "Sebastian",
      lastName: "Salazar",
      county: "philadelphia",
      role: 5,
      roleDesc: "IT Department",
      photoUrl: "https://firebasestorage.googleapis.com/v0/b/employee-portal-8f758.appspot.com/o/profile-pictures%2Fgeneric-profile.jpg?alt=media&token=1b5dc905-b829-4379-9f0a-56b34f72e628"
    };

    // Simular error de Firebase Auth: usuario ya registrado
    registerUserWithEmailPassword.mockResolvedValueOnce({ ok: false, errorMessage: "Firebase: Error (auth/email-already-in-use)." });

    await startAddUser(existingUser)(dispatch);

    // Verificar que se llamen las acciones de inicio y fallo del dispatch
    expect(dispatch).toHaveBeenCalledWith(addUserStart());
    expect(dispatch).toHaveBeenCalledWith(addUserFailure("Firebase: Error (auth/email-already-in-use)."));
  });

  
});
