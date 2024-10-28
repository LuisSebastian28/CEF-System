import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store'; // Usa configureMockStore
import thunk from 'redux-thunk';
import { Forms } from '../../../portal/forms/pages/Forms';
import { formFields } from '../../../portal/forms/helpers/formConfigs';
import '@testing-library/jest-dom';
import { startCreateClub } from '../../../store/portal/clubs/clubsThunks';

// Mocks de thunks
jest.mock('../../../store/portal/users/userThunks', () => ({
  startFetchUsers: jest.fn(),
}));
jest.mock('../../../store/portal/clubs/clubsThunks', () => ({
  startCreateClub: jest.fn(),
}));

// Configura correctamente el middleware
const mockStore = configureMockStore(); // Sin `thunk`

const mockUsers = [
  { id: '1', firstName: 'John', lastName: 'Doe' },
  { id: '2', firstName: 'Jane', lastName: 'Smith' },
];

describe('Forms Page', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: { users: mockUsers, status: 'succeeded', error: null },
      clubs: { clubs: [], status: 'idle', error: null },
    });
  });

  test('renders page title and options', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Forms />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Forms/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose an option/i)).toBeInTheDocument();
  });

  test('renders all options from formFields and handles selection', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Forms />
        </MemoryRouter>
      </Provider>
    );

    const firstOption = Object.keys(formFields)[0];
    fireEvent.click(screen.getByText(firstOption));

    await waitFor(() => {
      expect(screen.getByText(`${firstOption} Form`)).toBeInTheDocument();
    });
  });
});
