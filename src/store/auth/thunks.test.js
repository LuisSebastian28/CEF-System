import { startLoginWithEmailPassword } from './thunks';
import { checkingCredentials, login, logout } from './authSlice';

jest.mock('../../firebase/provs/authProviders', () => ({
  loginWithEmailPassword: jest.fn(({ email, password }) => ({
    ok: email === "sebassalazar@cefepa.net" && password === "A28BR01IL",
    uid: "mockUID123",
    email,
    firstName: "Sebastian",
    lastName: "Salazar",
    roleDesc: "IT Department",
    photoURL: "mockURL",
  }))
}));

describe('Auth Thunks', () => {
  it('should log in with correct credentials', async () => {
    const dispatch = jest.fn();
    const loginData = { email: "sebassalazar@cefepa.net", password: "A28BR01IL" };

    await startLoginWithEmailPassword(loginData)(dispatch);

    // Verificar que checkingCredentials fue llamado primero
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    // Verificar que login fue llamado con los datos correctos después de checkingCredentials
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({
      type: "auth/login",
      payload: expect.objectContaining({
        uid: "mockUID123",
        email: "sebassalazar@cefepa.net",
        firstName: "Sebastian",
        lastName: "Salazar",
        roleDesc: "IT Department",
        photoURL: "mockURL"
      })
    }));
  });

  it('should fail login with incorrect credentials', async () => {
    const dispatch = jest.fn();
    const loginData = { email: "wrong@cefepa.net", password: "wrongPassword" };

    await startLoginWithEmailPassword(loginData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(logout(expect.any(Object)));
  });
});
