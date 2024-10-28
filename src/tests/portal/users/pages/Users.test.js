import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Users } from '../../../../portal/users/pages/Users';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

// Simulación de acción de carga
jest.mock('../../../../store/portal/users/userThunks', () => ({
  startFetchUsers: jest.fn(), // Simula la función sin ejecutarla
}));

describe('Users Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: { users: [], status: 'loading', error: null },
      auth: { roleDesc: 'IT Department' },
    });
    store.dispatch = jest.fn();
  });

  test('renders Users component and shows loading indicator', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </Provider>
    );
  
    // Obtén todos los headings y verifica que el primero contenga "Users"
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toHaveTextContent(/Users/i);
  
    // Verifica que se muestre el texto de "Loading users..."
    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();
  });

});
