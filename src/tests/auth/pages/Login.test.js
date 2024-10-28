import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store/store';
import { Login } from '../../../auth/pages/Login';
import '@testing-library/jest-dom';

test('renders Login component and displays form fields', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('************')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('submits login form with email and password', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('************'), { target: { value: 'password123' } });
  
  const loginButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(loginButton);

  expect(store.getState().auth.status).toBe('checking');
});
